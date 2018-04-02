import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import reducers from '../client/redux/reducers/index';

//create a new axios instance with the a link to the api for the server side rendering, then attach the cookie made to the header
export default req => {
    const axiosInstance = axios.create({
        baseURL: 'http://react-ssr-api.herokuapp.com',
        headers: { cookie: req.get('cookie') || '' }
    });

    //redux thunk can be passed an another parameter, use new axios instance as the parameter to easily change axios instances depending on whether it is client or server
    const store = createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    );
    return store;
};
