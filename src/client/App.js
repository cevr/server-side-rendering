import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { checkAuth } from './redux/actions';

const App = ({ route: { routes } }) => {
    return (
        <div>
            <Header />
            {renderRoutes(routes)}
        </div>
    );
};

export default {
    component: App,
    loadData: ({ dispatch }) => dispatch(checkAuth())
};
