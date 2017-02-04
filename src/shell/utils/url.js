import _ from 'lodash';

export const makQueryString = (data = {}) => {
    let queryString = _.reduce(data, function (result, value, key) {
        return result + `${key}=${value}&`;
    }, '');


    if (_.isEmpty(queryString)) {
        return '';
    }
    console.log(queryString)
    return queryString.substr(0, queryString.length - 1);
}