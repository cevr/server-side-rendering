import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createServerStore from './helpers/createServerStore';

const app = express();
const PORT = 4000;

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createServerStore();

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
