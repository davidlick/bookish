package renter

import (
	bookish "github.com/davidlick/bookish/bookish-server"
	"github.com/davidlick/bookish/bookish-server/models"
	"github.com/gobuffalo/uuid"
)

// Storage defines behavior for interacting with the renter store.
type Storage interface {
	ListAll() (rr []models.Renter, err error)
	FetchDetails(id string) (r models.Renter, err error)
	New(name string, address string, email string, phoneNumber string) (id uuid.UUID, err error)
}

type service struct {
	store Storage
}

// Service defines behavior for interacting with the renter service.
type Service interface {
	ListRenters() (rr []bookish.Renter, err error)
	FetchRenter(id string) (r bookish.Renter, err error)
	RegisterRenter(fullName string, address string, email string, phoneNumber string) (id uuid.UUID, err error)
}

// NewService creates a new renter service.
func NewService(s Storage) *service {
	return &service{
		s,
	}
}

// ListRenters returns all renters from the renter store.
func (s *service) ListRenters() (rr []bookish.Renter, err error) {
	renters, err := s.store.ListAll()
	if err != nil {
		return nil, err
	}

	for _, renter := range renters {
		r := MutateRenterModel(renter)
		rr = append(rr, r)
	}

	return rr, nil
}

// FetchRenter returns a specific renter from the renter store.
func (s *service) FetchRenter(id string) (r bookish.Renter, err error) {
	renter, err := s.store.FetchDetails(id)
	if err != nil {
		return r, err
	}

	r = MutateRenterModel(renter)
	return r, nil
}

// RegisterRenter registers a new renter in the renter store.
func (s *service) RegisterRenter(fullName string, address string, email string, phoneNumber string) (id uuid.UUID, err error) {
	return s.store.New(fullName, address, email, phoneNumber)
}

// MutateRenterModel is a convenience function to mutate a models.Renter into a bookish.Renter.
func MutateRenterModel(m models.Renter) bookish.Renter {
	r := bookish.Renter{}

	r.ID = m.ID.String()
	r.Name = m.Name
	r.Address = m.Address
	r.Email = m.Email
	r.PhoneNumber = m.PhoneNumber

	for _, rental := range m.Rentals {
		if !rental.ReturnDate.Valid {
			r.Rentals = append(r.Rentals, rental.BookTitle)
		}
	}

	return r
}
