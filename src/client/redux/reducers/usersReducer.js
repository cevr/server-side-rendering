import { FETCH_USERS } from './actions';

const initialState = [];
export const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_USERS:
            return payload.data;
        default:
            return state;
    }
};
