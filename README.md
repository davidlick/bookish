# bookish
bookish is a customer relationship model for library systems. It keeps track of renters and the books they have out.

## Prerequisites

- You will need [Docker Desktop](https://docs.docker.com/desktop/) installed.

## Getting Started

To run bookish locally first set the `BOOKSHOST` environment variable in `./docker-compose.yml` to the Books API hostname. You can then use the docker-compose from the root directory to spin up the local environment:

```
docker-compose up -d
```

This will start a local MySQL container on port `3306` using the `root` user and password `123pass`. A volume will be mounted that holds spin up SQL scripts that will prepare the database for you.ish-server` directory.