import axios from 'axios';


function getCurrentAccount() {
    return JSON.parse(localStorage.getItem('current_account'));
}


function getCurrentAccountId() {
    return getCurrentAccount().id;
}

function getToken() {
    return localStorage.getItem('id_token');
}

const headerConfig = {
    'Authorization': `Bearer ${getToken()}`
}

const config = {
    'headers': headerConfig
}

export default class ApiFetcher {

    static getConfig() {
        return {
            'Authorization': `Bearer ${getToken()}`
        };
    }

    static findAll(model) {
        return axios.get(`${getCurrentAccountId()}/${model}`, config);
    }

    static find(model, id) {
        return axios.get(`${getCurrentAccountId()}/${model}/${id}`, config);
    }

    static create(model, data) {
        return axios.post(`${getCurrentAccountId()}/${model}`, data, config);
    }

    static update(model, data) {
        return axios.put(`${getCurrentAccountId()}/${model}/${data.id}`, data, config);
    }

    static makeRequest(method, url, data = {}, headers) {
        return axios({
            method: method.toLowerCase(),
            url: `${url}`,
            data: data,
            headers: headers
        });
    }
}