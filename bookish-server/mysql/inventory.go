package mysql

import (
	"database/sql"
	"errors"
	"time"
)

// IsBookAvailable queries the database for available books.
func (s *store) IsBookAvailable(title string) (available bool, err error) {
	q := `
		SELECT
			*
		FROM
			rentals
		WHERE
			book_title = ?
			AND return_date IS NULL;
	`

	var rr []struct {
		ID         int          `db:"id"`
		RenterID   int          `db:"renter_id"`
		RentalDate time.Time    `db:"rental_date"`
		ReturnDate sql.NullTime `db:"return_date"`
		BookTitle  string       `db:"book_title"`
	}

	err = s.Select(&rr, q, title)
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
func (s *store) RenterAlreadyCheckedOut(renterId int, title string) (checkedOut bool, err error) {
	q := `
		SELECT
			*
		FROM
			rentals
		WHERE
			renter_id = ?
			AND book_title = ?
			AND return_date IS NULL;
	`

	var rr []struct {
		ID         int          `db:"id"`
		RenterID   int          `db:"renter_id"`
		RentalDate time.Time    `db:"rental_date"`
		ReturnDate sql.NullTime `db:"return_date"`
		BookTitle  string       `db:"book_title"`
	}

	err = s.Select(&rr, q, renterId, title)
	if err != nil {
		if errors.Is(sql.ErrNoRows, err) {
			return false, nil
		}

		return false, err
	}

	if len(rr) == 0 {
		return false, nil
	}

	return true, nil
}

// CheckoutBook inserts a record indicating the book is checked out to the renter.
func (s *store) CheckoutBook(renterId int, title string) error {
	q := `
		INSERT INTO
			rentals (renter_id, rental_date, book_title)
		VALUES
			(?, ?, ?);
	`

	_, err := s.Exec(q, renterId, time.Now(), title)
	return err
}

// ReturnBook sets the return_date field to now indicating the book has been returned.
func (s *store) ReturnBook(renterId int, title string) error {
	q := `
		UPDATE
			rentals
		SET
			return_date = ?
		WHERE
			renter_id = ?
			AND book_title = ?;
	`

	_, err := s.Exec(q, time.Now(), renterId, title)
	return err
}
