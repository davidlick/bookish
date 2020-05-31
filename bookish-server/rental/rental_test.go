package rental

import (
	"errors"
	"testing"

	"github.com/gofrs/uuid"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func TestRental_IsBookAvailable(t *testing.T) {
	testCases := []struct {
		TestName  string
		Title     string
		Available bool
		Error     error
	}{
		{
			TestName:  "success-available",
			Title:     "Book #1",
			Available: true,
		},
		{
			TestName:  "success-unavailable",
			Title:     "Book #2",
			Available: false,
		},
		{
			TestName: "failure",
			Title:    "Book #3",
			Error:    errors.New("test error"),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.TestName, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().IsBookAvailable(tc.Title).Return(tc.Available, tc.Error)

			service := NewService(mockStorage)
			available, err := service.IsBookAvailable(tc.Title)

			assert.Equal(t, tc.Available, available)
			assert.Equal(t, tc.Error, err)
		})
	}
}

func TestRental_CheckoutBook(t *testing.T) {
	testCases := []struct {
		TestName        string
		Title           string
		Available       bool
		AvailableError  error
		CheckedOut      bool
		CheckedOutError error
		Error           error
	}{
		{
			TestName:  "success",
			Title:     "Book #1",
			Available: true,
		},
		{
			TestName:  "unavailable",
			Title:     "Book #2",
			Available: false,
			Error:     ErrUnavailableBook,
		},
		{
			TestName:       "availability_error",
			Title:          "Book #3",
			AvailableError: errors.New("test error"),
			Error:          errors.New("test error"),
		},
		{
			TestName:   "checked-out",
			Title:      "Book #4",
			Available:  true,
			CheckedOut: true,
			Error:      ErrUnavailableBook,
		},
		{
			TestName:  "failure",
			Title:     "Book #4",
			Available: true,
			Error:     errors.New("test error"),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.TestName, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			renterId, err := uuid.NewV4()
			if err != nil {
				t.Error(err)
			}

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().IsBookAvailable(tc.Title).Return(tc.Available, tc.AvailableError)
			if tc.Available && tc.AvailableError == nil {
				mockStorage.EXPECT().RenterAlreadyCheckedOut(renterId, tc.Title).Return(tc.CheckedOut, tc.CheckedOutError)
				if !tc.CheckedOut && tc.CheckedOutError == nil {
					mockStorage.EXPECT().CheckoutBook(renterId, tc.Title).Return(tc.Error)
				}
			}

			service := NewService(mockStorage)
			err = service.CheckoutBook(renterId, tc.Title)

			assert.Equal(t, tc.Error, err)
		})
	}
}

func TestRental_ReturnBook(t *testing.T) {
	testCases := []struct {
		TestName string
		Title    string
		Error    error
	}{
		{
			TestName: "success",
			Title:    "Book #1",
		},
		{
			TestName: "failure",
			Title:    "Book #2",
			Error:    errors.New("test error"),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.TestName, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			renterId, err := uuid.NewV4()
			if err != nil {
				t.Error(err)
			}

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().ReturnBook(renterId, tc.Title).Return(tc.Error)

			service := NewService(mockStorage)
			err = service.ReturnBook(renterId, tc.Title)

			assert.Equal(t, tc.Error, err)
		})
	}
}
