// client-side index
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const Root = () => {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
};

ReactDOM.hydrate(<Root />, document.querySelector('#root'));
