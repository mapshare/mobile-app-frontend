import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

/* Routes
*
* GROUP
* -----
* Create Group
* Search Group        
* ADD GROUP MEMBER
* LEAVE GROUP
* DELETE GROUP
*
*/

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

/*
*   Add GROUP MEMBER
*/
export const addGroupMemberSuccess = bool => {
    return {
        type: keys.ADD_GROUP_MEMBER_SUCCESS,
        addGroupMemberStatus: bool,
    };
};

export const addGroupMemberDataSuccess = data => {
    return {
        type: keys.ADD_GROUP_MEMBER_DATA_SUCCESS,
        addGroupMemberData: data,
    };
};

export const addGroupMemberError = data => {
    return {
        type: keys.ADD_GROUP_MEMBER_ERROR,
        addGroupMemberError: data,
    };
};

export const addGroupMember = data => {
    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId, { newGroupMember: data.newGroupMember }, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(addGroupMemberDataSuccess(res.data));
                dispatch(addGroupMemberSuccess(true));
            })
            .catch(err => {
                dispatch(addGroupMemberSuccess(false));
                dispatch(addGroupMemberError(err.response.data));
            });
    };
};

/*
*   LEAVE GROUP
*/
export const leaveGroupSuccess = bool => {
    return {
        type: keys.LEAVE_GROUP_SUCCESS,
        leaveGroupStatus: bool,
    };
};

export const deleteGroupPostDataSuccess = data => {
    return {
        type: keys.LEAVE_GROUP_DATA_SUCCESS,
        leaveGroupData: data,
    };
};

export const deleteGroupPostError = data => {
    return {
        type: keys.LEAVE_GROUP_ERROR,
        leaveGroupError: data,
    };
};

export const leaveGroup = data => {
    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/member', { headers: { 'authentication': data.token } })
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

/*
*   DELETE GROUP
*/
export const deleteGroupSuccess = bool => {
    return {
        type: keys.DELETE_GROUP_SUCCESS,
        deleteGroupStatus: bool,
    };
};

export const deleteGroupPostDataSuccess = data => {
    return {
        type: keys.DELETE_GROUP_DATA_SUCCESS,
        deleteGroupData: data,
    };
};

export const deleteGroupPostError = data => {
    return {
        type: keys.DELETE_GROUP_ERROR,
        deleteGroupError: data,
    };
};

export const deleteGroup = data => {
    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId, { headers: { 'authentication': data.token } })
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
