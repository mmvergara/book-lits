package model

type Book struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Created_at  string `json:"created_at"`
	PublisherID string `json:"publisher"`
	AuthorID    string `json:"author"`
}
