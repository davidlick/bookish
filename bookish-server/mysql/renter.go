package mysql

import (
	"database/sql"
	"errors"

	"github.com/davidlick/bookish/bookish-server/models"
	"github.com/gofrs/uuid"
)

// ListAll returns all renter records.
func (s *store) ListAll() (rr []models.Renter, err error) {
	err = s.Eager().All(&rr)
	if err != nil && errors.Is(sql.ErrNoRows, err) {
		return nil, ErrNotFound
	}

	return
}

// FetchDetails queries the database for a specific renter.
func (s *store) FetchDetails(id string) (r models.Renter, err error) {
	err = s.Eager().Find(&r, id)
	return
}

// New inserts a record for a new renter. If that renter already exists it returns an ErrAlreadyExists.
func (s *store) New(name string, address string, email string, phoneNumber string) (id uuid.UUID, err error) {
	r := models.Renter{
		Name:        name,
		Address:     address,
		Email:       email,
		PhoneNumber: phoneNumber,
	}

	// Create the new renter.
	err = s.Create(&r)
	if err != nil {
		return
	}

	// Get the last renter created.
	r = models.Renter{}
	err = s.Last(&r)
	return r.ID, err
}
