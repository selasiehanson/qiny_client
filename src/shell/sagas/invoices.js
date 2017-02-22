import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_FETCH_INVOICES_SUCCESS,
    SAGA_GET_INVOICE_SUCCESS,
    SAGA_ADD_INVOICE_SUCCESS,
    SAGA_UPDATE_INVOICE_SUCCESS,
    MSG_INVOICE_CREATE_SUCCESS,
    MSG_INVOICE_UPDATE_SUCCESS
} from '../constants';
import { makQueryString } from '../utils/url';


const INVOICES = 'invoices';
import { showSuccessMsg } from '../actions/index';

export function* invoicesFetchList(action) {
    //call api to get the users
    let queryString = makQueryString(action.data);
    try {
        const res = yield call(ApiFetcher.findAll, `${INVOICES}?${queryString}`);

        yield put({
            type: SAGA_FETCH_INVOICES_SUCCESS,
            invoices: res.data
        });
    } catch (e) {
        //todo handle error case
    }
}

export function* addInvoice(action) {

    try {
        const res = yield call(ApiFetcher.create, INVOICES, action.data)
        yield put({
            type: SAGA_ADD_INVOICE_SUCCESS,
            invoice: res.data
        });

        yield put(showSuccessMsg(MSG_INVOICE_CREATE_SUCCESS));
    } catch (e) {

    }
}

export function* getInvoice(action) {

    try {
        const res = yield call(ApiFetcher.find, INVOICES, action.id)
        yield put({
            type: SAGA_GET_INVOICE_SUCCESS,
            invoice: res.data.invoice
        });
    } catch (e) {

    }
}

export function* updateInvoice(action) {
    try {
        const res = yield call(ApiFetcher.update, INVOICES, action.data, action.id)

        yield put({
            type: SAGA_UPDATE_INVOICE_SUCCESS,
            invoice: res.data
        });

        yield put(showSuccessMsg(MSG_INVOICE_UPDATE_SUCCESS));
    } catch (e) {

    }
}