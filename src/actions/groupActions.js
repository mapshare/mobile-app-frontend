import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

/* Routes
*
* Create Group
* Search Group        
* ADD GROUP MEMBER
* ADD GROUP MARK
* ADD GROUP EVENT
* JOIN GROUP EVENT
* ADD GROUP CUSTOM MARK CATEGORY
* ADD GROUP POST
* ADD GROUP CHATROOM
* JOIN GROUP CHATROOM
* SEND MESSAGE TO GROUP CHATROOM
* GET GROUP MARK
* GET GROUP EVENT
* GET GROUP CUSTOM MARK CATEGORY
* GET GROUP POST
* GET GROUP CHAT ROOM
* UPDATE GROUP MARK
* UPDATE GROUP EVENT
* UPDATE GROUP CUSTOM MARK CATEGORY
* UPDATE GROUP POST
* UPDATE GROUP CHAT ROOM
* UPDATE MESSAGE IN GROUP CHATROOM
* DELETE MESSAGE IN GROUP CHATROOM
* LEAVE GROUP CHATROOM
* DELETE GROUP CHATROOM
* LEAVE GROUP EVENT
* DELETE GROUP CUSTOM MARK CATEGORY
* DELETE GROUP MARK
* DELETE GROUP EVENT
* DELETE GROUP POST
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
*   ADD GROUP MARK
*/
export const addGroupMarkSuccess = bool => {
    return {
        type: keys.ADD_GROUP_MARK_SUCCESS,
        addGroupMarkStatus: bool,
    };
};

export const addGroupMarkDataSuccess = data => {
    return {
        type: keys.ADD_GROUP_MARK_DATA_SUCCESS,
        addGroupMarkData: data,
    };
};

export const addGroupMarkError = data => {
    return {
        type: keys.ADD_GROUP_MARK_ERROR,
        addGroupMarkError: data,
    };
};

export const addGroupMark = data => {
    let markData = {
        markName: data.markName,
        markLocations: data.markLocations,
        geometry: data.geometry,
        groupMarkCreatedBy: data.groupMarkCreatedBy
    };

    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/mark', markData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(addGroupMarkDataSuccess(res.data));
                dispatch(addGroupMarkSuccess(true));
            })
            .catch(err => {
                dispatch(addGroupMarkSuccess(false));
                dispatch(addGroupMarkError(err.response.data));
            });
    };
};

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
            })
            .catch(err => {
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
*   ADD GROUP CUSTOM MARK CATEGORY
*/
export const addGroupCustomMarkCategorySuccess = bool => {
    return {
        type: keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS,
        addGroupCustomMarkCategoryStatus: bool,
    };
};

export const addGroupCustomMarkCategoryDataSuccess = data => {
    return {
        type: keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS,
        addGroupCustomMarkCategoryData: data,
    };
};

export const addGroupCustomMarkCategoryError = data => {
    return {
        type: keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_ERROR,
        addGroupCustomMarkCategoryError: data,
    };
};

export const addGroupCustomMarkCategory = data => {
    let customMarkCategoryData = {
        customMarkCategoryName: data.customMarkCategoryName,
    };

    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/customCategory', customMarkCategoryData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(addGroupCustomMarkCategoryDataSuccess(res.data));
                dispatch(addGroupCustomMarkCategorySuccess(true));
            })
            .catch(err => {
                dispatch(addGroupCustomMarkCategorySuccess(false));
                dispatch(addGroupCustomMarkCategoryError(err.response.data));
            });
    };
};

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
*   GET GROUP MARK
*/
export const getGroupMarkSuccess = bool => {
    return {
        type: keys.GET_GROUP_MARK_SUCCESS,
        getGroupMarkStatus: bool,
    };
};

export const getGroupMarkDataSuccess = data => {
    return {
        type: keys.GET_GROUP_MARK_DATA_SUCCESS,
        getGroupMarkData: data,
    };
};

export const getGroupMarkError = data => {
    return {
        type: keys.GET_GROUP_MARK_ERROR,
        getGroupMarkError: data,
    };
};

