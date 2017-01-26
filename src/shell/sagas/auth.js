import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_LOGIN_SUCCESS,
    SAGA_GET_USER_PROFILE_SUCCESS,
    SAGA_LOGIN_ERROR,
    SAGA_LOGIN_INVALID
} from '../constants';

export function* signin(action) {
    let data = {
        auth: action.data
    }
    try {
        const res = yield call(ApiFetcher.makeRequest, 'post', 'user_token', data);
        //const res = yield call(ApiFetcher.post, 'user_token', data)
        if (res.status === 404) {
            yield put({
                type: SAGA_LOGIN_INVALID,
                data: res.data
            });
        }

        if (res.status === 200) {
            yield put({
                type: SAGA_LOGIN_SUCCESS,
                data: res.data
            });
        }

    } catch (error) {
        console.error(error);
        yield put({ type: SAGA_LOGIN_ERROR });
    }
}

export function* getUserProfile(action) {

    let config = ApiFetcher.getConfig()
    try {
        const res = yield call(ApiFetcher.makeRequest, 'get', 'accounts/profile', {}, config);
        yield put({
            type: SAGA_GET_USER_PROFILE_SUCCESS,
            data: res.data
        });
    } catch (error) {
        console.error(error);
        //yield put({ type: SAGA_FETCH_TRANSACTION_ERROR });  
    }
}