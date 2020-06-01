import { actionTypes } from '../constants/books/action_types';
import booksApi from '../api/booksAPI';
import googleBooksApi from '../api/googleBooks';
import bookishApi from '../api/bookish';

import { Dispatch } from 'redux';

import { fetchRenters } from './renters';

export function fetchBooks() {
    return (dispatch: Dispatch) => {
        dispatch({ type: actionTypes.FETCH_BOOKS.request });

        booksApi.get('/books')
            .then(res => {
                dispatch({
                    type: actionTypes.FETCH_BOOKS.success,
                    data: res.data
                })
            })
            .catch(err => dispatch({
                type: actionTypes.FETCH_BOOKS.failure,
                err: err.message
            }));
    }
}

export function fetchBookCover(title: string, isbn: string) {
    return (dispatch: Dispatch) => {
        dispatch({ type: actionTypes.FETCH_COVER_IMAGE.request });

        googleBooksApi.get(`/volumes?q=isbn:${isbn}`)
            .then(res => {
                if (res.data.totalItems === 0 ||
                    res.data.items[0].volumeInfo.imageLinks === undefined) {
                        return dispatch({
                            type: actionTypes.FETCH_COVER_IMAGE.failure,
                            err: "no image"
                        })
                    }
                dispatch({
                    type: actionTypes.FETCH_COVER_IMAGE.success,
                    data: { title: title, imageLink: res.data.items[0].volumeInfo.imageLinks.thumbnail }
                })
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.FETCH_COVER_IMAGE.failure,
                    err: err.message
                })})
    }
}

export function checkoutBook(title: string, renterId: string) {
    return (dispatch: Dispatch) => {
        dispatch({ type: actionTypes.CHECKOUT_BOOK.request });

        bookishApi.post(`/renters/${renterId}/books/checkout`, { title })
            .then(() => {
                dispatch({ type: actionTypes.CHECKOUT_BOOK.success });
            })
            // After a book is checked out successfully, refetch renters.
            .then(() => {
                dispatch<any>(fetchRenters());
            })
            .catch(err => {
                alert(`Couldn't check out ${title}`);
                dispatch({
                    type: actionTypes.CHECKOUT_BOOK.failure,
                    err: err.message
                })})
    }
}

export function returnBook(title: string, renterId: string) {
    return (dispatch: Dispatch) => {
        dispatch({ type: actionTypes.RETURN_BOOK.request });

        bookishApi.post(`/renters/${renterId}/books/return`, { title })
            .then(() => {
                dispatch({ type: actionTypes.RETURN_BOOK.success });
                alert(`${title} was returned`);
            })
            // After a book is returned successfully, refetch renters.
            .then(() => {
                dispatch<any>(fetchRenters());
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.RETURN_BOOK.failure,
                    err: err.message
                })
                alert(`Failed to return ${title}`);
            })
    }
}