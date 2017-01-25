import {
    SAGA_FETCH_CURRENCIES_SUCCESS
} from '../constants';

const initialState = {
    all: []
};

const currencies = (state = initialState, action) => {
    switch (action.type) {
        case SAGA_FETCH_CURRENCIES_SUCCESS:
            return { ...state, all: action.currencies }
        default: return state;
    }
}

export default currencies;