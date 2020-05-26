# bookish
bookish is a customer relationship model for library systems. It keeps track of renters and the books they have out.

## Prerequisites

- You will need [Docker Desktop](https://docs.docker.com/desktop/) installed.
- You will need [Golang](https://golang.org/doc/install) installed.

## Getting Started
To run bookish locally you can use the docker-compose in the root directory to spin up the local environment:

```
docker-compose up -d
```

This will start a local MySQL container on port `3306` using the `root` user and password `123pass`. A volume will be mounted that holds spin up SQL scripts that will prepare the database for you.

You will also need to add the following `.env` file to the `bookish-server/cmd/api` folder:

```
export APIPORT=3000
export LOGLEVEL=Debug
export DBHOST=localhost
export DBUSER=root
export DBPASS=123pass
export DBPORT=3306
export BOOKSHOST=<books API endpoint>
```

## Installing

Before running the server call `go mod tidy` from the `bookish/bookish-server` directory to install any dependencies.

## Testing

To run unit tests for `bookish-server` run `go test ./...` from the `bookish/bookish-server` directory.

## Usage