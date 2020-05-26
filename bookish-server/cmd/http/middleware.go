package http

import (
	"context"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/davidlick/bookish/bookish-server/internal"
	"github.com/davidlick/bookish/bookish-server/mysql"
	"github.com/go-chi/chi"
)

// renterCtx is a convenience handler to fetch the renter with the provided renterId URLParam.
func (s *Server) renterCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		id := chi.URLParam(r, "renterId")

		renterId, err := strconv.Atoi(id)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}

		renter, err := s.Renter.FetchRenter(renterId)
		if err != nil && errors.Is(mysql.ErrNotFound, err) {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		} else if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			return
		}

		ctx = context.WithValue(ctx, internal.CtxRenter, renter)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// bookInLibrary is a convenience handler that queries the books API for a map of books available
// at the library.
func (s *Server) bookInLibrary(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		s.UpdateMap()

		reqBytes, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}

		var req struct {
			Title string `json:"title"`
		}

		err = json.Unmarshal(reqBytes, &req)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}

		if _, found := s.LibraryMap.Map[req.Title]; !found {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}

		ctx = context.WithValue(ctx, internal.CtxBookTitle, req.Title)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
