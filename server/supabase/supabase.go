package repo

import (
	"github.com/nedpals/supabase-go"
)

type Supabase struct {
	Client *supabase.Client
}

func NewSupabaseRepo(client *supabase.Client) *Supabase {
	return &Supabase{
		Client: client,
	}
}
