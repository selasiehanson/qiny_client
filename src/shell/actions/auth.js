import {
    SAGA_LOGIN,
    GET_APP_STATE,
    SIGN_OUT,
    SAGA_SIGNUP
} from '../constants';

export function signin(data) {
    return {
        type: SAGA_LOGIN,
        data
    }
}

export function signUp(data) {
    return {
        type: SAGA_SIGNUP,
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