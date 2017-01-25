import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import { clientsFetchList, addClient, getClient, updateClient } from './clients';
import { productsFetchList, addProduct, getProduct, updateProduct } from './products';
import { invoicesFetchList, addInvoice, getInvoice, updateInvoice } from './invoices';
import {taxesFetchList, addTax, getTax, updateTax } from './taxes';
import { fetchCurrencies } from './currencies';

import { signin, getUserProfile } from './auth';
import {
    SAGA_FETCH_CLIENTS,
    SAGA_GET_CLIENT,
    SAGA_ADD_CLIENT,
    SAGA_UPDATE_CLIENT,

    SAGA_FETCH_PRODUCTS,
    SAGA_GET_PRODUCT,
    SAGA_ADD_PRODUCT,
    SAGA_UPDATE_PRODUCT,

    SAGA_FETCH_INVOICES,
    SAGA_GET_INVOICE,
    SAGA_ADD_INVOICE,
    SAGA_UPDATE_INVOICE,

    SAGA_FETCH_TAXES,
    SAGA_GET_TAX,
    SAGA_ADD_TAX,
    SAGA_UPDATE_TAX,
    
    SAGA_LOGIN,
    SAGA_GET_USER_PROFILE,
    SAGA_FETCH_CURRENCIES
} from '../constants';

/**
 * Main saga generator
 */
export function* sagas() {
    yield [
        fork(takeLatest, SAGA_LOGIN, signin),
        fork(takeLatest, SAGA_GET_USER_PROFILE, getUserProfile),

        fork(takeLatest, SAGA_FETCH_CLIENTS, clientsFetchList),
        fork(takeLatest, SAGA_GET_CLIENT, getClient),
        fork(takeLatest, SAGA_ADD_CLIENT, addClient),
        fork(takeLatest, SAGA_UPDATE_CLIENT, updateClient),

        fork(takeLatest, SAGA_FETCH_PRODUCTS, productsFetchList),
        fork(takeLatest, SAGA_GET_PRODUCT, getProduct),
        fork(takeLatest, SAGA_ADD_PRODUCT, addProduct),
        fork(takeLatest, SAGA_UPDATE_PRODUCT, updateProduct),

        fork(takeLatest, SAGA_FETCH_INVOICES, invoicesFetchList),
        fork(takeLatest, SAGA_GET_INVOICE, getInvoice),
        fork(takeLatest, SAGA_ADD_INVOICE, addInvoice),
        fork(takeLatest, SAGA_UPDATE_INVOICE, updateInvoice),

        fork(takeLatest, SAGA_FETCH_TAXES, taxesFetchList),
        fork(takeLatest, SAGA_GET_TAX, getTax),
        fork(takeLatest, SAGA_ADD_TAX, addTax),
        fork(takeLatest, SAGA_UPDATE_TAX, updateTax),

        fork(takeLatest, SAGA_FETCH_CURRENCIES, fetchCurrencies),
    ]
}
