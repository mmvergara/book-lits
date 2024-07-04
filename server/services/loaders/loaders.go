package loaders

import (
	"context"
	"net/http"
	"time"

	"github.com/go-graph-booklets/server/gqlgen-todos/graph/model"
	repo "github.com/go-graph-booklets/server/gqlgen-todos/supabase"
	"github.com/vikstrous/dataloadgen"
)

type ctxKey string

const (
	loadersKey = ctxKey("dataloaders")
)

// Loaders wrap your data loaders to inject via middleware
type Loaders struct {
	UserLoader             *dataloadgen.Loader[model.UserID, *model.User]
	BookLoader             *dataloadgen.Loader[model.BookID, *model.Book]
	BookByAuthorLoader     *dataloadgen.Loader[model.UserID, []*model.Book]
	PublisherLoader        *dataloadgen.Loader[model.PublisherID, *model.Publisher]
	PublisherByOwnerLoader *dataloadgen.Loader[model.UserID, []*model.Publisher]

	Repo *repo.Supabase
}

// NewLoaders instantiates data loaders for the middleware
func NewLoaders(repo *repo.Supabase) *Loaders {
	return &Loaders{
		UserLoader:             dataloadgen.NewLoader(repo.GetUsersByIDs, dataloadgen.WithWait(time.Millisecond)),
		BookLoader:             dataloadgen.NewLoader(repo.GetBooksByIDs, dataloadgen.WithWait(time.Millisecond)),
		BookByAuthorLoader:     dataloadgen.NewLoader(repo.GetBooksByAuthorIDs, dataloadgen.WithWait(time.Millisecond)),
		PublisherLoader:        dataloadgen.NewLoader(repo.GetPublisherByIDs, dataloadgen.WithWait(time.Millisecond)),
		PublisherByOwnerLoader: dataloadgen.NewLoader(repo.GetPublisherByOwnerIDs, dataloadgen.WithWait(time.Millisecond)),

		Repo: repo,
	}
}

// Middleware injects data loaders into the context
func (l *Loaders) Middleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		// return a middleware that injects the loader to the request context
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			r = r.WithContext(context.WithValue(r.Context(), loadersKey, l))
			next.ServeHTTP(w, r)
		})
	}
}

// For returns the dataloader for a given context
func For(ctx context.Context) *Loaders {
	return ctx.Value(loadersKey).(*Loaders)
}
