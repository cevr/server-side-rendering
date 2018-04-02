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

    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData && route.loadData(store);
    });

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
