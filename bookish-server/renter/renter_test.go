package renter

import (
	"errors"
	"testing"

	bookish "github.com/davidlick/bookish/bookish-server"
	"github.com/davidlick/bookish/bookish-server/models"
	"github.com/gofrs/uuid"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/assert"
)

func TestRenter_ListRenters(t *testing.T) {
	testCases := []struct {
		TestName string
		Renters  []models.Renter
		Error    error
	}{
		{
			TestName: "success",
			Renters: []models.Renter{
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

			var expectedRenters []bookish.Renter
			for _, renter := range tc.Renters {
				r := MutateRenterModel(renter)
				expectedRenters = append(expectedRenters, r)
			}

			assert.Equal(t, expectedRenters, renters)
			assert.Equal(t, tc.Error, err)
		})
	}
}

func TestRenter_FetchRenter(t *testing.T) {
	testCases := []struct {
		TestName string
		ID       int
		Renter   models.Renter
		Error    error
	}{
		{
			TestName: "success",
			Renter: models.Renter{
				Name:        "John Smith",
				Address:     "123 Main Way",
				Email:       "john@smith.com",
				PhoneNumber: "5551234567",
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

			renterId, err := uuid.NewV4()
			if err != nil {
				t.Error(err)
			}

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().FetchDetails(renterId.String()).Return(tc.Renter, tc.Error)

			service := NewService(mockStorage)
			renter, err := service.FetchRenter(renterId.String())

			expectedRenter := MutateRenterModel(tc.Renter)
			if tc.Error != nil {
				renter.ID = "00000000-0000-0000-0000-000000000000"
			}

			assert.Equal(t, expectedRenter, renter)
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

			returnUuid, err := uuid.NewV4()
			if err != nil {
				t.Error(err)
			}

			mockStorage := NewMockStorage(ctrl)
			mockStorage.EXPECT().New(tc.Name, tc.Address, tc.Email, tc.PhoneNumber).Return(returnUuid, tc.Error)

			service := NewService(mockStorage)
			id, err := service.RegisterRenter(tc.Name, tc.Address, tc.Email, tc.PhoneNumber)

			assert.Equal(t, returnUuid, id)
			assert.Equal(t, tc.Error, err)
		})
	}
}
