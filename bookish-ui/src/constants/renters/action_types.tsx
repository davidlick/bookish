import { generateActionType } from '../actionTypeFactory';

const FETCH_RENTERS = generateActionType('FETCH_RENTERS');
const REGISTER_RENTER = generateActionType('REGISTER_RENTERS');

export const actionTypes = {
    FETCH_RENTERS,
    REGISTER_RENTER
}