package auth

import (
	"context"
	"log"
	"net/http"

	repo "github.com/go-graph-booklets/server/gqlgen-todos/supabase"
)

type AuthHandler struct {
	secretKey []byte
	db        *repo.Supabase
}

func NewAuth(secretKey []byte, db *repo.Supabase) *AuthHandler {
	return &AuthHandler{secretKey: secretKey, db: db}
}

// A private key for context that only this package can access. This is important
// to prevent collisions between different context uses
type contextKey struct {
	name string
}

var userCtxKey = &contextKey{"user"}

type IDandName struct {
	ID       string
	Username string
}

// Middleware decodes the share session cookie and packs the session into context
func (a *AuthHandler) Middleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			c, err := r.Cookie("jwt")

			if err != nil || c == nil {
				log.Println("User is not authenticated")
				// next.ServeHTTP(w, r)
				http.Error(w, "Forbidden", http.StatusForbidden)
				return
			}

			// vaidate the cookie
			token, err := a.verifyToken(c.Value)
			if err != nil {
				http.Error(w, "Invalid cookie", http.StatusForbidden)
				return
			}

			userId, username, err := a.getIdAndNameFromToken(token)
			if err != nil {
				http.Error(w, "Invalid cookie", http.StatusForbidden)
				return
			}

			// put it in context
			ctx := context.WithValue(r.Context(), userCtxKey, &IDandName{ID: userId, Username: username})

			// and call the next with our new context
			log.Println("User is authenticated")
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

// ForContext finds the user from the context. REQUIRES Middleware to have run.
func ForContext(ctx context.Context) *IDandName {
	raw, _ := ctx.Value(userCtxKey).(*IDandName)
	return raw
}
