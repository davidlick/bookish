import { generateActionType } from '../actionTypeFactory';

const FETCH_BOOKS = generateActionType('FETCH_BOOKS');
const FETCH_COVER_IMAGE = generateActionType('FETCH_COVER_IMAGE');
const SET_FILTER = 'SET_FILTER';
const ADD_TO_CART = 'ADD_TO_CART';
const CHECKOUT_BOOK = generateActionType('CHECKOUT_BOOK');
const RETURN_BOOK = generateActionType('RETURN_BOOK');

export const actionTypes = {
    FETCH_BOOKS,
    FETCH_COVER_IMAGE,
    SET_FILTER,
    ADD_TO_CART,
    CHECKOUT_BOOK,
    RETURN_BOOK
}