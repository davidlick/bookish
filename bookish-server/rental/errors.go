package rental

import "errors"

var (
	ErrInvalidBook     = errors.New("book not supported in library")
	ErrUnavailableBook = errors.New("book is not available at this library")
)
