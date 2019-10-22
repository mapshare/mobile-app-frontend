import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

/*
*   CREATE GROUP
*/
export const createGroupSuccess = bool => {
    return {
        type: keys.CREATE_GROUP_SUCCESS,
        status: bool,
    };
};

export const createGroupDataSuccess = data => {
    return {
        type: keys.CREATE_GROUP_DATA_SUCCESS,
        data: data,
    };
};

export const createGroupError = data => {
    return {
        type: keys.CREATE_GROUP_ERROR,
        error: data,
    };
};

export const createGroup = data => {
    let groupData = {
        groupName: data.groupName,
    };

    return dispatch => {
        axios
            .post(API_URL + '/groups', groupData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(createGroupDataSuccess(res.data));
                dispatch(createGroupSuccess(true));
            })
            .catch(err => {
                dispatch(createGroupSuccess(false));
                dispatch(createGroupError(err.response.data));
            });
    };
};

/*
*   SEARCH FOR GROUP
*/

export const searchGroupSuccess = bool => {
    return {
        type: keys.SEARCH_GROUP_SUCCESS,
        searchStatus: bool,
    };
};

export const searchGroupDataSuccess = data => {
    return {
        type: keys.SEARCH_GROUP_DATA_SUCCESS,
        searchData: data,
    };
};

export const searchGroupError = data => {
    return {
        type: keys.SEARCH_GROUP_ERROR,
        searchGroupError: data,
    };
};

export const searchGroup = data => {
    return dispatch => {
        axios
            .post(API_URL + '/groups/search/' + data.searchArg, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(searchGroupDataSuccess(res.data));
                dispatch(searchGroupSuccess(true));
            })
            .catch(err => {
                dispatch(searchGroupSuccess(false));
                dispatch(searchGroupError(err.response.data));
            });
    };
};