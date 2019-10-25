import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

/* Routes
*
* CHATROOM
* --------
* ADD GROUP CHATROOM
* JOIN GROUP CHATROOM
* SEND MESSAGE TO GROUP CHATROOM
* GET GROUP CHAT ROOM
* UPDATE GROUP CHAT ROOM
* UPDATE MESSAGE IN GROUP CHATROOM
* DELETE MESSAGE IN GROUP CHATROOM
* LEAVE GROUP CHATROOM
* DELETE GROUP CHATROOM
*
*/

/*
*   ADD GROUP CHATROOM
*/
export const addGroupChatRoomSuccess = bool => {
    return {
        type: keys.ADD_GROUP_CHAT_ROOM_SUCCESS,
        addGroupChatRoomStatus: bool,
    };
};

export const addGroupChatRoomDataSuccess = data => {
    return {
        type: keys.ADD_GROUP_CHAT_ROOM_DATA_SUCCESS,
        addGroupChatRoomData: data,
    };
};

export const addGroupChatRoomError = data => {
    return {
        type: keys.ADD_GROUP_CHAT_ROOM_ERROR,
        addGroupChatRoomError: data,
    };
};

export const addGroupChatRoom = data => {
    let ChatRoomData = {
        chatRoomName: data.chatRoomName,
    };

    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/chat', ChatRoomData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(addGroupChatRoomDataSuccess(res.data));
                dispatch(addGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(addGroupChatRoomSuccess(false));
                dispatch(addGroupChatRoomError(err.response.data));
            });
    };
};

/*
*   JOIN GROUP CHATROOM
*/
export const joinGroupChatRoomSuccess = bool => {
    return {
        type: keys.JOIN_GROUP_CHAT_ROOM_SUCCESS,
        joinGroupChatRoomStatus: bool,
    };
};

export const joinGroupChatRoomDataSuccess = data => {
    return {
        type: keys.JOIN_GROUP_CHAT_ROOM_DATA_SUCCESS,
        joinGroupChatRoomData: data,
    };
};

export const joinGroupChatRoomError = data => {
    return {
        type: keys.JOIN_GROUP_CHAT_ROOM_ERROR,
        joinGroupChatRoomError: data,
    };
};

export const joinGroupChatRoom = data => {
    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/chat', { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(joinGroupChatRoomDataSuccess(res.data));
                dispatch(joinGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(joinGroupChatRoomSuccess(false));
                dispatch(joinGroupChatRoomError(err.response.data));
            });
    };
};


/*
*   SEND MESSAGE TO GROUP CHATROOM
*/
export const sendMessageToGroupChatRoomSuccess = bool => {
    return {
        type: keys.SEND_MESSAGE_TO_GROUP_CHAT_ROOM_SUCCESS,
        sendMessageToGroupChatRoomStatus: bool,
    };
};

export const sendMessageToGroupChatRoomDataSuccess = data => {
    return {
        type: keys.SEND_MESSAGE_TO_GROUP_CHAT_ROOM_DATA_SUCCESS,
        sendMessageToGroupChatRoomData: data,
    };
};

export const sendMessageToGroupChatRoomError = data => {
    return {
        type: keys.SEND_MESSAGE_TO_GROUP_CHAT_ROOM_ERROR,
        sendMessageToGroupChatRoomError: data,
    };
};

export const sendMessageToGroupChatRoom = data => {
    const messageData = {
        messageBody: data.messageBody
    }

    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/chat/' + data.chatRoomId + '/message', messageData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(sendMessageToGroupChatRoomDataSuccess(res.data));
                dispatch(sendMessageToGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(sendMessageToGroupChatRoomSuccess(false));
                dispatch(sendMessageToGroupChatRoomError(err.response.data));
            });
    };
};

/*
*   GET GROUP CHAT ROOM
*/
export const getGroupChatRoomSuccess = bool => {
    return {
        type: keys.GET_GROUP_CHAT_ROOM_SUCCESS,
        getGroupChatRoomStatus: bool,
    };
};

export const getGroupChatRoomDataSuccess = data => {
    return {
        type: keys.GET_GROUP_CHAT_ROOM_DATA_SUCCESS,
        getGroupChatRoomData: data,
    };
};

export const getGroupChatRoomError = data => {
    return {
        type: keys.GET_GROUP_CHAT_ROOM_ERROR,
        getGroupChatRoomError: data,
    };
};

export const getGroupChatRoom = data => {
    return dispatch => {
        axios
            .get(API_URL + '/groups/' + data.groupId + '/chat/' + data.chatRoomId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(getGroupChatRoomDataSuccess(res.data));
                dispatch(getGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(getGroupChatRoomSuccess(false));
                dispatch(getGroupChatRoomError(err.response.data));
            });
    };
};

/*
*   UPDATE GROUP CHAT ROOM
*/
export const updateGroupChatRoomSuccess = bool => {
    return {
        type: keys.UPDATE_GROUP_CHAT_ROOM_SUCCESS,
        updateGroupChatRoomStatus: bool,
    };
};

export const updateGroupChatRoomDataSuccess = data => {
    return {
        type: keys.UPDATE_GROUP_CHAT_ROOM_DATA_SUCCESS,
        updateGroupChatRoomData: data,
    };
};

export const updateGroupChatRoomError = data => {
    return {
        type: keys.UPDATE_GROUP_CHAT_ROOM_ERROR,
        updateGroupChatRoomError: data,
    };
};

