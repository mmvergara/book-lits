package repo

import (
	"fmt"
	"log"

	"github.com/go-graph-booklets/server/gqlgen-todos/graph/model"
	"github.com/google/uuid"
)

func (sp *Supabase) CreateUser(username string, hashedPassword string) (model.User, error) {
	user := &struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}{
		Username: username,
		Password: hashedPassword,
	}

	var results = []model.User{}
	err := sp.Client.DB.From("users").Insert(user).Execute(&results)
	if err != nil {
		log.Println("Error creating user")
		log.Println(err)
		return model.User{}, err
	}

	if len(results) == 0 {
		log.Println("No user created!")
		return model.User{}, nil
	}

	return results[0], nil
}

func (sp *Supabase) DeleteUser(userID uuid.UUID) (model.User, error) {
	var results = []model.User{}
	err := sp.Client.DB.From("users").Delete().Eq("id", userID.String()).Execute(&results)
	if err != nil {
		log.Println("Error deleting user")
		log.Println(err)
		return model.User{}, err
	}

	return results[0], nil
}

func (sp *Supabase) GetUserByName(username string) (model.User, error) {
	var results = []model.User{}
	log.Println("Getting user by name", username)
	err := sp.Client.DB.From("users").Select("*").Eq("username", username).Execute(&results)

	if err != nil {
		log.Println("Error getting user by name")
		log.Println(err)
		return model.User{}, err
	}

	if len(results) == 0 {
		return model.User{}, fmt.Errorf("no user found")
	}

	return results[0], nil
}

// get all users
func (sp *Supabase) GetUsers() ([]*model.User, error) {
	var results = []*model.User{}
	err := sp.Client.DB.From("users").Select("*").Execute(&results)
	if err != nil {
		log.Println("Error getting users")
		log.Println(err)
		return nil, err
	}

	return results, nil
}

func (sp *Supabase) GetUserById(userID uuid.UUID) (model.User, error) {
	var results = []model.User{}
	err := sp.Client.DB.From("users").Select("*").Eq("id", userID.String()).Execute(&results)
	if err != nil {
		return model.User{}, err
	}
	if len(results) == 0 {
		return model.User{}, fmt.Errorf("could not find user")
	}
	log.Println(results[0].ID)
	return results[0], nil
}
