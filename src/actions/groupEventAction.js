import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

/* Routes
*
* EVENT
* -----
* ADD GROUP EVENT
* JOIN GROUP EVENT
* GET GROUP EVENT
* UPDATE GROUP EVENT
* LEAVE GROUP EVENT
* DELETE GROUP EVENT
*
*/

/*
*   Add GROUP EVENT
*/
export const addGroupEventSuccess = bool => {
    return {
        type: keys.ADD_GROUP_EVENT_SUCCESS,
        addGroupEventStatus: bool,
    };
};

export const addGroupEventDataSuccess = data => {
    return {
        type: keys.ADD_GROUP_EVENT_DATA_SUCCESS,
        addGroupEventData: data,
    };
};

export const addGroupEventError = data => {
    return {
        type: keys.ADD_GROUP_EVENT_ERROR,
        addGroupEventError: data,
    };
};

export const addGroupEvent = data => {
    let eventData = {
        eventName: data.eventName,
        eventDescription: data.eventDescription,
        eventMark: data.eventMark
    };

    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/event', eventData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(addGroupEventDataSuccess(res.data));
                dispatch(addGroupEventSuccess(true));
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
                dispatch(addGroupEventSuccess(false));
                dispatch(addGroupEventError(err.response.data));
            });
    };
};

/*
*   JOIN GROUP EVENT
*/
export const joinGroupEventSuccess = bool => {
    return {
        type: keys.JOIN_GROUP_EVENT_SUCCESS,
        joinGroupEventStatus: bool,
    };
};

export const joinGroupEventDataSuccess = data => {
    return {
        type: keys.JOIN_GROUP_EVENT_DATA_SUCCESS,
        joinGroupEventData: data,
    };
};

export const joinGroupEventError = data => {
    return {
        type: keys.JOIN_GROUP_EVENT_ERROR,
        joinGroupEventError: data,
    };
};

export const joinGroupEvent = data => {
    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/event/' + data.groupEventId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(joinGroupEventDataSuccess(res.data));
                dispatch(joinGroupEventSuccess(true));
            })
            .catch(err => {
                dispatch(joinGroupEventSuccess(false));
                dispatch(joinGroupEventError(err.response.data));
            });
    };
};

/*
*   GET GROUP EVENT
*/
export const getGroupEventSuccess = bool => {
    return {
        type: keys.GET_GROUP_EVENT_SUCCESS,
        getGroupEventStatus: bool,
    };
};

export const getGroupEventDataSuccess = data => {
    return {
        type: keys.GET_GROUP_EVENT_DATA_SUCCESS,
        getGroupEventData: data,
    };
};

export const getGroupEventError = data => {
    return {
        type: keys.GET_GROUP_EVENT_ERROR,
        getGroupEventError: data,
    };
};


export const getGroupEvent = data => {
    return dispatch => {
        axios
            .get(API_URL + '/groups/' + data.groupId + '/event/' + data.eventId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(getGroupEventDataSuccess(res.data));
                dispatch(getGroupEventSuccess(true));
            })
            .catch(err => {
                dispatch(getGroupEventSuccess(false));
                dispatch(getGroupEventError(err.response.data));
            });
    };
};


/*
*   GET ALL GROUP EVENTs
*/
export const getAllGroupEventDataSuccess = data => {
    return {
        type: keys.GET_ALL_GROUP_EVENT_DATA_SUCCESS,
        getAllGroupEventData: data,
    };
};

export const getAllGroupEventError = data => {
    return {
        type: keys.GET_ALL_GROUP_EVENT_ERROR,
        getAllGroupEventError: data,
    };
};

export const getAllGroupEvent = data => {
    return async dispatch => {
        try {
            const res = await axios.get(API_URL + '/groups/' + data.groupId + '/allEvents', { headers: { 'authentication': data.token } });
            dispatch(getAllGroupEventDataSuccess(res.data));
        } catch (error) {
            dispatch(getAllGroupEventError(error));
        }
    }
};

/*
*   UPDATE GROUP EVENT
*/
export const updateGroupEventSuccess = bool => {
    return {
        type: keys.UPDATE_GROUP_EVENT_SUCCESS,
        updateGroupEventStatus: bool,
    };
};

export const updateGroupEventDataSuccess = data => {
    return {
        type: keys.UPDATE_GROUP_EVENT_DATA_SUCCESS,
        updateGroupEventData: data,
    };
};

export const updateGroupEventError = data => {
    return {
        type: keys.UPDATE_GROUP_EVENT_ERROR,
        updateGroupEventError: data,
    };
};

export const updateGroupEvent = data => {
    let eventData = {
        eventName: data.eventName,
        eventDescription: data.eventDescription,
    };

    return dispatch => {
        axios
            .put(API_URL + '/groups/' + data.groupId + '/event/' + data.eventId, eventData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(updateGroupEventDataSuccess(res.data));
                dispatch(updateGroupEventSuccess(true));
            })
            .catch(err => {
                dispatch(updateGroupEventSuccess(false));
                dispatch(updateGroupEventError(err.response.data));
            });
    };
};

/*
*   LEAVE GROUP EVENT
*/
export const leaveGroupEventSuccess = bool => {
    return {
        type: keys.LEAVE_GROUP_EVENT_SUCCESS,
        leaveGroupEventStatus: bool,
    };
};

export const leaveGroupEventDataSuccess = data => {
    return {
        type: keys.LEAVE_GROUP_EVENT_DATA_SUCCESS,
        leaveGroupEventData: data,
    };
};

export const leaveGroupEventError = data => {
    return {
        type: keys.LEAVE_GROUP_EVENT_ERROR,
        leaveGroupEventError: data,
    };
};

export const leaveGroupEvent = data => {
    return dispatch => {
        axios
            .delete(API_URL + '/groups/' + data.groupId + '/event/' + data.groupEventId + 'leave', { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(leaveGroupEventDataSuccess(res.data));
                dispatch(leaveGroupEventSuccess(true));
            })
            .catch(err => {
                dispatch(leaveGroupEventSuccess(false));
                dispatch(leaveGroupEventError(err.response.data));
            });
    };
};

/*
*   DELETE GROUP EVENT
*/
export const deleteGroupEventSuccess = bool => {
    return {
        type: keys.DELETE_GROUP_EVENT_SUCCESS,
        deleteGroupEventStatus: bool,
    };
};

export const deleteGroupEventDataSuccess = data => {
    return {
        type: keys.DELETE_GROUP_EVENT_DATA_SUCCESS,
        deleteGroupEventData: data,
    };
};

export const deleteGroupEventError = data => {
    return {
        type: keys.DELETE_GROUP_EVENT_ERROR,
        deleteGroupEventError: data,
    };
};

export const deleteGroupEvent = data => {
    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/event/' + data.eventId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(deleteGroupEventDataSuccess(res.data));
                dispatch(deleteGroupEventSuccess(true));
            })
            .catch(err => {
                dispatch(deleteGroupEventSuccess(false));
                dispatch(deleteGroupEventError(err.response.data));
            });
    };
};