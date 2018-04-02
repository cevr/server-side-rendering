import express from 'express';
import renderer from './helpers/renderer';
import createServerStore from './helpers/serverStore';

const app = express();
const PORT = 4000;

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createServerStore();
    res.send(renderer(req, store));
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
