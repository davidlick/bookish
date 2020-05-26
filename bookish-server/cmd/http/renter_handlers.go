package http

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	bookish "github.com/davidlick/bookish/bookish-server"
	"github.com/davidlick/bookish/bookish-server/internal"
)

// registerRenter creates a record of a new renter.
func (s *Server) registerRenter(w http.ResponseWriter, r *http.Request) {
	reqBytes, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	var renter bookish.Renter
	err = json.Unmarshal(reqBytes, &renter)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		return
	}

	id, err := s.Renter.RegisterRenter(renter.Name, renter.Address, renter.Email, renter.PhoneNumber)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	resp := struct {
		ID int `json:"renterId"`
	}{ID: id}

	json.NewEncoder(w).Encode(resp)
}

// listRenters lists all renters registered in the API.
func (s *Server) listRenters(w http.ResponseWriter, r *http.Request) {
	rr, err := s.Renter.ListRenters()
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(rr)
}

// fetchRenter fetches a specific renter's details.
func (s *Server) fetchRenter(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	renter, ok := ctx.Value(internal.CtxRenter).(bookish.Renter)
	if !ok {
		http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
		return
	}

	json.NewEncoder(w).Encode(renter)
}
