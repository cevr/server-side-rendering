import React from 'react';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';

//routes must be changed from JSX to pure objects for server side rendering
//react-router-config can create virtual dom nodes from this array of objects
export default [
    {
        ...HomePage,
        path: '/',
        exact: true
    },
    {
        ...UsersPage,
        path: '/users'
    }
];
