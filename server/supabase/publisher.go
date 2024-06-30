package repo

import (
	"context"
	"log"

	"github.com/go-graph-booklets/server/gqlgen-todos/graph/model"
	"github.com/google/uuid"
)

// create publisher
func (sp *Supabase) CreatePublisher(name string, ownerID uuid.UUID) (model.Publisher, error) {
	publisher := &struct {
		Name  string `json:"name"`
		Owner string `json:"owner"`
	}{
		Name:  name,
		Owner: ownerID.String(),
	}
	log.Println("Creating publisher", publisher)
	var results = []model.Publisher{}
	err := sp.Client.DB.From("publishers").Insert(publisher).Execute(&results)
	if err != nil {
		log.Println("Error creating publisher")
		log.Println(err)
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

// get publishers
func (sp *Supabase) GetPublishers() ([]*model.Publisher, error) {
	var results = []*model.Publisher{}
	err := sp.Client.DB.From("publishers").Select("*").Execute(&results)
	if err != nil {
		return nil, err
	}

	return results, nil
}

// get publisher
func (sp *Supabase) GetPublisherByID(publisherID uuid.UUID) (model.Publisher, error) {
	var results = []model.Publisher{}
	err := sp.Client.DB.From("publishers").Select("*").Eq("id", publisherID.String()).Execute(&results)
	if err != nil {
		return model.Publisher{}, err
	}

	return results[0], nil
}

// get publisher by ids
func (sp *Supabase) GetPublisherByIDs(ctx context.Context, publisherIDs []string) ([]*model.Publisher, []error) {
	var results = []*model.Publisher{}
	err := sp.Client.DB.From("publishers").Select("*").In("id", publisherIDs).Execute(&results)
	if err != nil {
		return []*model.Publisher{}, []error{err}
	}

	return results, nil
}

// get publisher by owner id
func (sp *Supabase) GetPublishersByOwnerID(ownerID uuid.UUID) ([]*model.Publisher, error) {
	var results = []*model.Publisher{}
	err := sp.Client.DB.From("publishers").Select("*").Eq("owner", ownerID.String()).Execute(&results)
	if err != nil {
		return []*model.Publisher{}, err
	}

	return results, nil
}
