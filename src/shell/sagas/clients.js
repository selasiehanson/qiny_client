import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_FETCH_CLIENTS_SUCCESS,
    SAGA_GET_CLIENT_SUCCESS,
    SAGA_ADD_CLIENT_SUCCESS,
    SAGA_UPDATE_CLIENT_SUCCESS    
} from '../constants';
import {showClientCreatedMsg} from '../actions/clients';
const CLIENTS = 'clients';
export function* clientsFetchList(action) {
    //call api to get the users

    try {
        const res = yield call(ApiFetcher.findAll, CLIENTS);
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
            client: res.data
        });

        yield put(showClientCreatedMsg());
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
        const res = yield call(ApiFetcher.update, CLIENTS, action.data)

        yield put({
            type: SAGA_UPDATE_CLIENT_SUCCESS,
            client: res.data
        });
    } catch (e) {

    }
}