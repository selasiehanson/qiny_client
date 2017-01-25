import {
    APP_STATES,
    SAGA_LOGIN_SUCCESS,
    GET_APP_STATE,
    SIGN_OUT,
    ACCOUNT_SELECTED,
    SAGA_GET_USER_PROFILE_SUCCESS
} from '../constants';

const initialState = {
    selectedAccount: null,
    profile: null,
    state: APP_STATES.NOT_AUTHENTICATED,
    justSignedIn: false,
    justSignedOut: false
}

function setUser(profile) {    
    localStorage.setItem('profile', JSON.stringify(profile));    
}

function setToken(token) {
    localStorage.setItem('id_token', token);
}

function removeUser() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
}

function removeAccount() {
    localStorage.removeItem('current_account');
}

function clearDetailsOnSignout() {
    removeUser();
    removeAccount();
}

function setCurrentAccount(account) {
    let str = JSON.stringify(account)
    localStorage.setItem('current_account', str);
}

function getCurrentAccount() {
    return JSON.parse(localStorage.getItem('current_account'));
}


class AuthManager {
    static isLoggedIn() {
        if (localStorage.getItem('id_token')) {
            return true;
        }
        return false;
    }
}

const app = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_SELECTED:
            setCurrentAccount(action.data);
            return { ...state, selectedAccount: action.data }

        case SAGA_GET_USER_PROFILE_SUCCESS:
            setUser(action.data);
            return { ...state, profile: action.data }
            
        case SIGN_OUT:
            clearDetailsOnSignout();
            return { ...state, state: APP_STATES.NOT_AUTHENTICATED, justSignedIn: false, justSignedOut: true };

        case GET_APP_STATE:
            if (AuthManager.isLoggedIn()) {

                return { ...state, selectedAccount: getCurrentAccount(), state: APP_STATES.AUTHENTICATED, justSignedIn: false, justSignedOut: false }
            }
            return { ...state, state: APP_STATES.NOT_AUTHENTICATED, justSignedIn: false, justSignedOut: false }

        case SAGA_LOGIN_SUCCESS:
            setToken(action.data.jwt)
            return { ...state, state: APP_STATES.AUTHENTICATED, justSignedIn: true, justSignedOut: false }

        default:
            if (AuthManager.isLoggedIn()) {
                return { ...state, state: APP_STATES.AUTHENTICATED, justSignedIn: false, justSignedOut: false }
            }
            return { ...state, state: APP_STATES.NOT_AUTHENTICATED, justSignedIn: false, justSignedOut: false };
    }
}

export default app;
