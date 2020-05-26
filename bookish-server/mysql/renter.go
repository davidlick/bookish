package mysql

import (
	"database/sql"
	"errors"

	bookish "github.com/davidlick/bookish/bookish-server"
	"github.com/go-sql-driver/mysql"
)

// ListAll returns all renter records.
func (s *store) ListAll() (rr []bookish.Renter, err error) {
	q := `
		SELECT
			*
		FROM
			renters
	`

	err = s.Select(&rr, q)
	if err != nil && errors.Is(sql.ErrNoRows, err) {
		return nil, ErrNotFound
	}
	return
}

// FetchDetails queries the database for a specific renter.
func (s *store) FetchDetails(id int) (r bookish.Renter, err error) {
	q := `
		SELECT
			*
		FROM
			renters
		WHERE
			id = ?
	`

	err = s.Get(&r, q, id)
	if err != nil && errors.Is(sql.ErrNoRows, err) {
		return bookish.Renter{}, ErrNotFound
	}
	return
}

// New inserts a record for a new renter. If that renter already exists it returns an ErrAlreadyExists.
func (s *store) New(name string, address string, email string, phoneNumber string) (id int, err error) {
	q := `
		INSERT INTO
			renters (name, address, email, phone_number)
		VALUES
			(?, ?, ?, ?)
	`

	result, err := s.Exec(q, name, address, email, phoneNumber)
	if err != nil {
		if _, ok := err.(*mysql.MySQLError); ok {
			return 0, ErrAlreadyExists
		}
	}

	lastId, err := result.LastInsertId()
	if err != nil {
		return id, err
	}
	return int(lastId), nil
}
