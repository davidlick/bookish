package models

import (
	"time"

	"github.com/gobuffalo/uuid"
)

type Renter struct {
	ID          uuid.UUID `json:"id" db:"id"`
	CreatedAt   time.Time `json:"-" db:"created_at"`
	UpdatedAt   time.Time `json:"-" db:"updated_at"`
	Name        string    `json:"name" db:"name"`
	Address     string    `json:"address" db:"address"`
	Email       string    `json:"email" db:"email"`
	PhoneNumber string    `json:"phoneNumber" db:"phone_number"`
	Rentals     []Rental  `json:"rentals" has_many:"rentals"`
}
