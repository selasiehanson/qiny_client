import {
    SAGA_FETCH_TAXES,
    TAXES_EDIT,
    TAX_CACHE,
    SAGA_ADD_TAX,
    TAXES_DELETE,
    MSG_TAX_CREATE_SUCCESS,
    SHOW_NOTIFICATION,
    SAGA_GET_TAX,
    TAXES_SHOW_NEW,
    SAGA_UPDATE_TAX,
    TAXES_ALL
} from '../constants';

export const initGetTaxes = () => {
    return {
        type: TAXES_ALL
    }
}

export const getTaxes = () => {
    return {
        type: SAGA_FETCH_TAXES
    }
}

export const addTax = (tax) => {
    return {
        type: SAGA_ADD_TAX,
        data: { tax }
    };
}

export const updateTax = (tax) => {
    return {
        type: SAGA_UPDATE_TAX,
        data: { tax },
        id: tax.id
    };
}


export const showNewTax = () => {
    return { type: TAXES_SHOW_NEW }
}

export const getTax = (id) => {
    return { type: SAGA_GET_TAX, id }
}

export const editTax = (id) => {
    return { type: TAXES_EDIT, id }
}

export const deleteTax = (id) => {
    return { type: TAXES_DELETE, id }
}

export const cacheTax = (tax) => {
    return {
        type: TAX_CACHE,
        data: tax
    }
}

export const showTaxCreatedMsg = () => {
    return {
        type: SHOW_NOTIFICATION,
        payload: {
            type: 'success',
            content: MSG_TAX_CREATE_SUCCESS
        }
    }
}
