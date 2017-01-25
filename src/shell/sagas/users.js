import { call, put } from 'redux-saga/effects';
import ApiUsers from '../apis/users';
import {
    SAGA_USERS_FETCH_LIST_SUCCESS,
    SAGA_GET_USER_SUCCESS,
    SAGA_ADD_USER_SUCCESS,
    SAGA_UPDATE_USER_SUCCESS

} from '../constants';

const USERS = "users";
export function* usersFetchList(action) {
    //call api to get the users
    const res = yield call(ApiReceipts.findAll, USERS);

    yield put({
        type: SAGA_USERS_FETCH_LIST_SUCCESS,
        users: res.data.data
    });
}

export function* addReceipts(action) {
    const res = yield call(ApiReceipts.create, USERS, action.data)

    yield put({
        type: SAGA_ADD_USER_SUCCESS,
        user: res.data.data
    });
}

export function* getReceipts(action) {
    const res = yield call(ApiReceipts.getReceipts, USERS, action.id)

    yield put({
        type: SAGA_GET_USER_SUCCESS,
        user: res.data.data
    });
}

export function* updateReceipts(action) {
    const res = yield call(ApiReceipts.update, USERS, action.data)

    yield put({
        type: SAGA_UPDATE_USER_SUCCESS,
        user: res.data.data
    });
}