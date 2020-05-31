package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/davidlick/bookish/bookish-server/cmd/http"
	"github.com/davidlick/bookish/bookish-server/mysql"
	"github.com/davidlick/bookish/bookish-server/rental"
	"github.com/davidlick/bookish/bookish-server/renter"
	_ "github.com/go-sql-driver/mysql"
	"github.com/sirupsen/logrus"
)

var (
	cfg    config
	err    error
	logger = logrus.New()
)

func init() {
	// Get configuration from the environment.
	cfg, err = getConfig()
	if err != nil {
		log.Fatal(err.Error())
	}

	// Configure logger.
	logger.SetOutput(os.Stdout)
	logLevel, err := logrus.ParseLevel(cfg.LogLevel)
	if err != nil {
		log.Fatal(err.Error())
	}

	logger.SetLevel(logLevel)
	logger.SetReportCaller(true)
	logger.SetFormatter(&logrus.JSONFormatter{})
}

func main() {
	// Connect to application database and create store.
	appDSN := fmt.Sprintf("mysql://%s:%s@tcp(%s:%s)/bookish?parseTime=true&loc=local&multiStatements=true",
		cfg.DBUser,
		cfg.DBPass,
		cfg.DBHost,
		cfg.DBPort,
	)
	appDB, err := mysql.NewStore(appDSN)
	if err != nil {
		log.Fatalf("could not connect to application database: %v", err.Error())
	}

	// Build domain services.
	renterService := renter.NewService(appDB)
	rentalService := rental.NewService(appDB)

	// Initialize server.
	server := http.Server{
		Port:      cfg.APIPort,
		BooksHost: cfg.BooksHost,
		Logger:    logger,
		Renters:   renterService,
		Rentals:   rentalService,
	}

	// Create channels to listen for OS signals.
	serverErrors := make(chan error, 1)
	osSignals := make(chan os.Signal, 1)
	signal.Notify(osSignals, os.Interrupt, syscall.SIGTERM)

	// Start the server.
	go func() {
		serverErrors <- server.Run()
	}()

	// Block until an error or interrupt/sigterm is received.
	select {
	case err := <-serverErrors:
		log.Fatalf("error starting server: %v", err.Error())
	case <-osSignals:
		log.Println("starting server shutdown...")
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		err := server.Shutdown(ctx)
		if err != nil {
			log.Fatalf("error shutting down http server: %v", err.Error())
		}
	}
}
