package bookish_server

// Book describes a book object that will be returned from the books API.
type Book struct {
	Title         string  `json:"title"`
	Author        *string `json:"author"`
	YearPublished *string `json:"year"`
	ISBN          *string `json:"isbn"`
}
