import { SAGA_ADD_RECEIPT, SAGA_UPDATE_RECEIPT } from '../constants';
export function addReceipt(data) {
    return {
        type: SAGA_ADD_RECEIPT,
        data
    }
}

export function updateReceipt(data) {
    return {
        type: SAGA_UPDATE_RECEIPT,
        data
    }
}