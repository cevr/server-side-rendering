import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';

import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createServerStore from './helpers/createServerStore';

const app = express();
const PORT = 3000;

//every request with /api gets proxied to the api server
//this is to allow server to have access to cookies
app.use(
    '/api',
    proxy('http://react-ssr-api.herokuapp.com', {
        proxyReqOptDecorator(opts) {
            opts.headers['x-forwarded-host'] = 'localhost:3000';
            return opts;
        }
    })
);

app.use(express.static('public'));

app.get('*', (req, res) => {
    //create redux store here, in order to manipulate it
    const store = createServerStore(req);

    //in order for the server to render api calls, we will call a function found in routes called loadData that contians all the api call logic for each route
    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => {
            return route.loadData && route.loadData(store);
        })
        .map(promise => {
            //in order to allow each api call to finish resolving instead of short circuting, resolve them all before assignging
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve);
                });
            }
        });

    Promise.all(promises).then(() => {
        //check routes for any error
        const context = {};
        const content = renderer(req, store, context);

        if (context.url) {
            //if context.url exists, react-router is attempting to redirect
            //in the case that javascript is disabled, rederiect anyway
            return res.redirect(301, context.url);
        }

        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    });
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
