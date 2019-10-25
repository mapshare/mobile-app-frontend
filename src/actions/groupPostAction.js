import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

/* Routes
*
* POST
* ----
* ADD GROUP POST
* GET GROUP POST
* UPDATE GROUP POST
* DELETE GROUP POST
*
*/

/*
*   ADD GROUP POST
*/
export const addGroupPostSuccess = bool => {
    return {
        type: keys.ADD_GROUP_POST_SUCCESS,
        addGroupPostStatus: bool,
    };
};

export const addGroupPostDataSuccess = data => {
    return {
        type: keys.ADD_GROUP_POST_DATA_SUCCESS,
        addGroupPostData: data,
    };
};

export const addGroupPostError = data => {
    return {
        type: keys.ADD_GROUP_POST_ERROR,
        addGroupPostError: data,
    };
};

export const addGroupPost = data => {
    let postData = {
        postTitle: data.postTitle,
        postContent: data.postContent,
    };

    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/post', postData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(addGroupPostDataSuccess(res.data));
                dispatch(addGroupPostSuccess(true));
            })
            .catch(err => {
                dispatch(addGroupPostSuccess(false));
                dispatch(addGroupPostError(err.response.data));
            });
    };
};

/*
*   GET GROUP POST
*/
export const getGroupPostSuccess = bool => {
    return {
        type: keys.GET_GROUP_POST_SUCCESS,
        getGroupPostStatus: bool,
    };
};

export const getGroupPostDataSuccess = data => {
    return {
        type: keys.GET_GROUP_POST_DATA_SUCCESS,
        getGroupPostData: data,
    };
};

export const getGroupPostError = data => {
    return {
        type: keys.GET_GROUP_POST_ERROR,
        getGroupPostError: data,
    };
};

export const getGroupPost = data => {
    return dispatch => {
        axios
            .get(API_URL + '/groups/' + data.groupId + '/post/' + data.postId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(getGroupPostDataSuccess(res.data));
                dispatch(getGroupPostSuccess(true));
            })
            .catch(err => {
                dispatch(getGroupPostSuccess(false));
                dispatch(getGroupPostError(err.response.data));
            });
    };
};

/*
*   UPDATE GROUP POST
*/
export const updateGroupPostSuccess = bool => {
    return {
        type: keys.UPDATE_GROUP_POST_SUCCESS,
        updateGroupPostStatus: bool,
    };
};

export const updateGroupPostDataSuccess = data => {
    return {
        type: keys.UPDATE_GROUP_POST_DATA_SUCCESS,
        updateGroupPostData: data,
    };
};

export const updateGroupPostError = data => {
    return {
        type: keys.UPDATE_GROUP_POST_ERROR,
        updateGroupPostError: data,
    };
};

export const updateGroupPost = data => {
    let postData = {
        postTitle: data.postTitle,
        postContent: data.postContent,
    };

    return dispatch => {
        axios
            .put(API_URL + '/groups/' + data.groupId + '/post/' + data.postId, postData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(updateGroupPostDataSuccess(res.data));
                dispatch(updateGroupPostSuccess(true));
            })
            .catch(err => {
                dispatch(updateGroupPostSuccess(false));
                dispatch(updateGroupPostError(err.response.data));
            });
    };
};
/*
*   DELETE GROUP POST
*/
export const deleteGroupPostSuccess = bool => {
    return {
        type: keys.DELETE_GROUP_POST_SUCCESS,
        deleteGroupPostStatus: bool,
    };
};

export const deleteGroupPostDataSuccess = data => {
    return {
        type: keys.DELETE_GROUP_POST_DATA_SUCCESS,
        deleteGroupPostData: data,
    };
};

export const deleteGroupPostError = data => {
    return {
        type: keys.DELETE_GROUP_POST_ERROR,
        deleteGroupPostError: data,
    };
};

export const deleteGroupPost = data => {
    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/post/' + data.postId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(deleteGroupPostDataSuccess(res.data));
                dispatch(deleteGroupPostSuccess(true));
            })
            .catch(err => {
                dispatch(deleteGroupPostSuccess(false));
                dispatch(deleteGroupPostError(err.response.data));
            });
    };
};