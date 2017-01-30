export const INIT_LINK = 'INIT_LINK';
////CLIENT
export const CLIENTS_ALL = 'CLIENTS_ALL';
export const CLIENT_CACHE = 'CLIENT_CACHE';
export const CLIENTS_SHOW_NEW = 'CLIENT_SHOW_NEW';
export const CLIENTS_EDIT = 'CLIENT_EDIT';
export const CLIENTS_DELETE = 'CLIENT_DELETE';

//SAGAS
export const SAGA_FETCH_CLIENTS = 'SAGA_FETCH_CLIENTS';
export const SAGA_FETCH_CLIENTS_SUCCESS = 'SAGA_FETCH_CLIENTS_SUCCESS';
export const SAGA_ADD_CLIENT = 'SAGA_ADD_CLIENT';
export const SAGA_ADD_CLIENT_SUCCESS = 'SAGA_ADD_CLIENT_SUCCESS';
export const SAGA_UPDATE_CLIENT = 'SAGA_UPDATE_CLIENT';
export const SAGA_UPDATE_CLIENT_SUCCESS = 'SAGA_UPDATE_CLIENT_SUCCESS';
export const SAGA_GET_CLIENT = 'SAGA_GET_CLIENT';
export const SAGA_GET_CLIENT_SUCCESS = 'SAGA_GET_CLIENT_SUCCESS';

////PRODUCTS
export const PRODUCTS_ALL = 'PRODUCTS_ALL';
export const PRODUCT_CACHE = 'PRODUCT_CACHE';
export const PRODUCTS_SHOW_NEW = 'PRODUCTS_SHOW_NEW';
export const PRODUCTS_EDIT = 'PRODUCTS_EDIT';
export const PRODUCTS_DELETE = 'PRODUCTS_DELETE';
//SAGA
export const SAGA_FETCH_PRODUCTS = 'SAGA_FETCH_PRODUCTS';
export const SAGA_FETCH_PRODUCTS_SUCCESS = 'SAGA_FETCH_PRODUCTS_SUCCESS';
export const SAGA_ADD_PRODUCT = 'SAGA_ADD_PRODUCT';
export const SAGA_ADD_PRODUCT_SUCCESS = 'SAGA_ADD_PRODUCT_SUCCESS';
export const SAGA_UPDATE_PRODUCT = 'SAGA_UPDATE_PRODUCT';
export const SAGA_UPDATE_PRODUCT_SUCCESS = 'SAGA_UPDATE_PRODUCT_SUCCESS';
export const SAGA_GET_PRODUCT = 'SAGA_GET_PRODUCT';
export const SAGA_GET_PRODUCT_SUCCESS = 'SAGA_GET_PRODUCT_SUCCESS';

////INVOICES
export const INVOICES_ALL = 'INVOICES_ALL';
export const INVOICE_CACHE = 'INVOICE_CACHE';
export const INVOICES_SHOW_NEW = 'INVOICES_SHOW_NEW';
export const INVOICES_EDIT = 'INVOICES_EDIT';
export const INVOICES_DELETE = 'INVOICES_DELETE';
export const INVOICE_LOADING = 'INVOICE_LOADING';
//SAGA
export const SAGA_FETCH_INVOICES = 'SAGA_FETCH_INVOICES';
export const SAGA_FETCH_INVOICES_SUCCESS = 'SAGA_FETCH_INVOICES_SUCCESS';
export const SAGA_ADD_INVOICE = 'SAGA_ADD_INVOICE';
export const SAGA_ADD_INVOICE_SUCCESS = 'SAGA_ADD_INVOICE_SUCCESS';
export const SAGA_UPDATE_INVOICE = 'SAGA_UPDATE_INVOICE';
export const SAGA_UPDATE_INVOICE_SUCCESS = 'SAGA_UPDATE_INVOICE_SUCCESS';
export const SAGA_GET_INVOICE = 'SAGA_GET_INVOICE';
export const SAGA_GET_INVOICE_SUCCESS = 'SAGA_GET_INVOICE_SUCCESS';

////TAX
export const TAXES_ALL = 'TAXES_ALL';
export const TAX_CACHE = 'TAX_CACHE';
export const TAXES_SHOW_NEW = 'TAX_SHOW_NEW';
export const TAXES_EDIT = 'TAX_EDIT';
export const TAXES_DELETE = 'TAX_DELETE';

//SAGAS
export const SAGA_FETCH_TAXES = 'SAGA_FETCH_TAXES';
export const SAGA_FETCH_TAXES_SUCCESS = 'SAGA_FETCH_TAXES_SUCCESS';
export const SAGA_ADD_TAX = 'SAGA_ADD_TAX';
export const SAGA_ADD_TAX_SUCCESS = 'SAGA_ADD_TAX_SUCCESS';
export const SAGA_UPDATE_TAX = 'SAGA_UPDATE_TAX';
export const SAGA_UPDATE_TAX_SUCCESS = 'SAGA_UPDATE_TAX_SUCCESS';
export const SAGA_GET_TAX = 'SAGA_GET_TAX';
export const SAGA_GET_TAX_SUCCESS = 'SAGA_GET_TAX_SUCCESS';


//SAGA CURRENCIES
export const SAGA_FETCH_CURRENCIES = 'SAGA_FETCH_CURRENCIES';
export const SAGA_FETCH_CURRENCIES_SUCCESS = 'SAGA_FETCH_CURRENCIES_SUCCESS';

//SAGA APP/AUTH
export const SAGA_SIGNUP = 'SAGA_SIGNUP';
export const SAGA_SIGNUP_SUCCESS = 'SAGA_SIGNUP_SUCCESS';
export const SAGA_SIGNUP_ERROR = 'SAGA_SIGNUP_ERROR';

export const SAGA_LOGIN = 'SAGA_LOGIN';
export const SAGA_LOGIN_SUCCESS = 'SAGA_LOGIN_SUCCESS';
export const SAGA_LOGIN_ERROR = 'SAGA_LOGIN_ERROR';

export const SAGA_LOGIN_INVALID = 'SAGA_LOGIN_INVALID';

//notification
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const ACCOUNT_SET = 'ACCOUNT_SET';
export const ACCOUNT_SELECTED = 'ACCOUNT_SELECTED';
export const SAGA_GET_USER_PROFILE = 'SAGA_GET_USER_PROFILE';
export const SAGA_GET_USER_PROFILE_SUCCESS = 'SAGA_GET_USER_PROFILE_SUCCESS';

export const APP_STATES = {
    AUTHENTICATED: 'AUTHENTICATED',
    NOT_AUTHENTICATED: 'NOT_AUTHENTICATED'
};

export const GET_APP_STATE = 'GET_APP_STATE';
export const SIGN_OUT = 'SIGN_OUT';


//MESSGAES 
export const MSG_CLIENT_CREATE_SUCCESS = 'Client created successfully';
export const MSG_TAX_CREATE_SUCCESS = 'Tax created successfully';
export const MSG_INVOICE_CREATE_SUCCESS = 'Invoice created successfully';
export const MSG_PRODUCT_CREATE_SUCCESS = 'Product created successfully';