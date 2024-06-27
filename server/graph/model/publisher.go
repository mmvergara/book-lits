package model

type Publisher struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
	OwnerID   string `json:"owner"`
}
