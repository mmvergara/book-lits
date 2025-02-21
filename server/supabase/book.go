package repo

import (
	"context"
	"fmt"
	"log"

	"github.com/go-graph-booklets/server/gqlgen-todos/graph/model"
)

// create book
func (sp *Supabase) CreateBook(name string, publisherID model.PublisherID, authorID model.UserID) (model.Book, error) {
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
func (sp *Supabase) DeleteBook(bookID model.BookID) (model.Book, error) {
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
func (sp *Supabase) UpdateBookName(bookID model.BookID, name string) (model.Book, error) {
	book := &struct {
		Name string `json:"name"`
	}{
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
func (sp *Supabase) GetBook(bookID model.BookID) (model.Book, error) {
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

// get all books by owner id
func (sp *Supabase) GetAllBooksByOwnerID(ownerID model.UserID) ([]*model.Book, error) {
	var results = []*model.Book{}
	err := sp.Client.DB.From("books").Select("*").Eq("author", ownerID.String()).Execute(&results)
	if err != nil {
		log.Println("Error getting books by owner id")
		log.Println(err)
		return []*model.Book{}, err
	}

	return results, nil
}

func (sp *Supabase) GetBooksByIDs(ctx context.Context, IDs []model.BookID) ([]*model.Book, []error) {
	var results = []*model.Book{}
	var IDsStr = []string{}
	for _, id := range IDs {
		IDsStr = append(IDsStr, id.String())
	}

	err := sp.Client.DB.From("books").Select("*").In("id", IDsStr).Execute(&results)
	if err != nil {
		log.Println("Error getting books by ids")
		log.Println(err)
		return []*model.Book{}, []error{err}
	}

	return results, nil
}

//GetBooksByAuthorIDs

func (sp *Supabase) GetBooksByAuthorIDs(ctx context.Context, authorIDs []model.UserID) ([][]*model.Book, []error) {
	var results = make([][]*model.Book, len(authorIDs))
	var errors = []error{}

	// Convert authorIDs to a slice of strings
	authorIDStrings := make([]string, len(authorIDs))
	for i, id := range authorIDs {
		authorIDStrings[i] = id.String()
	}

	// Query books by author IDs
	var books []*model.Book
	err := sp.Client.DB.From("books").Select("*").In("author", authorIDStrings).Execute(&books)
	if err != nil {
		log.Println("Error getting books by author ids")
		log.Println(err)
		errors = append(errors, err)
		return results, errors
	}

	// Group books by author IDs
	booksByAuthorID := make(map[model.UserID][]*model.Book)
	for _, book := range books {
		authorID := model.UserID(book.AuthorID)
		booksByAuthorID[authorID] = append(booksByAuthorID[authorID], book)
	}

	// Fill results slice with grouped books
	for i, id := range authorIDs {
		results[i] = booksByAuthorID[id]
	}

	return results, nil
}

// get books by publisher id
func (sp *Supabase) GetBooksByPublisherID(publisherID model.PublisherID) ([]*model.Book, error) {
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
func (sp *Supabase) GetBooksByAuthorID(authorID model.UserID) ([]*model.Book, error) {
	var results = []*model.Book{}
	err := sp.Client.DB.From("books").Select("*").Eq("author_id", authorID.String()).Execute(&results)
	if err != nil {
		log.Println("Error getting books by author id")
		log.Println(err)
		return []*model.Book{}, err
	}

	return results, nil
}
