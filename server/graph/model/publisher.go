package model

import (
	"time"

	"github.com/google/uuid"
)

type Publisher struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Owner     uuid.UUID `json:"owner"`
	CreatedAt time.Time `json:"created_at"`
}
