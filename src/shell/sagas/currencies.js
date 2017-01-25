import { call, put } from 'redux-saga/effects';
import ApiFetcher from '../apis/http';
import {
    SAGA_FETCH_CURRENCIES_SUCCESS
} from '../constants';

export function* fetchCurrencies (action) {
    //call api to get the users

    try {
        let config = ApiFetcher.getConfig()
        const res = yield call(ApiFetcher.makeRequest, 'get', 'currencies', {},config);
        yield put({
        type: SAGA_FETCH_CURRENCIES_SUCCESS,
            currencies: res.data
        });
    } catch (e) {
        //todo handle error case
    }
}
