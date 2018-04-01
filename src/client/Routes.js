import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/test" render={() => 'hello'} />
        </Switch>
    );
};