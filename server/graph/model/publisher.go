package model

import "github.com/google/uuid"

type PublisherID = uuid.UUID

type Publisher struct {
	ID        PublisherID `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
	OwnerID   UserID `json:"owner"`
}
