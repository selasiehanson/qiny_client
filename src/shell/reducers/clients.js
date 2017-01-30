import {
    CLIENTS_SHOW_NEW,
    SAGA_ADD_CLIENT_SUCCESS,
    CLIENTS_EDIT,
    SAGA_FETCH_CLIENTS_SUCCESS,
    CLIENT_CACHE,
    SAGA_GET_CLIENT_SUCCESS,
    CLIENTS_ALL
} from '../constants';

const getClient = (clients, id) => clients.filter(x => x.id === id);

const initialState = {
    afterSave: false,
    mode: "",
    current: null,
    all: [],
    loading: false,
};

const clients = (state = initialState, action) => {
    switch (action.type) {
        case CLIENTS_ALL:
            return { ...state, loading: true };
        case SAGA_FETCH_CLIENTS_SUCCESS:
            return { ...state, all: action.clients, afterSave: false, loading: false }
        case CLIENTS_SHOW_NEW:
            return { ...state, current: {} }
        case CLIENT_CACHE:
            return { ...state, current: action.data }
        case SAGA_ADD_CLIENT_SUCCESS:
            return { ...state, afterSave: true };

        case SAGA_GET_CLIENT_SUCCESS:
            return { ...state, current: action.client }

        case CLIENTS_EDIT:
            var { all } = state;
            var current = getClient(action.id)
            return { all, current };

        default: return state;
    }
}

export default clients;
