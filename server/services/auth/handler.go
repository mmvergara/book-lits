package auth

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-graph-booklets/server/gqlgen-todos/tools"
	"github.com/google/uuid"
)

type AuthForm struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (a *AuthHandler) SignInHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var u AuthForm
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Println(w, "Invalid request")
		return
	}

	// get the userById
	foundUser, err := a.db.GetUserByName(u.Username)
	if err != nil {
		log.Println("Internal error")
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// log.Println(foundUser.Password)
	// if tools.IsCorrectPassword(u.Password, foundUser.Password) {
	// 	log.Println("Invalid credentials")
	// 	w.WriteHeader(http.StatusUnauthorized)
	// 	json.NewEncoder(w).Encode(map[string]string{"error": "invalid credentials"})
	// 	return
	// }
	parsedFoundUserUUID, err := uuid.Parse(foundUser.ID)
	if err != nil {
		log.Println("Could not parse user id")
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	tokenString, exp, err := a.createToken(parsedFoundUserUUID, foundUser.Name)
	if err != nil {
		log.Println("Internal error Encoding response2")
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	httpOnlyCookie := http.Cookie{
		Name:     "jwt",
		Value:    tokenString,
		Expires:  exp,
		HttpOnly: true,
		Secure:   false,
		Path:     "/",
		SameSite: http.SameSiteLaxMode,
	}

	http.SetCookie(w, &httpOnlyCookie)
	var res struct {
		Username string    `json:"username"`
		Exp      int64     `json:"exp"`
		UserID   uuid.UUID `json:"userid"`
	}
	res.Username = foundUser.Name
	res.Exp = exp.Unix()

	parsedUserID, err := uuid.Parse(foundUser.ID)
	if err != nil {
		log.Println("Internal error Encoding response2")
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}
	res.UserID = parsedUserID
	err = json.NewEncoder(w).Encode(res)
	if err != nil {
		log.Println("Internal error Encoding response2")
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
	}
	w.WriteHeader(http.StatusOK)

}

func (a *AuthHandler) SignUpHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("Sign up handler")
	var u AuthForm
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		fmt.Println(w, "Invalid request Decode error")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// hash password
	hashedPassword, err := tools.HashPassword(u.Password)
	if err != nil {
		fmt.Println(w, "Internal error Hashing password")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// create user
	_, err = a.db.CreateUser(u.Username, string(hashedPassword))
	if err != nil {
		fmt.Println("Internal error Creating user:", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (a *AuthHandler) SignOutHandler(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	})
	w.WriteHeader(http.StatusOK)
}
