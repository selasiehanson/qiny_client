import React from 'react';
import { Router } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';

const Root = (props) => {
    const {store, history} = props;    
    return (
        <Provider store={store}>
            <Router history={history} routes={routes} />            
        </Provider>
    )
}

 export default Root;