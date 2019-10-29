import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

/* Routes
*
* GROUP
* -----
* Create Group
* Search Group       
* GET ACTIVE GROUP 
* ADD GROUP MEMBER
* GET GROUP MEMBER
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
    let searchArg = {
        groupName: data.groupName,
    };
    return dispatch => {
        axios
            .post(API_URL + '/groups/search', searchArg, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(searchGroupDataSuccess(res.data));
                dispatch(searchGroupSuccess(true));
            })
            .catch(err => {
                dispatch(searchGroupSuccess(false));
                dispatch(searchGroupError(err.response));
            });
    };
};


/*
*   GET ACTIVE GROUP
*/
export const getActiveGroupSuccess = bool => {
    return {
        type: keys.GET_ACTIVE_GROUP_SUCCESS,
        getActiveGroupStatus: bool,
    };
};

export const getActiveGroupDataSuccess = data => {
    return {
        type: keys.GET_ACTIVE_GROUP_DATA_SUCCESS,
        getActiveGroupData: data,
    };
};

export const getActiveGroupError = data => {
    return {
        type: keys.GET_ACTIVE_GROUP_ERROR,
        getActiveGroupError: data,
    };
};

export const getActiveGroup = data => {
    return dispatch => {
        axios
            .get(API_URL + '/groups/' + data.groupId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(getActiveGroupDataSuccess(res.data));
                dispatch(getActiveGroupSuccess(true));
            })
            .catch(err => {
                dispatch(getActiveGroupSuccess(false));
                dispatch(getActiveGroupError(err.response));
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
*   GET GROUP MEMBER
*/
export const getGroupMemberSuccess = bool => {
    return {
        type: keys.GET_GROUP_MEMBER_SUCCESS,
        getGroupMemberStatus: bool,
    };
};

export const getGroupMemberDataSuccess = data => {
    return {
        type: keys.GET_GROUP_MEMBER_DATA_SUCCESS,
        getGroupMemberData: data,
    };
};

export const getGroupMemberError = data => {
    return {
        type: keys.GET_GROUP_MEMBER_ERROR,
        getGroupMemberError: data,
    };
};

export const getGroupMember = data => {
    return dispatch => {
        axios
            .get(API_URL + '/groups/' + data.groupId +'/member', { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(getGroupMemberDataSuccess(res.data));
                dispatch(getGroupMemberSuccess(true));
            })
            .catch(err => {
                dispatch(getGroupMemberSuccess(false));
                dispatch(getGroupMemberError(err.response.data));
            });
    };
};


/*
* UPDATE GROUP
*/
export const updateGroupSuccess = bool => {
    return {
        type: keys.UPDATE_GROUP_SUCCESS,
        updateGroupStatus: bool,
    };
};

export const updateGroupPostDataSuccess = data => {
    return {
        type: keys.UPDATE_GROUP_DATA_SUCCESS,
        updateGroupData: data,
    };
};

export const updateGroupPostError = data => {
    return {
        type: keys.UPDATE_GROUP_ERROR,
        updateGroupError: data,
    };
};

export const updateGroup = data => {
    let groupData = {
        groupName: data.groupName,
    };

    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId, groupData, { headers: { 'authentication': data.token } })
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
*   LEAVE GROUP
*/
export const leaveGroupSuccess = bool => {
    return {
        type: keys.LEAVE_GROUP_SUCCESS,
        leaveGroupStatus: bool,
    };
};

export const leaveGroupPostDataSuccess = data => {
    return {
        type: keys.LEAVE_GROUP_DATA_SUCCESS,
        leaveGroupData: data,
    };
};

export const leaveGroupPostError = data => {
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
                dispatch(leaveGroupPostDataSuccess(res.data));
                dispatch(leaveGroupPostSuccess(true));
            })
            .catch(err => {
                dispatch(leaveGroupPostSuccess(false));
                dispatch(leaveGroupPostError(err.response.data));
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
