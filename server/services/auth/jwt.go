package auth

import (
	"fmt"
	"log"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func (a *AuthHandler) createToken(userid uuid.UUID, username string) (string, time.Time, error) {
	expires := time.Now().Add(time.Hour * 24)
	log.Println("From createToken: ", userid, username)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"userid":   userid.String(),
			"username": username,
			"exp":      expires.Unix(),
		})

	tokenString, err := token.SignedString(a.secretKey)
	if err != nil {
		return "", expires, err
	}

	return tokenString, expires, nil
}

// get token claims
func (a *AuthHandler) getIdAndNameFromToken(token *jwt.Token) (uuid.UUID, string, error) {
	claims, ok := token.Claims.(jwt.MapClaims)
	nilUUID := uuid.UUID{}

	if !ok {
		return nilUUID, "", fmt.Errorf("invalid token claims")
	}

	userid, ok := claims["userid"].(string)
	if !ok {
		return nilUUID, "", fmt.Errorf("invalid token claims")
	}

	username, ok := claims["username"].(string)
	if !ok {
		return nilUUID, "", fmt.Errorf("invalid token claims")
	}

	uid, err := uuid.Parse(userid)
	if err != nil {
		return nilUUID, "", fmt.Errorf("invalid token claims")
	}
	log.Println("From getIdAndNameFromToken: ", uid, username)
	return uid, username, nil
}

func (a *AuthHandler) verifyToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return a.secretKey, nil
	})

	if err != nil {
		return &jwt.Token{}, err
	}

	if !token.Valid {
		return &jwt.Token{}, fmt.Errorf("invalid token")
	}

	return token, nil
}
