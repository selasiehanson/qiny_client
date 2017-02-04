import {
    PRODUCTS_SHOW_NEW,
    SAGA_ADD_PRODUCT_SUCCESS,
    PRODUCTS_EDIT,
    SAGA_FETCH_PRODUCTS_SUCCESS,
    PRODUCT_CACHE,
    SAGA_GET_PRODUCT_SUCCESS,
} from '../constants';

const getProducts = (products, id) => products.filter(x => x.id === id);

const initialState = {
    afterSave: false,
    mode: "",
    current: null,
    all: [],
    page: 1,
    totalCount: 0
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case SAGA_FETCH_PRODUCTS_SUCCESS:
            let {data, page, total_count} = action.products;
            return { ...state, all: data, page: +page, totalCount: total_count, afterSave: false, loading: false }

        case PRODUCTS_SHOW_NEW:
            return { ...state, current: {} }

        case PRODUCT_CACHE:
            return { ...state, current: action.data }

        case SAGA_ADD_PRODUCT_SUCCESS:
            return { ...state, afterSave: true };

        case SAGA_GET_PRODUCT_SUCCESS:
            return { ...state, current: action.product }

        case PRODUCTS_EDIT:
            var { all } = state;
            var current = getProducts(action.id)
            console.log(current);
            return { all, current };

        default: return state;
    }
}

export default products;
