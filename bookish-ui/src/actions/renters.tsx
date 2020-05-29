import { actionTypes } from '../constants/renters/action_types';
import bookishApi from '../api/bookish';

import { Dispatch } from 'redux';

export function fetchRenters() {
    return (dispatch: Dispatch) => {
        dispatch({ type: actionTypes.FETCH_RENTERS.request });

        bookishApi.get('/renters')
            .then(res => {
                console.log(res)
                dispatch({
                    type: actionTypes.FETCH_RENTERS.success,
                    data: res.data
            })})
            .catch(err => {
                dispatch({
                    type: actionTypes.FETCH_RENTERS.failure,
                    err: err.message
                })})
    }
}

export function registerRenter(name: string, address: string, email: string, phone: string) {
    return (dispatch: Dispatch) => {
        dispatch({ type: actionTypes.REGISTER_RENTER.request });

        bookishApi.post('/renters', {name, address, email, phoneNumber: phone})
            .then(res => dispatch({
                type: actionTypes.REGISTER_RENTER.success,
                data: res.data
            }))
            .catch(err => dispatch({
                type: actionTypes.REGISTER_RENTER.failure,
                err: err.message
            }))

    }
}