import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_LOGIN_SUCCESS,
    SAGA_GET_USER_PROFILE_SUCCESS
} from '../constants';

export function* signin(action) {
    let data = {
        auth: action.data
    }
    const res = yield call(ApiFetcher.makeRequest, 'post', 'user_token', data);
    try {
        yield put({
            type: SAGA_LOGIN_SUCCESS,
            data: res.data
        });
    } catch (error) {
        console.error(error);
        //yield put({ type: SAGA_FETCH_TRANSACTION_ERROR });   
    }
}

export function* getUserProfile(action) {

    let config = ApiFetcher.getConfig()
    const res = yield call(ApiFetcher.makeRequest, 'get', 'accounts/profile', {}, config);
    try {
        yield put({
            type: SAGA_GET_USER_PROFILE_SUCCESS,
            data: res.data
        });
    } catch (error) {
        console.error(error);
        //yield put({ type: SAGA_FETCH_TRANSACTION_ERROR });  
    }
}