import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_LOGIN_SUCCESS,
    SAGA_GET_USER_PROFILE_SUCCESS,
    SAGA_LOGIN_ERROR,
    SAGA_LOGIN_INVALID,
    SAGA_SIGNUP_SUCCESS,
    SAGA_SIGNUP_ERROR
} from '../constants';
import _ from 'lodash';

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

        if (res.status === 200 || res.status === 201) {
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

export function* register(action) {
    let data = {
        credentials: action.data
    };
    let config = ApiFetcher.getConfig();
    try {
        const res = yield call(ApiFetcher.makeRequest, 'post', 'register', data);
        if (res.status === 200 || res.status === 201) {
            yield put({
                type: SAGA_SIGNUP_SUCCESS
            });
        } else {
            var errors = _.values(res.data).join(",");
            // let k = {};
            // _.reduceRight(res.data, (acc, val) => {
            //     acc += val
            // }, "");
            let out = '';
            for (let i in res.data) {
                out += `${i} ${res.data[i].join(',')}`;
            }
            yield put({
                type: SAGA_SIGNUP_ERROR,
                data: out
            });
        }

    } catch (e) {
        yield put({
            type: SAGA_SIGNUP_ERROR
        });
    }
}

export function* getUserProfile(action) {

    let config = ApiFetcher.getConfig()
    try {
        const res = yield call(ApiFetcher.makeRequest, 'get', 'accounts/profile', {}, config);
        yield put({
            type: SAGA_GET_USER_PROFILE_SUCCESS,
            data: res.data.user
        });
    } catch (error) {
        console.error(error);
        //yield put({ type: SAGA_FETCH_TRANSACTION_ERROR });  
    }
}