package main

import (
	"github.com/kelseyhightower/envconfig"
)

type config struct {
	APIPort   string
	LogLevel  string
	DBHost    string
	DBUser    string
	DBPass    string
	DBPort    string
	BooksHost string
}

func getConfig() (cfg config, err error) {
	err = envconfig.Process("", &cfg)
	return
}
