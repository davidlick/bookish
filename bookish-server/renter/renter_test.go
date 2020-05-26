package renter

import (
	"errors"
	"testing"

	bookish "github.com/davidlick/bookish/bookish-server"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func TestRenter_ListRenters(t *testing.T) {
	testCases := []struct {
		TestName string
		Renters  []bookish.Renter
		Error    error
	}{
		{
			TestName: "success",
			Renters: []bookish.Renter{
				{
					Name:        "John Doe",
					Address:     "123 Main Way",
					Email:       "john@doe.com",
					PhoneNumber: "5551234567",
				},
				{
					Name:        "Jack Doe",
					Address:     "123 Elm Street",
					Email:       "jack@doe.com",
					PhoneNumber: "1112223333",
				},
			},
		},
		{
			TestName: "error",
			Error:    errors.New("test error"),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.TestName, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().ListAll().Return(tc.Renters, tc.Error)

			service := NewService(mockStorage)
			renters, err := service.ListRenters()

			assert.Equal(t, tc.Renters, renters)
			assert.Equal(t, tc.Error, err)
		})
	}
}

func TestRenter_FetchRenter(t *testing.T) {
	testCases := []struct {
		TestName string
		ID       int
		Renter   bookish.Renter
		Error    error
	}{
		{
			TestName: "success",
			ID:       1,
			Renter: bookish.Renter{
				Name:        "John Smith",
				Address:     "123 Main Way",
				Email:       "john@smith.com",
				PhoneNumber: "5551234567",
			},
		},
		{
			TestName: "error",
			ID:       1,
			Error:    errors.New("test error"),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.TestName, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().FetchDetails(tc.ID).Return(tc.Renter, tc.Error)

			service := NewService(mockStorage)
			renter, err := service.FetchRenter(tc.ID)

			assert.Equal(t, tc.Renter, renter)
			assert.Equal(t, tc.Error, err)
		})
	}
}

func TestRenter_RegisterRenter(t *testing.T) {
	testCases := []struct {
		TestName    string
		Name        string
		Address     string
		Email       string
		PhoneNumber string
		ReturnID    int
		Error       error
	}{
		{
			TestName: "success",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.TestName, func(t *testing.T) {
			ctrl := gomock.NewController(t)
			defer ctrl.Finish()

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().New(tc.Name, tc.Address, tc.Email, tc.PhoneNumber).Return(tc.ReturnID, tc.Error)

			service := NewService(mockStorage)
			id, err := service.RegisterRenter(tc.Name, tc.Address, tc.Email, tc.PhoneNumber)

			assert.Equal(t, tc.ReturnID, id)
			assert.Equal(t, tc.Error, err)
		})
	}
}
