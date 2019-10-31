import axios from 'axios';
import { API_URL, CHAT_URL } from 'react-native-dotenv'

import io from 'socket.io-client';

import keys from '../data/key';
import { voidTypeAnnotation } from '@babel/types';

/* Routes
*
* CHATROOM
* --------
* CONNECT TO GROUP CHAT
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
*   CONNECT TO GROUP CHAT
*/
export const connectToGroupChatSuccess = bool => {
    return {
        type: keys.CONNECT_TO_GROUP_CHAT_SUCCESS,
        connectToGroupChatStatus: bool,
    };
};

export const connectToGroupChatDataSuccess = data => {
    return {
        type: keys.CONNECT_TO_GROUP_CHAT_DATA_SUCCESS,
        socket: data,
    };
};

export const chatLogData = data => {
    return {
        type: keys.CHAT_LOG_DATA,
        chatLogData: data,
    };
};

export const newMessageStatus = data => {
    return {
        type: keys.NEW_MESSAGE_STATUS,
        getNewMessageStatus: data,
    };
};

export const newMessageData = data => {
    return {
        type: keys.NEW_MESSAGE_DATA,
        newMessageData: data,
    };
};

export const connectToGroupChatError = data => {
    return {
        type: keys.CONNECT_TO_GROUP_CHAT_ERROR,
        connectToGroupChatError: data,
    };
};

export const connectToGroupChat = data => {
    return dispatch => {
        try {

            console.log("connecting")
            const socket = io.connect(CHAT_URL + '/' + data.groupId);
            if (!socket) throw ("Unable to connect to server");

            socket.on('connect', () => {
                socket.emit('authenticate', data.token)
                    .on('authenticated', () => {
                        console.log("authenticated")
                        dispatch(connectToGroupChatDataSuccess(socket));
                        dispatch(connectToGroupChatSuccess(true));
                    })
                    .on('unauthorized', (msg) => {
                        throw ("Unable to connect to server " + msg);
                    })
                    .on('new message', (data) => {
                        console.log("new message responce")
                        dispatch(newMessageData(data));
                        dispatch(newMessageStatus(true));
                    });
            });
        } catch (error) {
            dispatch(connectToGroupChatSuccess(false));
            dispatch(connectToGroupChatError(error));
        }
    }
};

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
    const param = {
        groupId: data.groupId,
        chatRoomId: data.chatRoomId
    }
    return dispatch => {
        try {
            data.socket.emit('join room', param);
            data.socket.on('join room', (data) => {
                console.log("ROOM Joined")
                dispatch(joinGroupChatRoomDataSuccess(data));
                dispatch(joinGroupChatRoomSuccess(true));
            });
        } catch (error) {
            console.log("ERROR: " + error)
            dispatch(joinGroupChatRoomSuccess(false));
            dispatch(joinGroupChatRoomError(error));
        }
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
    return dispatch => {
        try {
            data.socket.emit('new message', data.messageBody);
            dispatch(sendMessageToGroupChatRoomSuccess(true));
        } catch (error) {
            dispatch(sendMessageToGroupChatRoomSuccess(false));
            dispatch(sendMessageToGroupChatRoomError(error));
        }
    };
};

/*
*   GET ACTIVE GROUP CHAT ROOM
*/
export const getActiveGroupChatRoomSuccess = bool => {
    return {
        type: keys.GET_ACTIVE_GROUP_CHAT_ROOM_SUCCESS,
        getActiveGroupChatRoomStatus: bool,
    };
};

export const getActiveGroupChatRoomDataSuccess = data => {
    return {
        type: keys.GET_ACTIVE_GROUP_CHAT_ROOM_DATA_SUCCESS,
        getActiveGroupChatRoomData: data,
    };
};

export const getActiveGroupChatRoomError = data => {
    return {
        type: keys.GET_ACTIVE_GROUP_CHAT_ROOM_ERROR,
        getActiveGroupChatRoomError: data,
    };
};

