import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import Routes from '../client/Routes';

export default ({ path }, store) => {
    //render everything first, then stringify it so the browser can immediately render non-javascript code
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={path} context={{}}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );

    //use serialize to prevent xss attacks
    //use script to inject state from server side render
    return `
        <html>
            <head>
            <!-- Compiled and minified CSS -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">
        
            </head>
            <body>
                <div id="root">${content}</div>
                <script>window.INITIAL_STATE = ${serialize(
                    store.getState()
                )}</script>              
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
};
