import {
    SAGA_FETCH_CLIENTS,
    CLIENTS_EDIT,
    CLIENT_CACHE,
    SAGA_ADD_CLIENT,
    CLIENTS_DELETE,
    MSG_CLIENT_CREATE_SUCCESS,
    MSG_CLIENT_UPDATE_SUCCESS,
    SHOW_NOTIFICATION,
    CLIENTS_SHOW_NEW,
    SAGA_GET_CLIENT,
    SAGA_UPDATE_CLIENT,
    CLIENTS_ALL
} from '../constants';

export const initGetClients = () => {
    return {
        type: CLIENTS_ALL
    };
}

export const getClients = (params) => {
    return {
        type: SAGA_FETCH_CLIENTS,
        data: params
    }
}

export const addClient = (client) => {
    return {
        type: SAGA_ADD_CLIENT,
        data: { client }
    };
}

export const updateClient = (client) => {
    return {
        type: SAGA_UPDATE_CLIENT,
        data: { client },
        id: client.id
    };
}

export const getClient = (id) => {
    return { type: SAGA_GET_CLIENT, id }
}

export const showNewClient = () => {
    return { type: CLIENTS_SHOW_NEW }
}

export const editClient = (id) => {
    return { type: CLIENTS_EDIT, id }
}

export const deleteClient = (id) => {
    return { type: CLIENTS_DELETE, id }
}

export const cacheClient = (client) => {
    return {
        type: CLIENT_CACHE,
        data: client
    }
}

export const showClientSavedMsg = (mode) => {
    let msg = mode === 'create' ? MSG_CLIENT_CREATE_SUCCESS : MSG_CLIENT_UPDATE_SUCCESS;
    return {
        type: SHOW_NOTIFICATION,
        payload: {
            type: 'success',
            content: msg
        }
    }
}
