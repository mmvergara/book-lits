package model

import (
	"time"

	"github.com/google/uuid"
)

type Book struct {
	ID          uuid.UUID  `json:"id"`
	Name        string     `json:"name"`
	CreatedAt   time.Time  `json:"created_at"`
	AuthorID    uuid.UUID  `json:"author_id"`
	PublisherID uuid.UUID  `json:"publisher_id"`
	Author      *User      `json:"author,omitempty"`    // Pointer for optional nested object
	Publisher   *Publisher `json:"publisher,omitempty"` // Pointer for optional nested object
}
