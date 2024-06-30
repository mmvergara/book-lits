package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/go-graph-booklets/server/gqlgen-todos/graph"
	"github.com/go-graph-booklets/server/gqlgen-todos/services/auth"
	"github.com/go-graph-booklets/server/gqlgen-todos/services/loaders"
	repo "github.com/go-graph-booklets/server/gqlgen-todos/supabase"
	"github.com/joho/godotenv"
	"github.com/nedpals/supabase-go"
)

const defaultPort = "8080"

func main() {
	godotenv.Load(".env")
	PORT := os.Getenv("PORT")
	SUPABASE_URL := os.Getenv("SUPABASE_URL")
	SUPABASE_KEY := os.Getenv("SUPABASE_KEY")
	JWT_SECRET := []byte(os.Getenv("SUPABASE_JWT_SECRET"))

	if PORT == "" {
		PORT = defaultPort
	}
	if SUPABASE_URL == "" {
		log.Fatal("SUPABASE_URL is missing in environment variables")
	}
	if SUPABASE_KEY == "" {
		log.Fatal("SUPABASE_KEY is missing in environment variables")
	}
	if JWT_SECRET == nil {
		log.Fatal("SUPABASE_JJWT_SECRET is missing in environment variables")
	}

	router := chi.NewRouter()
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowCredentials: true,
		Debug:            false,
	}))

	// modules
	client := supabase.CreateClient(SUPABASE_URL, SUPABASE_KEY)
	repo := repo.NewSupabaseRepo(client)
	authHandler := auth.NewAuth([]byte(JWT_SECRET), repo)
	loader := loaders.NewLoaders(repo)
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		Repo: repo,
	}}))

	router.Group(func(r chi.Router) {
		r.Get("/", playground.Handler("GraphQL playground", "/query"))
		r.Post("/auth/signin", http.HandlerFunc(authHandler.SignInHandler))
		r.Post("/auth/signup", http.HandlerFunc(authHandler.SignUpHandler))
		r.Post("/auth/signout", http.HandlerFunc(authHandler.SignOutHandler))

	})

	router.Group(func(r chi.Router) {
		r.Use(authHandler.Middleware())
		r.Use(loader.Middleware())
		r.Post("/query", srv.ServeHTTP)
	})

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", PORT)
	log.Fatal(http.ListenAndServe("localhost:"+PORT, router))
}
