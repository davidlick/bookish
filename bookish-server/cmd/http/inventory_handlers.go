package http

import (
	"errors"
	"fmt"
	"net/http"

	bookish "github.com/davidlick/bookish/bookish-server"
	"github.com/davidlick/bookish/bookish-server/internal"
	"github.com/davidlick/bookish/bookish-server/inventory"
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

	err := s.Inventory.CheckoutBook(renter.ID, bookTitle)
	if err != nil {
		if errors.Is(inventory.ErrUnavailableBook, err) {
			http.Error(w, err.Error(), http.StatusForbidden)
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

	err := s.Inventory.ReturnBook(renter.ID, bookTitle)
	if err != nil {
		fmt.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
}
