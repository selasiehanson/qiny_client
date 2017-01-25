import {
    SAGA_FETCH_INVOICES_SUCCESS,
    SAGA_ADD_INVOICE_SUCCESS,
    SAGA_UPDATE_INVOICE_SUCCESS,
    INVOICE_LOADING,
    SAGA_GET_INVOICE_SUCCESS,
    INVOICES_SHOW_NEW
} from '../constants';
import { dateHelpers } from '../utils/date-helpers';

const initialState = {
    editMode: "",
    current: {},
    all: [],
    original: [],
    afterSave: false,
    isLoading: false
}

const invoices = (state = initialState, action) => {
    switch (action.type) {
        case SAGA_FETCH_INVOICES_SUCCESS:
            const old = action.invoices;
            const invoices = action.invoices.map((invoice) => {
                let newInvoice = { ...invoice };
                newInvoice.client = invoice.client.name;
                newInvoice.due_date = dateHelpers.simpleHumanDate(newInvoice.due_date);
                newInvoice.invoice_date = dateHelpers.simpleHumanDate(newInvoice.invoice_date);
                newInvoice.total_amount = `${newInvoice.currency.currency_code} ${newInvoice.total_amount}`;
                newInvoice.total_tax = `${newInvoice.currency.currency_code} ${newInvoice.total_tax}`;
                return newInvoice;
            });
            return { ...state, all: invoices, afterSave: false, original: old, current: {} }

        case INVOICES_SHOW_NEW:
            return { ...state, current: {} }

        case SAGA_ADD_INVOICE_SUCCESS:
            const newInvoices = [action.invoice].concat(state.all);
            let current = action.invoice;
            return { ...state, all: newInvoices, current, editMode: '', afterSave: true };

        case INVOICE_LOADING:
            return { ...state, isLoading: true }

        case SAGA_GET_INVOICE_SUCCESS:
            return { ...state, current: action.invoice, isLoading: false }


        case SAGA_UPDATE_INVOICE_SUCCESS:
            //take out old record
            let found = state.all.filter((x) => x.id === action.invoice.id);
            let all = state.all;
            if (found.length > 0) {
                let takeMeOut = found[0];
                all.splice(state.all.indexOf(takeMeOut), 1);
                all = [action.invoice].concat(all);
            }

            return { ...state, all, afterSave: true, editMode: '', current: action.invoice };

        default:
            return state;
    }
}

export default invoices;