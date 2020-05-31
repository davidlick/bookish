package mysql

import (
	"github.com/gobuffalo/pop"
)

// store holds a connection to the application database.
type store struct {
	*pop.Connection
}

// NewStore creates a new connection to the database and returns a store containing the connection.
func NewStore(dsn string) (s *store, err error) {
	db, err := pop.Connect("development")
	if err != nil {
		return &store{}, err
	}

	return &store{db}, nil
}
