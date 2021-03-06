import keys from '../data/key';

const INITIAL_GROUP_CHAT_ROOM_STATE = {
    chatLogData: { data: [] },
    activeMembersData: [],
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
        // CONNECT TO GROUP CHAT
        case keys.CONNECT_TO_GROUP_CHAT_SUCCESS:
            return { ...state, connectToGroupChatStatus: action.connectToGroupChatStatus };
        case keys.CONNECT_TO_GROUP_CHAT_DATA_SUCCESS:
            try {
                if (state.socket)
                    state.socket.disconnect();
                return { ...state, socket: action.socket };
            } catch (error) {
                return { ...state, socket: action.socket };
            }
        case keys.CHAT_LOG_DATA:
            return { ...state, chatLogData: action.chatLogData };
        case keys.ACTIVE_MEMBERS_DATA:
            return { ...state, activeMembersData: action.activeMembersData };
        case keys.NEW_MESSAGE_STATUS:
            return { ...state, getNewMessageStatus: action.getNewMessageStatus };
        case keys.NEW_MESSAGE_DATA:
            return { ...state, newMessageData: action.newMessageData };
        case keys.CONNECT_TO_GROUP_CHAT_ERROR:
            return { ...state, addGroupChatRoomError: action.connectToGroupChatError };
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
        // GET ACTIVE GROUP CHAT ROOM
        case keys.GET_ACTIVE_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, getActiveGroupChatRoomStatus: action.getActiveGroupChatRoomStatus };
        case keys.GET_ACTIVE_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, getActiveGroupChatRoomData: action.getActiveGroupChatRoomData };
        case keys.GET_ACTIVE_GROUP_CHAT_ROOM_ERROR:
            return { ...state, getActiveGroupChatRoomError: action.getActiveGroupChatRoomError };
        // SEARCH GROUP CHAT ROOM
        case keys.SEARCH_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, searchGroupChatRoomStatus: action.searchGroupChatRoomStatus };
        case keys.SEARCH_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, searchGroupChatRoomData: action.searchGroupChatRoomData };
        case keys.SEARCH_GROUP_CHAT_ROOM_ERROR:
            return { ...state, searchGroupChatRoomError: action.searchGroupChatRoomError };
        // DISCONNECT GROUP CHAT ROOM
        case keys.DISCONECT_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, disconnectGroupChatRoomStatus: action.disconnectGroupChatRoomStatus };
        case keys.DISCONECT_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, disconnectGroupChatRoomData: action.disconnectGroupChatRoomData };
        case keys.DISCONECT_GROUP_CHAT_ROOM_ERROR:
            return { ...state, disconnectGroupChatRoomError: action.disconnectGroupChatRoomError };
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
