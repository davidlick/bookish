import { actionTypes } from '../constants/books/action_types';
import { mergeDeepRight } from 'ramda';

import { Action } from '../types/actions';

const initialState = {
    books: [],
    filter: '',
    images: {},
    cart: [],
    loading: false,
    loadError: null,
    checkoutError: null,
    returnError: null
}

export function books(state = initialState, action: Action) {
    switch (action.type) {
        // FETCH_BOOK actions
        case actionTypes.FETCH_BOOKS.request:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_BOOKS.success:
            return {
                ...state,
                loading: false,
                loadError: null,
                books: [...action.data]
            }
        case actionTypes.FETCH_BOOKS.failure:
            return {
                ...state,
                loading: false,
                error: action.err
            }

        // FETCH_COVER_IMAGE actions
        case actionTypes.FETCH_COVER_IMAGE.request:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_COVER_IMAGE.success:
            interface ImageReturn {
                title: string;
                imageLink: string;
            }

            let imageReturn: ImageReturn = {...action.data as ImageReturn};

            const images = {...state.images}
            
            images[imageReturn.title] = imageReturn.imageLink;

            return mergeDeepRight(state, {
                loading: false,
                images: {...images}
            })
        case actionTypes.FETCH_COVER_IMAGE.failure:
            return {
                ...state,
                loading: false
            }

        // SET_FILTER action
        case actionTypes.SET_FILTER:
            return {
                ...state,
                filter: action.data
            }

        // ADD_TO_CART action
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cart: state.cart.concat(action.data)
            }

        // CHECKOUT_BOOK action
        case actionTypes.CHECKOUT_BOOK.request:
            return {
                ...state,
                loading: true
            }
        case actionTypes.CHECKOUT_BOOK.success:
            return {
                ...state,
                loading: false,
                checkoutError: null
            }
        case actionTypes.CHECKOUT_BOOK.failure:
            return {
                ...state,
                loading: false,
                checkoutError: action.err
            }

        // RETURN_BOOK action
        case actionTypes.RETURN_BOOK.request:
            return {
                ...state,
                loading: true
            }
        case actionTypes.RETURN_BOOK.success:
            return {
                ...state,
                loading: false,
                returnError: false
            }
        case actionTypes.RETURN_BOOK.failure:
            return {
                ...state,
                loading: false,
                returnError: action.err
            }
            
        default:
            return state;
    }
}