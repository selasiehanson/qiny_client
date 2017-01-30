import {
    SAGA_FETCH_PRODUCTS,
    PRODUCTS_EDIT,
    PRODUCT_CACHE,
    SAGA_ADD_PRODUCT,
    PRODUCTS_DELETE,
    MSG_PRODUCT_CREATE_SUCCESS,
    SHOW_NOTIFICATION,
    PRODUCTS_SHOW_NEW,
    SAGA_GET_PRODUCT,
    SAGA_UPDATE_PRODUCT,
    PRODUCTS_ALL
} from '../constants';

export const initGetProducts = () => {
    return {
        type: PRODUCTS_ALL
    }
}
export const getProducts = () => {
    return {
        type: SAGA_FETCH_PRODUCTS
    }
}

export const addProduct = (client) => {
    return {
        type: SAGA_ADD_PRODUCT,
        data: client
    };
}

export const updateProduct = (client) => {
    return {
        type: SAGA_UPDATE_PRODUCT,
        data: client
    };
}

export const getProduct = (id) => {
    return { type: SAGA_GET_PRODUCT, id }
}

export const showNewProduct = () => {
    return { type: PRODUCTS_SHOW_NEW }
}

export const editProduct = (id) => {
    return { type: PRODUCTS_EDIT, id }
}

export const deleteProduct = (id) => {
    return { type: PRODUCTS_DELETE, id }
}

export const cacheProduct = (client) => {
    return {
        type: PRODUCT_CACHE,
        data: client
    }
}

export const showProductCreatedMsg = () => {
    return {
        type: SHOW_NOTIFICATION,
        payload: {
            type: 'success',
            content: MSG_PRODUCT_CREATE_SUCCESS
        }
    }
};
