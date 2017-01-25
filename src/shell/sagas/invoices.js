import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_FETCH_INVOICES_SUCCESS,
    SAGA_GET_INVOICE_SUCCESS,
    SAGA_ADD_INVOICE_SUCCESS,
    SAGA_UPDATE_INVOICE_SUCCESS
} from '../constants';

const INVOICES = 'invoices';
import {showInvoiceCreatedMsg} from '../actions/invoices';

export function* invoicesFetchList(action) {
    //call api to get the users

    try {
        const res = yield call(ApiFetcher.findAll, INVOICES);
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

         yield put(showInvoiceCreatedMsg());
    } catch (e) {

    }
}

export function* getInvoice(action) {

    try {
        const res = yield call(ApiFetcher.find, INVOICES, action.id)
        yield put({
            type: SAGA_GET_INVOICE_SUCCESS,
            invoice: res.data
        });
    } catch (e) {

    }
}

export function* updateInvoice(action) {
    try {
        const res = yield call(ApiFetcher.update, INVOICES, action.data)

        yield put({
            type: SAGA_UPDATE_INVOICE_SUCCESS,
            invoice: res.data
        });
    } catch (e) {

    }
}