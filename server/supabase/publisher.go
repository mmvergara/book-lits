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

// get publishers by ids
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

func (r *Supabase) GetPublisherByOwnerIDs(ctx context.Context, ownerIDs []model.UserID) ([][]*model.Publisher, []error) {
	var results = make([][]*model.Publisher, len(ownerIDs))
	var errors = []error{}

	// Convert ownerIDs to a slice of strings
	ownerIDStrings := make([]string, len(ownerIDs))
	for i, id := range ownerIDs {
		ownerIDStrings[i] = id.String()
	}

	// Query publishers by owner IDs
	var publishers []*model.Publisher
	err := r.Client.DB.From("publishers").Select("*").In("owner", ownerIDStrings).Execute(&publishers)
	if err != nil {
		errors = append(errors, err)
		return results, errors
	}

	// Group publishers by owner IDs
	publishersByOwnerID := make(map[model.UserID][]*model.Publisher)
	for _, publisher := range publishers {
		ownerID := model.UserID(publisher.OwnerID)
		publishersByOwnerID[ownerID] = append(publishersByOwnerID[ownerID], publisher)
	}

	// Fill results slice with grouped publishers
	for i, id := range ownerIDs {
		results[i] = publishersByOwnerID[id]
	}

	return results, nil
}

// get all publisher by owner id
func (sp *Supabase) GetAllPublishersByOwnerID(ownerID model.PublisherID) ([]*model.Publisher, error) {
	var results = []*model.Publisher{}
	err := sp.Client.DB.From("publishers").Select("*").Eq("owner", ownerID.String()).Execute(&results)
	if err != nil {
		return []*model.Publisher{}, err
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
