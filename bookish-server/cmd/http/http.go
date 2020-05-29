package http

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	bookish "github.com/davidlick/bookish/bookish-server"
	"github.com/davidlick/bookish/bookish-server/inventory"
	"github.com/davidlick/bookish/bookish-server/renter"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/sirupsen/logrus"
)

// Server holds dependencies of the API.
type Server struct {
	Port      string
	BooksHost string
	Logger    *logrus.Logger
	Renter    renter.Service
	Inventory inventory.Service
	// LibraryMap holds a map of values that are returned by the books API. This is used to check
	// if a book exists in the library.
	LibraryMap struct {
		UpdatedTime time.Time
		Map         map[string]bookish.Book
	}
	server *http.Server
}

// Run configures and starts the server.
func (s *Server) Run() error {
	s.server = &http.Server{
		Addr:         ":" + s.Port,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		Handler:      s.BuildRoutes(),
	}

	s.Logger.Info("server launched on port: " + s.Port)
	return s.server.ListenAndServe()
}

// Shutdown attempts to gracefully shutdown the server.
func (s *Server) Shutdown(ctx context.Context) error {
	return s.server.Shutdown(ctx)
}

// UpdateMap will query the books API if 1 hour has passed since the data was last refreshed.
func (s *Server) UpdateMap() error {
	// If it has not been at least an hour since the last refresh we do not need to refresh.
	if !time.Now().After(s.LibraryMap.UpdatedTime.Add(1 * time.Hour)) {
		return nil
	}

	resp, err := http.Get(fmt.Sprintf("%s/api/v1/books", s.BooksHost))
	if err != nil {
		return err
	}

	respBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	var books []bookish.Book
	err = json.Unmarshal(respBytes, &books)
	if err != nil {
		return err
	}

	// Empty the existing map.
	s.LibraryMap.Map = map[string]bookish.Book{}

	for _, book := range books {
		s.LibraryMap.Map[book.Title] = book
	}

	s.LibraryMap.UpdatedTime = time.Now()
	return nil
}

// BuildRoutes builds the API endpoints and connects their handlers.
func (s *Server) BuildRoutes() http.Handler {
	r := chi.NewRouter()

	r.Use(cors)
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Group(func(r chi.Router) {
		r.Route("/api", func(r chi.Router) {
			r.Route("/v1", func(r chi.Router) {
				r.Route("/renters", func(r chi.Router) {
					r.Post("/", s.registerRenter)
					r.Get("/", s.listRenters)
					r.Route("/{renterId}", func(r chi.Router) {
						r.Use(s.renterCtx)
						r.Get("/", s.fetchRenter)
						r.Route("/books", func(r chi.Router) {
							r.Use(s.bookInLibrary)
							r.Post("/checkout", s.checkoutBook)
							r.Post("/return", s.returnBook)
						})
					})
				})
			})
		})
	})

	return r
}
