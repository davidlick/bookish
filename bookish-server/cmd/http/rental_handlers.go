package http

import (
	"errors"
	"net/http"

	bookish "github.com/davidlick/bookish/bookish-server"
	"github.com/davidlick/bookish/bookish-server/internal"
	"github.com/davidlick/bookish/bookish-server/mysql"
	"github.com/davidlick/bookish/bookish-server/rental"
	"github.com/gobuffalo/uuid"
)

// checkoutBook is used to checkout a book for a renter.
func (s *Server) checkoutBook(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	renter, ok := ctx.Value(internal.CtxRenter).(bookish.Renter)
	if !ok {
		http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
		return
	}

	bookTitle, ok := ctx.Value(internal.CtxBookTitle).(string)
	if !ok {
		http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
		return
	}

	id, err := uuid.FromString(renter.ID)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	err = s.Rentals.CheckoutBook(id, bookTitle)
	if err != nil {
		if errors.Is(rental.ErrUnavailableBook, err) {
			http.Error(w, http.StatusText(http.StatusForbidden), http.StatusForbidden)
			return
		}

		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}

// returnBook returns a book for a renter.
func (s *Server) returnBook(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	renter, ok := ctx.Value(internal.CtxRenter).(bookish.Renter)
	if !ok {
		http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
		return
	}

	bookTitle, ok := ctx.Value(internal.CtxBookTitle).(string)
	if !ok {
		http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
		return
	}

	id, err := uuid.FromString(renter.ID)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	}

	err = s.Rentals.ReturnBook(id, bookTitle)
	if err != nil && errors.Is(mysql.ErrNotFound, err) {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
