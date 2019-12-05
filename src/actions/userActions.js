import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

/* Routes
*
* GROUP
* -----
* GET USER
* UPDATE USER
* DELETE USER
*/

/*
*   GET USER
*/
export const getUserSuccess = bool => {
    return {
        type: keys.GET_USER_SUCCESS,
        getUserStatus: bool,
    };
};

export const getUserDataSuccess = data => {
    return {
        type: keys.GET_USER_DATA_SUCCESS,
        getUserData: data,
    };
};

export const getUserError = data => {
    return {
        type: keys.GET_USER_ERROR,
        getUserError: data,
    };
};

export const getUser = data => {
    return dispatch => {
        axios
            .get(API_URL + '/user', { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(getUserDataSuccess(res.data));
                dispatch(getUserSuccess(true));
            })
            .catch(err => {
                dispatch(getUserSuccess(false));
                dispatch(getUserError(err.response.data));
            });
    };
};

/*
*   UPDATE USER
*/
export const updateUserSuccess = bool => {
    return {
        type: keys.UPDATE_USER_SUCCESS,
        updateUserStatus: bool,
    };
};

export const updateUserDataSuccess = data => {
    return {
        type: keys.UPDATE_USER_DATA_SUCCESS,
        updateUserData: data,
    };
};

export const updateUserError = data => {
    return {
        type: keys.UPDATE_USER_ERROR,
        updateUserError: data,
    };
};

export const updateUser = data => {
    userData = {
        userEmail: data.userEmail,
        userFirstName: data.userFirstName,
        userLastName: data.userLastName,
        userEmail: data.userEmail,
    }

    return dispatch => {
        axios
            .put(API_URL + '/user', userData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(updateUserDataSuccess(res.data));
                dispatch(updateUserSuccess(true));
            })
            .catch(err => {
                dispatch(updateUserSuccess(false));
                dispatch(updateUserError(err.response.data));
            });
    };
};

/*
*   DELETE USER
*/
export const deleteUserSuccess = bool => {
    return {
        type: keys.DELETE_USER_SUCCESS,
        deleteUserStatus: bool,
    };
};

export const deleteUserDataSuccess = data => {
    return {
        type: keys.DELETE_USER_DATA_SUCCESS,
        deleteUserData: data,
    };
};

export const deleteUserError = data => {
    return {
        type: keys.DELETE_USER_ERROR,
        deleteUserError: data,
    };
};

export const deleteUser = data => {
    return dispatch => {
        axios
            .delete(API_URL + '/user', { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(deleteUserDataSuccess(res.data));
                dispatch(deleteUserSuccess(true));
            })
            .catch(err => {
                dispatch(deleteUserSuccess(false));
                dispatch(deleteUserError(err.response.data));
            });
    };
};

export const comparePasswordResult = data => {
    return {
        type: keys.COMPARE_PASSWORD_RESULTS,
        comparePasswordResult: comparePasswordResult
    };
};

export const comparePassword = data => {
    return async dispatch => {
        try {
            const res = await axios.post(API_URL + '/comparePassword', data.oldPassword, { headers: { 'authentication': data.token } });
            dispatch(comparePasswordResult(res.data));
        } catch (err) {
            dispatch(comparePasswordResult(false));
        }
    };
};