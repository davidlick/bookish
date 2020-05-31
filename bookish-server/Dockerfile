FROM golang:latest

WORKDIR /go/src/bookish
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["api"]
