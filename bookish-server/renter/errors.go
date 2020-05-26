package renter

import (
	"errors"
)

var (
	ErrNotFound      = errors.New("no renter found")
	ErrInvalidRenter = errors.New("invalid renter provided")
)
