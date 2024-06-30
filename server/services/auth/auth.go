package auth

import (
	repo "github.com/go-graph-booklets/server/gqlgen-todos/supabase"
	"github.com/google/uuid"
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

var userCtxKey = &contextKey{"user-auth-context"}

type SessionUser struct {
	ID       uuid.UUID
	Username string
}