export const getGroupMark = data => {
    return dispatch => {
        axios
            .get(API_URL + '/groups/' + data.groupId + '/mark/' + data.markId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(getGroupMarkDataSuccess(res.data));
                dispatch(getGroupMarkSuccess(true));
            })
            .catch(err => {
                dispatch(getGroupMarkSuccess(false));
                dispatch(getGroupMarkError(err.response.data));
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
*   GET GROUP CUSTOM MARK CATEGORY
*/
export const getGroupCustomMarkCategorySuccess = bool => {
    return {
        type: keys.GET_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS,
        getGroupCustomMarkCategoryStatus: bool,
    };
};

export const getGroupCustomMarkCategoryDataSuccess = data => {
    return {
        type: keys.GET_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS,
        getGroupCustomMarkCategoryData: data,
    };
};

export const getGroupCustomMarkCategoryError = data => {
    return {
        type: keys.GET_GROUP_CUSTOM_MARK_CATEGORY_ERROR,
        getGroupCustomMarkCategoryError: data,
    };
};

export const getGroupCustomMarkCategory = data => {
    return dispatch => {
        axios
            .get(API_URL + '/groups/' + data.groupId + '/customCategory/' + data.customMarkCategoryId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(getGroupCustomMarkCategoryDataSuccess(res.data));
                dispatch(getGroupCustomMarkCategorySuccess(true));
            })
            .catch(err => {
                dispatch(getGroupCustomMarkCategorySuccess(false));
                dispatch(getGroupCustomMarkCategoryError(err.response.data));
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
*   UPDATE GROUP MARK
*/
export const updateGroupMarkSuccess = bool => {
    return {
        type: keys.UPDATE_GROUP_MARK_SUCCESS,
        updateGroupMarkStatus: bool,
    };
};

export const updateGroupMarkDataSuccess = data => {
    return {
        type: keys.UPDATE_GROUP_MARK_DATA_SUCCESS,
        updateGroupMarkData: data,
    };
};

export const updateGroupMarkError = data => {
    return {
        type: keys.UPDATE_GROUP_MARK_ERROR,
        updateGroupMarkError: data,
    };
};

export const updateGroupMark = data => {
    let markData = {
        markName: data.markName,
        markLocations: data.markLocations,
        geometry: data.geometry,
        groupMarkCreatedBy: data.groupMarkCreatedBy
    };

    return dispatch => {
        axios
            .put(API_URL + '/groups/' + data.groupId + '/mark/' + data.markId, markData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(updateGroupMarkDataSuccess(res.data));
                dispatch(updateGroupMarkSuccess(true));
            })
            .catch(err => {
                dispatch(updateGroupMarkSuccess(false));
                dispatch(updateGroupMarkError(err.response.data));
            });
    };
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
*   UPDATE GROUP CUSTOM MARK CATEGORY
*/
export const updateGroupCustomMarkCategorySuccess = bool => {
    return {
        type: keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS,
        updateGroupCustomMarkCategoryStatus: bool,
    };
};

export const updateGroupCustomMarkCategoryDataSuccess = data => {
    return {
        type: keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS,
        updateGroupCustomMarkCategoryData: data,
    };
};

export const updateGroupCustomMarkCategoryError = data => {
    return {
        type: keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_ERROR,
        updateGroupCustomMarkCategoryError: data,
    };
};

export const updateGroupCustomMarkCategory = data => {
    let customMarkCategoryData = {
        customMarkCategoryName: data.customMarkCategoryName,
    };

    return dispatch => {
        axios
            .put(API_URL + '/groups/' + data.groupId + '/customCategory/' + customMarkCategoryId, customMarkCategoryData, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(updateGroupCustomMarkCategoryDataSuccess(res.data));
                dispatch(updateGroupCustomMarkCategorySuccess(true));
            })
            .catch(err => {
                dispatch(updateGroupCustomMarkCategorySuccess(false));
                dispatch(updateGroupCustomMarkCategoryError(err.response.data));
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
*   DELETE GROUP CUSTOM MARK CATEGORY
*/
export const deleteGroupCustomMarkCategorySuccess = bool => {
    return {
        type: keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS,
        deleteGroupCustomMarkCategoryStatus: bool,
    };
};

export const deleteGroupCustomMarkCategoryDataSuccess = data => {
    return {
        type: keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS,
        deleteGroupCustomMarkCategoryData: data,
    };
};

export const deleteGroupCustomMarkCategoryError = data => {
    return {
        type: keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_ERROR,
        deleteGroupCustomMarkCategoryError: data,
    };
};

export const deleteGroupCustomMarkCategory = data => {
    return dispatch => {
        axios
            .delete(API_URL + '/groups/' + data.groupId + '/customCategory/' + customMarkCategoryId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(deleteGroupCustomMarkCategoryDataSuccess(res.data));
                dispatch(deleteGroupCustomMarkCategorySuccess(true));
            })
            .catch(err => {
                dispatch(deleteGroupCustomMarkCategorySuccess(false));
                dispatch(deleteGroupCustomMarkCategoryError(err.response.data));
            });
    };
};

/*
*   DELETE GROUP MARK
*/
export const deleteGroupMarkSuccess = bool => {
    return {
        type: keys.DELETE_GROUP_MARK_SUCCESS,
        deleteGroupMarkStatus: bool,
    };
};

export const deleteGroupMarkDataSuccess = data => {
    return {
        type: keys.DELETE_GROUP_MARK_DATA_SUCCESS,
        deleteGroupMarkData: data,
    };
};

export const deleteGroupMarkError = data => {
    return {
        type: keys.DELETE_GROUP_MARK_ERROR,
        deleteGroupMarkError: data,
    };
};

export const deleteGroupMark = data => {
    return dispatch => {
        axios
            .post(API_URL + '/groups/' + data.groupId + '/mark/' + data.markId, { headers: { 'authentication': data.token } })
            .then(res => {
                dispatch(deleteGroupMarkDataSuccess(res.data));
                dispatch(deleteGroupMarkSuccess(true));
            })
            .catch(err => {
                dispatch(deleteGroupMarkSuccess(false));
                dispatch(deleteGroupMarkError(err.response.data));
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
