package inventory

// Storage defines behavior for interacting with the inventory store.
type Storage interface {
	IsBookAvailable(title string) (available bool, err error)
	RenterAlreadyCheckedOut(renterId int, title string) (checkedOut bool, err error)
	CheckoutBook(renterId int, title string) error
	ReturnBook(renterId int, title string) error
}

type service struct {
	store Storage
}

// Service defines behavior for interacting with the inventory service.
type Service interface {
	IsBookAvailable(title string) (available bool, err error)
	CheckoutBook(renterId int, title string) error
	ReturnBook(renterId int, title string) error
}

// NewService creates a new inventory service.
func NewService(s Storage) *service {
	return &service{
		s,
	}
}

// IsBookAvailable checks if a book is available to rent at this library.
func (s *service) IsBookAvailable(title string) (available bool, err error) {
	return s.store.IsBookAvailable(title)
}

// CheckoutBook checks a book out to a renter.
func (s *service) CheckoutBook(renterId int, title string) error {
	available, err := s.IsBookAvailable(title)
	if err != nil {
		return err
	}

	if !available {
		return ErrUnavailableBook
	}

	checkedOut, err := s.store.RenterAlreadyCheckedOut(renterId, title)
	// If there was an error or the book is checked out by the renter already we'll
	// say the book is unavailable.
	if err != nil || checkedOut {
		return ErrUnavailableBook
	}

	return s.store.CheckoutBook(renterId, title)
}

// ReturnBook returns a book for a renter.
func (s *service) ReturnBook(renterId int, title string) error {
	return s.store.ReturnBook(renterId, title)
}
