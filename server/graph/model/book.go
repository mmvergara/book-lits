package model

import "github.com/google/uuid"

type BookID = uuid.UUID

type Book struct {
	ID          BookID `json:"id"`
	Name        string `json:"name"`
	Created_at  string `json:"created_at"`
	PublisherID PublisherID `json:"publisher"`
	AuthorID    UserID `json:"author"`
}
