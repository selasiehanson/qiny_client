import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_FETCH_TAXES_SUCCESS,
    SAGA_GET_TAX_SUCCESS,
    SAGA_ADD_TAX_SUCCESS,
    SAGA_UPDATE_TAX_SUCCESS,
    MSG_TAX_CREATE_SUCCESS,
    MSG_TAX_UPDATE_SUCCESS
} from '../constants';
import { showSuccessMsg } from '../actions/index';
const TAXES = 'taxes';
export function* taxesFetchList(action) {
    //call api to get the users

    try {
        const res = yield call(ApiFetcher.findAll, TAXES);
        yield put({
            type: SAGA_FETCH_TAXES_SUCCESS,
            taxes: res.data
        });

    } catch (e) {
        //todo handle error case
    }
}

export function* addTax(action) {

    try {
        const res = yield call(ApiFetcher.create, TAXES, action.data)
        yield put({
            type: SAGA_ADD_TAX_SUCCESS,
            tax: res.data
        });

        yield put(showSuccessMsg(MSG_TAX_CREATE_SUCCESS));
    } catch (e) {

    }
}

export function* getTax(action) {

    try {
        const res = yield call(ApiFetcher.find, TAXES, action.id)
        yield put({
            type: SAGA_GET_TAX_SUCCESS,
            tax: res.data
        });
    } catch (e) {

    }
}

export function* updateTax(action) {
    try {
        const res = yield call(ApiFetcher.update, TAXES, action.data, action.id)

        yield put({
            type: SAGA_UPDATE_TAX_SUCCESS,
            tax: res.data
        });
        yield put(showSuccessMsg(MSG_TAX_UPDATE_SUCCESS));
    } catch (e) {

    }
}