import { actionTypes } from '../constants/renters/action_types';

import { Action } from '../types/actions';

const initialState = {
    renters: [],
    loading: false,
    loadError: null,
    registerError: null,
}

export function renters(state = initialState, action: Action) {
    switch(action.type) {
        // FETCH_RENTERS action
        case actionTypes.FETCH_RENTERS.request:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_RENTERS.success:
            return {
                ...state,
                loading: false,
                loadError: null,
                renters: [...action.data]
            }
        case actionTypes.FETCH_RENTERS.failure:
            return {
                ...state,
                loading: false,
                loadError: action.err
            }

        // REGISTER_RENTER action
        case actionTypes.REGISTER_RENTER.request:
            return {
                ...state,
                loading: true
            }
        case actionTypes.REGISTER_RENTER.success:
            return {
                ...state,
                loading: false,
                registerError: null,
            }
        case actionTypes.REGISTER_RENTER.failure:
            return {
                ...state,
                loading: false,
                registerError: action.err
            }
                        
        default:
            return state;
    }
}