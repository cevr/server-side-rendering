import { CHECK_AUTH } from '../actions';

export default (state = null, { type, payload }) => {
    switch (type) {
        case CHECK_AUTH:
            return payload.data || false;
        default:
            return state;
    }
};