export const updateGroupChatRoom = data => {
    let chatRoomData = {
        chatRoomName: data.chatRoomName,
    };

    return dispatch => {
        axios
            .put(API_URL + '/groups/' + data.groupId + '/chat/' + data.chatRoomId, chatRoomData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(updateGroupChatRoomDataSuccess(res.data));
                dispatch(updateGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(updateGroupChatRoomSuccess(false));
                dispatch(updateGroupChatRoomError(err.response.data));
            });
    };
};

/*
*   UPDATE MESSAGE IN GROUP CHATROOM
*/
export const updateMessageInGroupChatRoomSuccess = bool => {
    return {
        type: keys.UPDATE_MESSAGE_IN_GROUP_CHAT_ROOM_SUCCESS,
        updateMessageInGroupChatRoomStatus: bool,
    };
};

export const updateMessageInGroupChatRoomDataSuccess = data => {
    return {
        type: keys.UPDATE_MESSAGE_IN_GROUP_CHAT_ROOM_DATA_SUCCESS,
        updateMessageInGroupChatRoomData: data,
    };
};

export const updateMessageInGroupChatRoomError = data => {
    return {
        type: keys.UPDATE_MESSAGE_IN_GROUP_CHAT_ROOM_ERROR,
        updateMessageInGroupChatRoomError: data,
    };
};

export const updateMessageInGroupChatRoom = data => {
    const messageData = {
        messageBody: data.messageBody
    }

    return dispatch => {
        axios
            .put(API_URL + '/groups/' + data.groupId + '/chat/' + data.chatRoomId + '/' + data.messageId, messageData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(updateMessageInGroupChatRoomDataSuccess(res.data));
                dispatch(updateMessageInGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(updateMessageInGroupChatRoomSuccess(false));
                dispatch(updateMessageInGroupChatRoomError(err.response.data));
            });
    };
};

/*
*   DELETE MESSAGE IN GROUP CHATROOM
*/
export const deleteMessageInGroupChatRoomSuccess = bool => {
    return {
        type: keys.DELETE_MESSAGE_IN_GROUP_CHAT_ROOM_SUCCESS,
        deleteMessageInGroupChatRoomStatus: bool,
    };
};

export const deleteMessageInGroupChatRoomDataSuccess = data => {
    return {
        type: keys.DELETE_MESSAGE_IN_GROUP_CHAT_ROOM_DATA_SUCCESS,
        deleteMessageInGroupChatRoomData: data,
    };
};

export const deleteMessageInGroupChatRoomError = data => {
    return {
        type: keys.DELETE_MESSAGE_IN_GROUP_CHAT_ROOM_ERROR,
        deleteMessageInGroupChatRoomError: data,
    };
};

export const deleteMessageInGroupChatRoom = data => {
    return dispatch => {
        axios
            .delete(API_URL + '/groups/' + data.groupId + '/chat/' + data.chatRoomId + '/message/' + data.messageId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(deleteMessageInGroupChatRoomDataSuccess(res.data));
                dispatch(deleteMessageInGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(deleteMessageInGroupChatRoomSuccess(false));
                dispatch(deleteMessageInGroupChatRoomError(err.response.data));
            });
    };
};

/*
*   LEAVE GROUP CHATROOM
*/
export const leaveGroupChatRoomSuccess = bool => {
    return {
        type: keys.LEAVE_GROUP_CHAT_ROOM_SUCCESS,
        leaveGroupChatRoomStatus: bool,
    };
};

export const leaveGroupChatRoomDataSuccess = data => {
    return {
        type: keys.LEAVE_GROUP_CHAT_ROOM_DATA_SUCCESS,
        leaveGroupChatRoomData: data,
    };
};

export const leaveGroupChatRoomError = data => {
    return {
        type: keys.LEAVE_GROUP_CHAT_ROOM_ERROR,
        leaveGroupChatRoomError: data,
    };
};

export const leaveGroupChatRoom = data => {
    return dispatch => {
        axios
            .delete(API_URL + '/groups/' + data.groupId + '/chat/' + data.chatRoomId + '/leave', { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(leaveGroupChatRoomDataSuccess(res.data));
                dispatch(leaveGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(leaveGroupChatRoomSuccess(false));
                dispatch(leaveGroupChatRoomError(err.response.data));
            });
    };
};

/*
*   DELETE GROUP CHATROOM
*/
export const deleteGroupChatRoomSuccess = bool => {
    return {
        type: keys.DELETE_GROUP_CHAT_ROOM_SUCCESS,
        deleteGroupChatRoomStatus: bool,
    };
};

export const deleteGroupChatRoomDataSuccess = data => {
    return {
        type: keys.DELETE_GROUP_CHAT_ROOM_DATA_SUCCESS,
        deleteGroupChatRoomData: data,
    };
};

export const deleteGroupChatRoomError = data => {
    return {
        type: keys.DELETE_GROUP_CHAT_ROOM_ERROR,
        deleteGroupChatRoomError: data,
    };
};

export const deleteGroupChatRoom = data => {
    return dispatch => {
        axios
            .delete(API_URL + '/groups/' + data.groupId + '/chat/' + data.chatRoomId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(deleteGroupChatRoomDataSuccess(res.data));
                dispatch(deleteGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(deleteGroupChatRoomSuccess(false));
                dispatch(deleteGroupChatRoomError(err.response.data));
            });
    };
};