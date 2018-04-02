import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import UsersList from './components/UsersList';

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/test" render={() => 'hello'} />
            <Route path="/users" component={UsersList} />
        </Switch>
    );
};
