import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_FETCH_PRODUCTS_SUCCESS,
    SAGA_GET_PRODUCT_SUCCESS,
    SAGA_ADD_PRODUCT_SUCCESS,
    SAGA_UPDATE_PRODUCT_SUCCESS,
    MSG_PRODUCT_CREATE_SUCCESS,
    MSG_PRODUCT_UPDATE_SUCCESS
} from '../constants';
import { showSuccessMsg } from '../actions';
import { makQueryString } from '../utils/url';


const PRODUCTS = 'products';
export function* productsFetchList(action) {
    //call api to get the users
    let queryString = makQueryString(action.data)

    try {
        const res = yield call(ApiFetcher.findAll, `${PRODUCTS}?${queryString}`);
        yield put({
            type: SAGA_FETCH_PRODUCTS_SUCCESS,
            products: res.data
        });
    } catch (e) {
        //todo handle error case
    }
}

export function* addProduct(action) {

    try {
        const res = yield call(ApiFetcher.create, PRODUCTS, action.data)
        yield put({
            type: SAGA_ADD_PRODUCT_SUCCESS,
            product: res.data
        });
        yield put(showSuccessMsg(MSG_PRODUCT_CREATE_SUCCESS));
    } catch (e) {

    }
}

export function* getProduct(action) {

    try {
        const res = yield call(ApiFetcher.find, PRODUCTS, action.id)
        yield put({
            type: SAGA_GET_PRODUCT_SUCCESS,
            product: res.data
        });
    } catch (e) {

    }
}

export function* updateProduct(action) {
    try {
        const res = yield call(ApiFetcher.update, PRODUCTS, action.data, action.id)

        yield put({
            type: SAGA_UPDATE_PRODUCT_SUCCESS,
            product: res.data
        });

        yield put(showSuccessMsg(MSG_PRODUCT_UPDATE_SUCCESS));

    } catch (e) {

    }
}