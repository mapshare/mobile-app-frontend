import keys from '../data/key';

const INITIAL_GROUP_CHAT_ROOM_STATE = {
    status: false,
};

export const groupChatRoomReducer = (state = INITIAL_GROUP_CHAT_ROOM_STATE, action) => {
    switch (action.type) {
        // ADD GROUP CHATROOM
        case keys.ADD_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, addGroupChatRoomStatus: action.addGroupChatRoomStatus };
        case keys.ADD_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, addGroupChatRoomData: action.addGroupChatRoomData };
        case keys.ADD_GROUP_CHAT_ROOM_ERROR:
            return { ...state, addGroupChatRoomError: action.addGroupChatRoomError };
        // JOIN GROUP CHATROOM
        case keys.JOIN_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, joinGroupChatRoomStatus: action.joinGroupChatRoomStatus };
        case keys.JOIN_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, joinGroupChatRoomData: action.joinGroupChatRoomData };
        case keys.JOIN_GROUP_CHAT_ROOM_ERROR:
            return { ...state, joinGroupChatRoomError: action.joinGroupChatRoomError };
        // SEND MESSAGE TO GROUP CHATROOM
        case keys.SEND_MESSAGE_TO_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, sendMessageToGroupChatRoomStatus: action.sendMessageToGroupChatRoomStatus };
        case keys.SEND_MESSAGE_TO_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, sendMessageToGroupChatRoomData: action.sendMessageToGroupChatRoomData };
        case keys.SEND_MESSAGE_TO_GROUP_CHAT_ROOM_ERROR:
            return { ...state, sendMessageToGroupChatRoomError: action.sendMessageToGroupChatRoomError };
        // GET GROUP CHAT ROOM
        case keys.GET_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, getGroupChatRoomStatus: action.getGroupChatRoomStatus };
        case keys.GET_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, getGroupChatRoomData: action.getGroupChatRoomData };
        case keys.GET_GROUP_CHAT_ROOM_ERROR:
            return { ...state, getGroupChatRoomError: action.getGroupChatRoomError };
        // UPDATE GROUP CHAT ROOM
        case keys.UPDATE_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, updateGroupChatRoomStatus: action.updateGroupChatRoomStatus };
        case keys.UPDATE_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, updateGroupChatRoomData: action.updateGroupChatRoomData };
        case keys.UPDATE_GROUP_CHAT_ROOM_ERROR:
            return { ...state, updateGroupChatRoomError: action.updateGroupChatRoomError };
        // UPDATE MESSAGE IN GROUP CHATROOM
        case keys.UPDATE_MESSAGE_IN_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, updateMessageInGroupChatRoomStatus: action.updateMessageInGroupChatRoomStatus };
        case keys.UPDATE_MESSAGE_IN_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, updateMessageInGroupChatRoomData: action.updateMessageInGroupChatRoomData };
        case keys.UPDATE_MESSAGE_IN_GROUP_CHAT_ROOM_ERROR:
            return { ...state, updateMessageInGroupChatRoomError: action.updateMessageInGroupChatRoomError };
        // DELETE MESSAGE IN GROUP CHATROOM
        case keys.DELETE_MESSAGE_IN_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, deleteMessageInGroupChatRoomStatus: action.deleteMessageInGroupChatRoomStatus };
        case keys.DELETE_MESSAGE_IN_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, deleteMessageInGroupChatRoomData: action.deleteMessageInGroupChatRoomData };
        case keys.DELETE_MESSAGE_IN_GROUP_CHAT_ROOM_ERROR:
            return { ...state, deleteMessageInGroupChatRoomError: action.deleteMessageInGroupChatRoomError };
        // LEAVE GROUP CHATROOM
        case keys.LEAVE_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, leaveGroupChatRoomStatus: action.leaveGroupChatRoomStatus };
        case keys.LEAVE_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, leaveGroupChatRoomData: action.leaveGroupChatRoomData };
        case keys.LEAVE_GROUP_CHAT_ROOM_ERROR:
            return { ...state, leaveGroupChatRoomError: action.leaveGroupChatRoomError };
        // DELETE GROUP CHATROOM
        case keys.DELETE_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, deleteGroupChatRoomStatus: action.deleteGroupChatRoomStatus };
        case keys.DELETE_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, deleteGroupChatRoomData: action.deleteGroupChatRoomData };
        case keys.DELETE_GROUP_CHAT_ROOM_ERROR:
            return { ...state, deleteGroupChatRoomError: action.deleteGroupChatRoomError };
        default:
            return state;
    }
};
