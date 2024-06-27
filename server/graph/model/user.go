package model

type User struct {
	ID        string `json:"id"`
	Name      string `json:"username"`
	CreatedAt string `json:"createdAt"`
}
