// import { LOCATION_CHANGE } from 'react-router-redux';
import {
    TAXES_SHOW_NEW,
    SAGA_ADD_TAX_SUCCESS,
    TAXES_EDIT,
    SAGA_FETCH_TAXES_SUCCESS,
    TAX_CACHE,
    SAGA_GET_TAX_SUCCESS

} from '../constants';

const getTax = (taxes, id) => taxes.filter(x => x.id === id);

const initialState = {
    afterSave: false,
    mode: "",
    current: null,
    all: []
};

const taxes = (state = initialState, action) => {
    switch (action.type) {
        case SAGA_FETCH_TAXES_SUCCESS:
            return { ...state, all: action.taxes, afterSave: false }
        case TAXES_SHOW_NEW:
            return { ...state, current: {} }
        case TAX_CACHE:
            return { ...state, current: action.data }
        case SAGA_ADD_TAX_SUCCESS:
            return { ...state, afterSave: true };
        case SAGA_GET_TAX_SUCCESS:
            return { ...state, current: action.tax }

        case TAXES_EDIT:
            var { all } = state;
            var current = getTax(action.id)
            return { all, current };

        default: return state;
    }
}

export default taxes;
