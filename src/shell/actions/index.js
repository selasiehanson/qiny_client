import {
    SHOW_NOTIFICATION, 
    HIDE_NOTIFICATION,
    SAGA_FETCH_CURRENCIES
} from '../constants';


export function showNotification(payload) {
    return { type: SHOW_NOTIFICATION, payload };
};

export function hideNotification() {
    return { type: HIDE_NOTIFICATION };
};

export function getCurrencies(){
 return { type: SAGA_FETCH_CURRENCIES };   
}