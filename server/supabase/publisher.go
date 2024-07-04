package repo

import (
	"context"
	"log"

	"github.com/go-graph-booklets/server/gqlgen-todos/graph/model"
)

// create publisher
func (sp *Supabase) CreatePublisher(name string, ownerID model.PublisherID) (model.Publisher, error) {
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
func (sp *Supabase) DeletePublisher(publisherID model.PublisherID) (model.Publisher, error) {
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
func (sp *Supabase) GetPublisherByID(publisherID model.PublisherID) (model.Publisher, error) {
	var results = []model.Publisher{}
	err := sp.Client.DB.From("publishers").Select("*").Eq("id", publisherID.String()).Execute(&results)
	if err != nil {
		return model.Publisher{}, err
	}

	return results[0], nil
}

// get publisher by ids
func (sp *Supabase) GetPublisherByIDs(ctx context.Context, publisherIDs []model.PublisherID) ([]*model.Publisher, []error) {
	var results = []*model.Publisher{}
	var PublisherIDsStr = []string{}
	for _, id := range publisherIDs {
		PublisherIDsStr = append(PublisherIDsStr, id.String())
	}

	err := sp.Client.DB.From("publishers").Select("*").In("id", PublisherIDsStr).Execute(&results)
	if err != nil {
		return []*model.Publisher{}, []error{err}
	}

	return results, nil
}

// get publisher by owner id
func (sp *Supabase) GetPublishersByOwnerID(ownerID model.PublisherID) ([]*model.Publisher, error) {
	var results = []*model.Publisher{}
	err := sp.Client.DB.From("publishers").Select("*").Eq("owner", ownerID.String()).Execute(&results)
	if err != nil {
		return []*model.Publisher{}, err
	}

	return results, nil
}

// update publisher name by id
func (sp *Supabase) UpdatePublisherNameByID(publisherID model.PublisherID, name string) (model.Publisher, error) {
	publisher := &struct {
		Name string `json:"name"`
	}{
		Name: name,
	}
	var results = []model.Publisher{}
	err := sp.Client.DB.From("publishers").Update(publisher).Eq("id", publisherID.String()).Execute(&results)
	if err != nil {
		return model.Publisher{}, err
	}

	return results[0], nil
}