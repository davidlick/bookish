package mysql

import (
	"errors"
)

var (
	ErrNotFound      = errors.New("no renter found")
	ErrAlreadyExists = errors.New("the provided value already exists")
)
