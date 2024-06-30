package repo

import (
	"context"
	"fmt"
	"log"

	"github.com/go-graph-booklets/server/gqlgen-todos/graph/model"
	"github.com/google/uuid"
)

// create book
func (sp *Supabase) CreateBook(name string, publisherID uuid.UUID, authorID uuid.UUID) (model.Book, error) {
	book := &struct {
		Name        string `json:"name"`
		PublisherID string `json:"publisher"`
		AuthorID    string `json:"author"`
	}{
		Name:        name,
		PublisherID: publisherID.String(),
		AuthorID:    authorID.String(),
	}
	log.Println("New book: ", book)
	var results = []model.Book{}
	err := sp.Client.DB.From("books").Insert(book).Execute(&results)
	if err != nil {
		return model.Book{}, err
	}

	if len(results) == 0 {
		return model.Book{}, fmt.Errorf("no book created")
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

	if len(results) == 0 {
		return model.Book{}, fmt.Errorf("no book deleted")
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
func (sp *Supabase) GetBooks() ([]*model.Book, error) {
	var results = []*model.Book{}
	err := sp.Client.DB.From("books").Select("*").Execute(&results)
	if err != nil {
		log.Println("Error getting books")
		log.Println(err)
		return []*model.Book{}, err
	}

	return results, nil
}

func (sp *Supabase) GetBooksByIDs(ctx context.Context, IDs []string) ([]*model.Book, []error) {
	var results = []*model.Book{}
	err := sp.Client.DB.From("books").Select("*").In("id", IDs).Execute(&results)
	if err != nil {
		log.Println("Error getting books by ids")
		log.Println(err)
		return []*model.Book{}, []error{err}
	}

	return results, nil
}

// get books by publisher id
func (sp *Supabase) GetBooksByPublisherID(publisherID uuid.UUID) ([]*model.Book, error) {
	var results = []*model.Book{}
	err := sp.Client.DB.From("books").Select("*").Eq("publisher", publisherID.String()).Execute(&results)
	if err != nil {
		log.Println("Error getting books by publisher id")
		log.Println(err)
		return []*model.Book{}, err
	}

	return results, nil
}

// get books by author id
func (sp *Supabase) GetBooksByAuthorID(authorID uuid.UUID) ([]*model.Book, error) {
	var results = []*model.Book{}
	err := sp.Client.DB.From("books").Select("*").Eq("author_id", authorID.String()).Execute(&results)
	if err != nil {
		log.Println("Error getting books by author id")
		log.Println(err)
		return []*model.Book{}, err
	}

	return results, nil
}
