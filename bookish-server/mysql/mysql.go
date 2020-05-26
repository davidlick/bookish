package mysql

import (
	"github.com/jmoiron/sqlx"
)

// store holds a connection to the application database.
type store struct {
	*sqlx.DB
}

// NewStore creates a new connection to the database and returns a store containing the connection.
func NewStore(dsn string) (s *store, err error) {
	db, err := sqlx.Open("mysql", dsn)
	if err != nil {
		return s, err
	}

	return &store{db}, nil
}
