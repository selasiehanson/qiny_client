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
export const getProducts = (params) => {
    return {
        type: SAGA_FETCH_PRODUCTS,
        data: params
    }
}

export const addProduct = (product) => {
    return {
        type: SAGA_ADD_PRODUCT,
        data: { product }
    };
}

export const updateProduct = (product) => {
    return {
        type: SAGA_UPDATE_PRODUCT,
        data: { product },
        id: product.id
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

export const cacheProduct = (product) => {
    return {
        type: PRODUCT_CACHE,
        data: product
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
