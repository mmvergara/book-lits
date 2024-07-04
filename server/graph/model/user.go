package model

import (
	"github.com/google/uuid"
)

type UserID = uuid.UUID


type User struct {
	ID        UserID `json:"id"`
	Name      string `json:"username"`
	Password  string `json:"password"`
	CreatedAt string `json:"createdAt"`
}
