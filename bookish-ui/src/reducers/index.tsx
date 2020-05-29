import { combineReducers } from 'redux';

import { books } from './books';
import { renters } from './renters';

export const RootReducer = combineReducers({
    books,
    renters
})