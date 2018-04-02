// client-side index
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import reducers from './redux/reducers/index';

const axiosInstance = axios.create({
    baseURL: '/api'
});

//inject state from the server side rendering, in order to prevent second fetch if unnecessary
const store = createStore(
    reducers,
    window.INITIAL_STATE,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>{renderRoutes(Routes)}</div>
            </BrowserRouter>
        </Provider>
    );
};

ReactDOM.hydrate(<Root />, document.querySelector('#root'));