export const getActiveGroupChatRoom = data => {
    
    console.log(data)
    return dispatch => {
        axios
            .get(API_URL + '/groups/' + data.groupId + '/chat/' + data.chatRoomId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(getActiveGroupChatRoomDataSuccess(res.data));
                dispatch(getActiveGroupChatRoomSuccess(true));
            })
            .catch(err => {
                console.log(err.response)
                dispatch(getActiveGroupChatRoomSuccess(false));
                dispatch(getActiveGroupChatRoomError(err.response.data));
            });
    };
};

/*
*   DISCONNECT GROUP CHATROOM
*/
export const disconnectGroupChatRoomSuccess = bool => {
    return {
        type: keys.DISCONECT_GROUP_CHAT_ROOM_SUCCESS,
        disconnectGroupChatRoomStatus: bool,
    };
};

export const disconnectGroupChatRoomDataSuccess = data => {
    return {
        type: keys.DISCONECT_GROUP_CHAT_ROOM_DATA_SUCCESS,
        disconnectGroupChatRoomData: data,
    };
};

export const disconnectGroupChatRoomError = data => {
    return {
        type: keys.DISCONECT_GROUP_CHAT_ROOM_ERROR,
        disconnectGroupChatRoomError: data,
    };
};

export const disconnectGroupChatRoom = data => {
    return dispatch => {
        try {
            data.socket.emit('disconnect', true);
            data.socket.removeAllListeners();
            dispatch(disconnectGroupChatRoomSuccess(true));
        } catch (error) {
            dispatch(disconnectGroupChatRoomSuccess(false));
            dispatch(disconnectGroupChatRoomError(error));
        }
    };
};

/*
*   SEARCH FOR GROUP CHATROOM
*/
export const searchGroupChatRoomSuccess = bool => {
    return {
        type: keys.SEARCH_GROUP_CHAT_ROOM_SUCCESS,
        searchGroupChatRoomStatus: bool,
    };
};

export const searchGroupChatRoomDataSuccess = data => {
    return {
        type: keys.SEARCH_GROUP_CHAT_ROOM_DATA_SUCCESS,
        searchGroupChatRoomData: data,
    };
};

export const searchGroupChatRoomError = data => {
    return {
        type: keys.SEARCH_GROUP_CHAT_ROOM_ERROR,
        searchGroupChatRoomError: data,
    };
};

export const searchGroupChatRoom = data => {
    let searchArg = {
        chatRoomName: data.chatRoomName,
    };
    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/chat/search', searchArg, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(searchGroupChatRoomDataSuccess(res.data));
                dispatch(searchGroupChatRoomSuccess(true));
            })
            .catch(err => {
                dispatch(searchGroupChatRoomSuccess(false));
                dispatch(searchGroupChatRoomError(err.response));
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
    const newMessageData = {
        messageBody: data.messageBody
    }

    return dispatch => {
        try {
            data.socket.emit('update message', data.messageId, newMessageData);
            data.socket.on('update message', (data) => {
                dispatch(updateMessageInGroupChatRoomDataSuccess(data));
                dispatch(updateMessageInGroupChatRoomSuccess(true));
            });
        } catch (error) {
            dispatch(updateMessageInGroupChatRoomSuccess(false));
            dispatch(updateMessageInGroupChatRoomError(error));
        }
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
        try {
            data.socket.emit('delete message', data.messageId);
            data.socket.on('delete message', (data) => {
                dispatch(deleteMessageInGroupChatRoomDataSuccess(data));
                dispatch(deleteMessageInGroupChatRoomSuccess(true));
            });
        } catch (error) {
            dispatch(deleteMessageInGroupChatRoomSuccess(false));
            dispatch(deleteMessageInGroupChatRoomError(error));
        }
    };
};

/*
*   LEAVE GROUP CHATROOM
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

*/

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