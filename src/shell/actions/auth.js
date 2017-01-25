import {
    SAGA_LOGIN,
    GET_APP_STATE,
    SIGN_OUT
} from '../constants';

export function signin(data) {
    return {
        type: SAGA_LOGIN,
        data
    }
}

export function signout() {
    return {
        type: SIGN_OUT
    }
}

export function checkAppState() {
    return {
        type: GET_APP_STATE
    }
}