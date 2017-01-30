import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
// import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas';
import contactsApp from './reducers';
import Root from './Root'
import createLogger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
//const logger =

let middlewares = [];
if (process.env) {
    if (process.env.NODE_ENV === 'development') {
        middlewares.push(createLogger());
    }
}

middlewares.push(sagaMiddleware)
const middleWare = applyMiddleware(...middlewares, routerMiddleware(hashHistory));

let store = createStore(contactsApp, middleWare);
const history = syncHistoryWithStore(hashHistory, store);

sagaMiddleware.run(sagas);

export const run = (root) =>
    render(
        <Root store={store} history={history} />,
        document.getElementById(root))