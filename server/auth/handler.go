package auth

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-graph-booklets/server/gqlgen-todos/graph/model"
	"github.com/google/uuid"
)

func (a *AuthHandler) SignInHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var u model.User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(w, "Invalid request")
		return
	}

	// get the userById
	foundUser, err := a.db.GetUserByName(u.Username)
	if err != nil {
		fmt.Println(w, "Internal error")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if !CheckPasswordHash(u.Password, foundUser.Password) {
		fmt.Println("Invalid credentials")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid credentials"})
		return
	}

	tokenString, exp, err := a.createToken(u.UserID, u.Username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}

	httpOnlyCookie := http.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Expires:  exp,
		HttpOnly: true,
		Secure:   true,
	}
	http.SetCookie(w, &httpOnlyCookie)
	var res struct {
		Username string    `json:"username"`
		Exp      int64     `json:"exp"`
		UserID   uuid.UUID `json:"userId"`
	}

	res.Username = foundUser.Username
	res.Exp = exp.Unix()
	res.UserID = foundUser.UserID
	err = json.NewEncoder(w).Encode(res)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.WriteHeader(http.StatusOK)

}

func (a *AuthHandler) SignUpHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("Sign up handler")
	var u model.User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		fmt.Println(w, "Invalid request Decode error")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// hash password
	hashedPassword, err := HashPassword(u.Password)
	if err != nil {
		fmt.Println(w, "Internal error Hashing password")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// create user
	_, err = a.db.CreateUser(u.Username, hashedPassword)
	if err != nil {
		fmt.Println("Internal error Creating user:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (a *AuthHandler) SignOutHandler(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:   "jwt",
		Value:  "",
		MaxAge: -1,
	})
	w.WriteHeader(http.StatusOK)
}
