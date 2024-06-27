package auth

import (
	"context"
	"log"
	"net/http"
)

// Middleware decodes the share session cookie and packs the session into context
func (a *AuthHandler) Middleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			c, err := r.Cookie("jwt")
			log.Println("Checking for cookie")
			if err != nil || c == nil {
				log.Println("User is not authenticated")
				next.ServeHTTP(w, r)
				return
			}

			// validate the token
			token, err := a.verifyToken(c.Value)
			if err != nil {
				log.Println("User is not authenticated")
				log.Println(err)
				http.Error(w, "Invalid cookie", http.StatusForbidden)
				return
			}

			// get the user id and name from the token
			userId, username, err := a.getIdAndNameFromToken(token)
			if err != nil {
				log.Println("User is not authenticated")
				log.Println(err)
				http.Error(w, "Invalid cookie", http.StatusForbidden)
				return
			}

			// put it in context
			ctx := context.WithValue(r.Context(), userCtxKey, &SessionUser{ID: userId, Username: username})

			// and call the next with our new context
			log.Println("User is authenticated")
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

// ForContext finds the user from the context. REQUIRES Middleware to have run.
func ForContext(ctx context.Context) *SessionUser {

	raw, _ := ctx.Value(userCtxKey).(*SessionUser)
	return raw
}
