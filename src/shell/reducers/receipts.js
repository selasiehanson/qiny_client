import { LOCATION_CHANGE } from 'react-router-redux';
import {
    SAGA_RECEIPTS_FETCH_LIST_SUCCESS,
    SAGA_ADD_RECEIPT_SUCCESS,
    SAGA_UPDATE_RECEIPT_SUCCESS,

} from '../constants';

const initialState = {
    editMode: "",
    current: null,
    all: [],
    afterSave: false
}

const getReceipt = (all, id) => all.filter(x => x.id === id)[0];
const receipts = (state = initialState, action) => {
    switch (action.type) {
        case SAGA_RECEIPTS_FETCH_LIST_SUCCESS:
            return {...state, all: action.receipts, afterSave: false }

        case SAGA_ADD_RECEIPT_SUCCESS:
            var all = [action.receipt].concat(state.all);
            let current = action.receipt;
            return {...state, all, current, editMode: '', afterSave: true };

        case SAGA_UPDATE_RECEIPT_SUCCESS:
            //take out old record
            var found = state.all.filter((x) => x.id === action.receipt.id);
            var all = state.all;
            if (found.length > 0) {
                var takeMeOut = found[0];
                all.splice(state.all.indexOf(takeMeOut), 1);
                all = [action.receipt].concat(all);
            }

            return {...state, all, afterSave: true, editMode: '', current: action.receipt };

        default:
            return state;
    }
}

export default receipts;