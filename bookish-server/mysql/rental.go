package mysql

import (
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/davidlick/bookish/bookish-server/models"
	"github.com/gobuffalo/nulls"
	"github.com/gobuffalo/uuid"
)

// IsBookAvailable queries the database for available books.
func (s *store) IsBookAvailable(title string) (available bool, err error) {
	rr := []models.Rental{}
	err = s.Where(fmt.Sprintf("book_title = '%s'", title)).Where("return_date IS NULL").All(&rr)
	if err != nil {
		// If no records are returned then the book is available for rent.
		if errors.Is(sql.ErrNoRows, err) {
			return true, nil
		}

		return false, err
	}

	// If 5 books are rented out this book is not available.
	if len(rr) > 4 {
		return false, nil
	}

	return true, nil
}

// RenterAlreadyCheckedOut queries the database for the given renterId and title. If a record is returned checkedOut will be true.
func (s *store) RenterAlreadyCheckedOut(renterId uuid.UUID, title string) (checkedOut bool, err error) {
	rr := []models.Rental{}
	err = s.Where(fmt.Sprintf("renter_id = '%s'", renterId)).
		Where(fmt.Sprintf("book_title = '%s'", title)).
		Where("return_date IS NULL").
		All(&rr)
	if err != nil {
		// If no records are returned then the book is available for rent.
		if errors.Is(sql.ErrNoRows, err) {
			return false, nil
		}

		return false, err
	}

	// If 5 books are rented out this book is not available.
	if len(rr) == 0 {
		return false, nil
	}

	return true, nil
}

// CheckoutBook inserts a record indicating the book is checked out to the renter.
func (s *store) CheckoutBook(renterId uuid.UUID, title string) error {
	r := models.Rental{BookTitle: title, RenterID: renterId, RentalDate: time.Now()}
	err := s.Create(&r)
	return err
}

// ReturnBook sets the return_date field to now indicating the book has been returned.
func (s *store) ReturnBook(renterId uuid.UUID, title string) error {
	r := models.Rental{}
	err := s.Where(fmt.Sprintf("renter_id = '%s'", renterId)).
		Where(fmt.Sprintf("book_title = '%s'", title)).
		Where("return_date IS NULL").
		First(&r)
	if err != nil {
		return ErrNotFound
	}

	r.ReturnDate = nulls.Time{Time: time.Now(), Valid: true}

	err = s.Save(&r)
	return err
}
