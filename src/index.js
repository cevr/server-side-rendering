const app = require('express')();
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const Home = require('./client/components/Home').default;

const PORT = 4000;

app.get('/', (req, res) => {
    const content = renderToString(<Home />);
    res.send(content);
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
