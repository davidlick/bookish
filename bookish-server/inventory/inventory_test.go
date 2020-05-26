package inventory

import (
	"errors"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func TestInventory_IsBookAvailable(t *testing.T) {
	testCases := []struct {
		TestName  string
		Title     string
		RenterId  int
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

func TestInventory_CheckoutBook(t *testing.T) {
	testCases := []struct {
		TestName        string
		RenterId        int
		Title           string
		Available       bool
		AvailableError  error
		CheckedOut      bool
		CheckedOutError error
		Error           error
	}{
		{
			TestName:  "success",
			RenterId:  1,
			Title:     "Book #1",
			Available: true,
		},
		{
			TestName:  "unavailable",
			RenterId:  2,
			Title:     "Book #2",
			Available: false,
			Error:     ErrUnavailableBook,
		},
		{
			TestName:       "availability_error",
			RenterId:       3,
			Title:          "Book #3",
			AvailableError: errors.New("test error"),
			Error:          errors.New("test error"),
		},
		{
			TestName:   "checked-out",
			RenterId:   4,
			Title:      "Book #4",
			Available:  true,
			CheckedOut: true,
			Error:      ErrUnavailableBook,
		},
		{
			TestName:  "failure",
			RenterId:  4,
			Title:     "Book #4",
			Available: true,
			Error:     errors.New("test error"),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.TestName, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().IsBookAvailable(tc.Title).Return(tc.Available, tc.AvailableError)
			if tc.Available && tc.AvailableError == nil {
				mockStorage.EXPECT().RenterAlreadyCheckedOut(tc.RenterId, tc.Title).Return(tc.CheckedOut, tc.CheckedOutError)
				if !tc.CheckedOut && tc.CheckedOutError == nil {
					mockStorage.EXPECT().CheckoutBook(tc.RenterId, tc.Title).Return(tc.Error)
				}
			}

			service := NewService(mockStorage)
			err := service.CheckoutBook(tc.RenterId, tc.Title)

			assert.Equal(t, tc.Error, err)
		})
	}
}

func TestInventory_ReturnBook(t *testing.T) {
	testCases := []struct {
		TestName string
		RenterId int
		Title    string
		Error    error
	}{
		{
			TestName: "success",
			RenterId: 1,
			Title:    "Book #1",
		},
		{
			TestName: "failure",
			RenterId: 2,
			Title:    "Book #2",
			Error:    errors.New("test error"),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.TestName, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().ReturnBook(tc.RenterId, tc.Title).Return(tc.Error)

			service := NewService(mockStorage)
			err := service.ReturnBook(tc.RenterId, tc.Title)

			assert.Equal(t, tc.Error, err)
		})
	}
}
