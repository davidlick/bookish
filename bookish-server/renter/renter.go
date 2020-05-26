package renter

import (
	bookish "github.com/davidlick/bookish/bookish-server"
)

// Storage defines behavior for interacting with the renter store.
type Storage interface {
	ListAll() (rr []bookish.Renter, err error)
	FetchDetails(id int) (r bookish.Renter, err error)
	New(name string, address string, email string, phoneNumber string) (id int, err error)
}

type service struct {
	store Storage
}

// Service defines behavior for interacting with the renter service.
type Service interface {
	ListRenters() (rr []bookish.Renter, err error)
	FetchRenter(id int) (r bookish.Renter, err error)
	RegisterRenter(fullName string, address string, email string, phoneNumber string) (id int, err error)
}

// NewService creates a new renter service.
func NewService(s Storage) *service {
	return &service{
		s,
	}
}

// ListRenters returns all renters from the renter store.
func (s *service) ListRenters() (rr []bookish.Renter, err error) {
	return s.store.ListAll()
}

// FetchRenter returns a specific renter from the renter store.
func (s *service) FetchRenter(id int) (r bookish.Renter, err error) {
	return s.store.FetchDetails(id)
}

// RegisterRenter registers a new renter in the renter store.
func (s *service) RegisterRenter(fullName string, address string, email string, phoneNumber string) (id int, err error) {
	return s.store.New(fullName, address, email, phoneNumber)
}
