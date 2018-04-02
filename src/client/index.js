// client-side index
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import store from './redux/clientStore';
const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    );
};

ReactDOM.hydrate(<Root />, document.querySelector('#root'));
