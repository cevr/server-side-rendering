export const FETCH_USERS = 'fetch_users';
export const CHECK_AUTH = 'check_auth';
export const FETCH_ADMINS = 'fetch_admins';
//this action receives new axios instance, use it to proxy browser to the server
export const fetchUsers = () => async (dispatch, getState, api) => {
    const res = await api.get('/users');
    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};

export const checkAuth = () => async (dispatch, getState, api) => {
    const res = await api.get('/current_user');
    dispatch({
        type: CHECK_AUTH,
        payload: res
    });
};

export const fetchAdmins = () => async (dispatch, getState, api) => {
    const res = await api.get('/admins');
    dispatch({
        type: FETCH_ADMINS,
        payload: res
    });
};
