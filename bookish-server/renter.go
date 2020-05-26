package bookish_server

// Renter is an entity in the Bookish API wish rents books.
type Renter struct {
	ID          int    `db:"id" json:"id"`
	Name        string `db:"name" json:"name"`
	Address     string `db:"address" json:"address"`
	Email       string `db:"email" json:"email"`
	PhoneNumber string `db:"phone_number" json:"phoneNumber"`
}
