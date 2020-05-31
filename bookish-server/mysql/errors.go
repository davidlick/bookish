package mysql

import (
	"errors"
)

var (
	ErrNotFound      = errors.New("empty result")
	ErrAlreadyExists = errors.New("the provided value already exists")
)
