package repo

import (
	"log"

	"github.com/go-graph-booklets/server/gqlgen-todos/graph/model"
	"github.com/google/uuid"
	"github.com/nedpals/supabase-go"
)

type Supabase struct {
	Client *supabase.Client
}

func NewSP(client *supabase.Client) *Supabase {
	return &Supabase{
		Client: client,
	}
}

// create user
// delete user
// get userById

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
		return model.User{}, err
	}

	return results[0], nil
}

func (sp *Supabase) DeleteUser(userID uuid.UUID) (model.User, error) {
	var results = []model.User{}
	err := sp.Client.DB.From("users").Delete().Eq("id", userID.String()).Execute(&results)
	if err != nil {
		return model.User{}, err
	}

	return results[0], nil
}

func (sp *Supabase) GetUserByName(username string) (model.User, error) {
	var results = []model.User{}
	err := sp.Client.DB.From("users").Select("*").Eq("username", username).Execute(&results)
	if err != nil {
		return model.User{}, err
	}

	return results[0], nil
}

func (sp *Supabase) GetUserById(userID uuid.UUID) (model.User, error) {
	var results = []model.User{}
	err := sp.Client.DB.From("users").Select("*").Eq("id", userID.String()).Execute(&results)
	if err != nil {
		return model.User{}, err
	}
	log.Println(results[0].UserID)
	return results[0], nil
}

// create book
func (sp *Supabase) CreateBook(name string, publisherID uuid.UUID, authorID uuid.UUID) (model.Book, error) {
	book := model.Book{
		Name:        name,
		PublisherID: publisherID,
		AuthorID:    authorID,
	}

	var results = []model.Book{}
	err := sp.Client.DB.From("books").Insert(book).Execute(&results)
	if err != nil {
		return model.Book{}, err
	}

	return results[0], nil
}

// delete book
func (sp *Supabase) DeleteBook(bookID uuid.UUID) (model.Book, error) {
	var results = []model.Book{}
	err := sp.Client.DB.From("books").Delete().Eq("id", bookID.String()).Execute(&results)
	if err != nil {
		return model.Book{}, err
	}

	return results[0], nil
}

// update book name
func (sp *Supabase) UpdateBookName(bookID uuid.UUID, name string) (model.Book, error) {
	book := model.Book{
		Name: name,
	}

	var results = []model.Book{}
	err := sp.Client.DB.From("books").Update(book).Eq("id", bookID.String()).Execute(&results)
	if err != nil {
		return model.Book{}, err
	}

	return results[0], nil
}

// get book
func (sp *Supabase) GetBook(bookID uuid.UUID) (model.Book, error) {
	var results = []model.Book{}
	err := sp.Client.DB.From("books").Select("*").Eq("id", bookID.String()).Execute(&results)
	if err != nil {
		return model.Book{}, err
	}

	return results[0], nil
}

// get books
func (sp *Supabase) GetBooks() ([]model.Book, error) {
	var results = []model.Book{}
	err := sp.Client.DB.From("books").Select("*").Execute(&results)
	if err != nil {
		return []model.Book{}, err
	}

	return results, nil
}

// create publisher
func (sp *Supabase) CreatePublisher(name string) (model.Publisher, error) {
	publisher := model.Publisher{
		Name: name,
	}

	var results = []model.Publisher{}
	err := sp.Client.DB.From("publishers").Insert(publisher).Execute(&results)
	if err != nil {
		return model.Publisher{}, err
	}

	return results[0], nil
}

// delete publisher
func (sp *Supabase) DeletePublisher(publisherID uuid.UUID) (model.Publisher, error) {
	var results = []model.Publisher{}
	err := sp.Client.DB.From("publishers").Delete().Eq("id", publisherID.String()).Execute(&results)
	if err != nil {
		return model.Publisher{}, err
	}

	return results[0], nil
}

// get publisher
func (sp *Supabase) GetPublisher(publisherID uuid.UUID) (model.Publisher, error) {
	var results = []model.Publisher{}
	err := sp.Client.DB.From("publishers").Select("*").Eq("id", publisherID.String()).Execute(&results)
	if err != nil {
		return model.Publisher{}, err
	}

	return results[0], nil
}
