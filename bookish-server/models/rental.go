package models

import (
	"time"

	"github.com/gobuffalo/nulls"
	"github.com/gobuffalo/uuid"
)

type Rental struct {
	ID         uuid.UUID  `db:"id"`
	CreatedAt  time.Time  `db:"created_at"`
	UpdatedAt  time.Time  `db:"updated_at"`
	BookTitle  string     `db:"book_title"`
	RenterID   uuid.UUID  `db:"renter_id"`
	RentalDate time.Time  `db:"rental_date"`
	ReturnDate nulls.Time `db:"return_date"`
	Renter     *Renter    `belongs_to:"renter"`
}
