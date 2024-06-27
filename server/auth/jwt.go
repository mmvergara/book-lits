package auth

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func (a *AuthHandler) createToken(userid uuid.UUID, username string) (string, time.Time, error) {
	expires := time.Now().Add(time.Hour * 24)
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
func (a *AuthHandler) getIdAndNameFromToken(token *jwt.Token) (string, string, error) {
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", "", fmt.Errorf("invalid token claims")
	}

	userid, ok := claims["userid"].(string)
	if !ok {
		return "", "", fmt.Errorf("invalid token claims")
	}

	username, ok := claims["username"].(string)
	if !ok {
		return "", "", fmt.Errorf("invalid token claims")
	}

	return userid, username, nil
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

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
