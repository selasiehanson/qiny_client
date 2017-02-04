import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_FETCH_CLIENTS_SUCCESS,
    SAGA_GET_CLIENT_SUCCESS,
    SAGA_ADD_CLIENT_SUCCESS,
    SAGA_UPDATE_CLIENT_SUCCESS,
    MSG_CLIENT_CREATE_SUCCESS,
    MSG_CLIENT_UPDATE_SUCCESS
} from '../constants';
import { showSuccessMsg } from '../actions';
import { makQueryString } from '../utils/url';

const CLIENTS = 'clients';

export function* clientsFetchList(action) {
    //call api to get the users
    let queryString = makQueryString(action.data)
    try {
        const res = yield call(ApiFetcher.findAll, `${CLIENTS}?${queryString}`);
        yield put({
            type: SAGA_FETCH_CLIENTS_SUCCESS,
            clients: res.data
        });

    } catch (e) {
        //todo handle error case
    }
}

export function* addClient(action) {

    try {
        const res = yield call(ApiFetcher.create, CLIENTS, action.data)
        yield put({
            type: SAGA_ADD_CLIENT_SUCCESS,
            client: res.data,
            success: true
        });

        yield put(showSuccessMsg(MSG_CLIENT_CREATE_SUCCESS));
    } catch (e) {

    }
}

export function* getClient(action) {

    try {
        const res = yield call(ApiFetcher.find, CLIENTS, action.id)
        yield put({
            type: SAGA_GET_CLIENT_SUCCESS,
            client: res.data
        });
    } catch (e) {

    }
}

export function* updateClient(action) {
    try {
        const res = yield call(ApiFetcher.update, CLIENTS, action.data, action.id)

        yield put({
            type: SAGA_UPDATE_CLIENT_SUCCESS,
            client: res.data,
            success: true
        });
        yield put(showSuccessMsg(MSG_CLIENT_UPDATE_SUCCESS));

    } catch (e) {

    }
}