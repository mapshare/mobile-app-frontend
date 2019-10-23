import keys from '../data/key';

const INITIAL_GROUP_STATE = {
    status: false,
    groupData: {},
    createGroupError: "",
};

export const groupReducer = (state = INITIAL_GROUP_STATE, action) => {
    switch (action.type) {
        // Create Group
        case keys.CREATE_GROUP_SUCCESS:
            return { ...state, status: action.status };
        case keys.CREATE_GROUP_DATA_SUCCESS:
            return { ...state, groupData: action.data };
        case keys.CREATE_GROUP_ERROR:
            return { ...state, createGroupError: action.error };
        // Search Group        
        case keys.SEARCH_GROUP_SUCCESS:
            return { ...state, searchStatus: action.searchStatus };
        case keys.SEARCH_GROUP_DATA_SUCCESS:
            return { ...state, searchData: action.searchData };
        case keys.SEARCH_GROUP_ERROR:
            return { ...state, searchGroupError: action.searchGroupError };
        // ADD GROUP MEMBER
        case keys.ADD_GROUP_MEMBER_SUCCESS:
            return { ...state, addGroupMemberStatus: action.addGroupMemberStatus };
        case keys.ADD_GROUP_MEMBER_DATA_SUCCESS:
            return { ...state, addGroupMemberData: action.addGroupMemberData };
        case keys.ADD_GROUP_MEMBER_ERROR:
            return { ...state, addGroupMemberError: action.addGroupMemberError };
        // ADD GROUP MARK
        case keys.ADD_GROUP_MARK_SUCCESS:
            return { ...state, addGroupMarkStatus: action.addGroupMarkStatus };
        case keys.ADD_GROUP_MARK_DATA_SUCCESS:
            return { ...state, addGroupMarkData: action.addGroupMarkData };
        case keys.ADD_GROUP_MARK_ERROR:
            return { ...state, addGroupMarkError: action.addGroupMarkError };
        // ADD GROUP EVENT
        case keys.ADD_GROUP_EVENT_SUCCESS:
            return { ...state, addGroupEventStatus: action.addGroupEventStatus };
        case keys.ADD_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, addGroupEventData: action.addGroupEventData };
        case keys.ADD_GROUP_EVENT_ERROR:
            return { ...state, addGroupEventError: action.addGroupEventError };
        // JOIN GROUP EVENT
        case keys.JOIN_GROUP_EVENT_SUCCESS:
            return { ...state, joinGroupEventStatus: action.joinGroupEventStatus };
        case keys.JOIN_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, joinGroupEventData: action.joinGroupEventData };
        case keys.JOIN_GROUP_EVENT_ERROR:
            return { ...state, joinGroupEventError: action.joinGroupEventError };
        // ADD GROUP CUSTOM MARK CATEGORY
        case keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS:
            return { ...state, addGroupCustomMarkCategoryStatus: action.addGroupCustomMarkCategoryStatus };
        case keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS:
            return { ...state, addGroupCustomMarkCategoryData: action.addGroupCustomMarkCategoryData };
        case keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_ERROR:
            return { ...state, addGroupCustomMarkCategoryError: action.addGroupCustomMarkCategoryError };
        // ADD GROUP POST
        case keys.ADD_GROUP_POST_SUCCESS:
            return { ...state, addGroupPostStatus: action.addGroupPostStatus };
        case keys.ADD_GROUP_POST_DATA_SUCCESS:
            return { ...state, addGroupPostData: action.addGroupPostData };
        case keys.ADD_GROUP_POST_ERROR:
            return { ...state, addGroupPostError: action.addGroupPostError };
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
        // GET GROUP MARK
        case keys.GET_GROUP_MARK_SUCCESS:
            return { ...state, getGroupMarkStatus: action.getGroupMarkStatus };
        case keys.GET_GROUP_MARK_DATA_SUCCESS:
            return { ...state, getGroupMarkData: action.getGroupMarkData };
        case keys.GET_GROUP_MARK_ERROR:
            return { ...state, getGroupMarkError: action.getGroupMarkError };
        // GET GROUP EVENT
        case keys.GET_GROUP_EVENT_SUCCESS:
            return { ...state, getGroupEventStatus: action.getGroupEventStatus };
        case keys.GET_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, getGroupEventData: action.getGroupEventData };
        case keys.GET_GROUP_EVENT_ERROR:
            return { ...state, getGroupEventError: action.getGroupEventError };
        // GET GROUP CUSTOM MARK CATEGORY
        case keys.GET_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS:
            return { ...state, getGroupCustomMarkCategoryStatus: action.getGroupCustomMarkCategoryStatus };
        case keys.GET_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS:
            return { ...state, getGroupCustomMarkCategoryData: action.getGroupCustomMarkCategoryData };
        case keys.GET_GROUP_CUSTOM_MARK_CATEGORY_ERROR:
            return { ...state, getGroupCustomMarkCategoryError: action.getGroupCustomMarkCategoryError };
        // GET GROUP POST
        case keys.GET_GROUP_POST_SUCCESS:
            return { ...state, getGroupPostStatus: action.getGroupPostStatus };
        case keys.GET_GROUP_POST_DATA_SUCCESS:
            return { ...state, getGroupPostData: action.getGroupPostData };
        case keys.GET_GROUP_POST_ERROR:
            return { ...state, getGroupPostError: action.getGroupPostError };
        // GET GROUP CHAT ROOM
        case keys.GET_GROUP_CHAT_ROOM_SUCCESS:
            return { ...state, getGroupChatRoomStatus: action.getGroupChatRoomStatus };
        case keys.GET_GROUP_CHAT_ROOM_DATA_SUCCESS:
            return { ...state, getGroupChatRoomData: action.getGroupChatRoomData };
        case keys.GET_GROUP_CHAT_ROOM_ERROR:
            return { ...state, getGroupChatRoomError: action.getGroupChatRoomError };
        // UPDATE GROUP MARK
        case keys.UPDATE_GROUP_MARK_SUCCESS:
            return { ...state, updateGroupMarkStatus: action.updateGroupMarkStatus };
        case keys.UPDATE_GROUP_MARK_DATA_SUCCESS:
            return { ...state, updateGroupMarkData: action.updateGroupMarkData };
        case keys.UPDATE_GROUP_MARK_ERROR:
            return { ...state, updateGroupMarkError: action.updateGroupMarkError };
        // UPDATE GROUP EVENT
        case keys.UPDATE_GROUP_EVENT_SUCCESS:
            return { ...state, updateGroupEventStatus: action.updateGroupEventStatus };
        case keys.UPDATE_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, updateGroupEventData: action.updateGroupEventData };
        case keys.UPDATE_GROUP_EVENT_ERROR:
            return { ...state, updateGroupEventError: action.updateGroupEventError };
        // UPDATE GROUP CUSTOM MARK CATEGORY
        case keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS:
            return { ...state, updateGroupCustomMarkCategoryStatus: action.updateGroupCustomMarkCategoryStatus };
        case keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS:
            return { ...state, updateGroupCustomMarkCategoryData: action.updateGroupCustomMarkCategoryData };
        case keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_ERROR:
            return { ...state, updateGroupCustomMarkCategoryError: action.updateGroupCustomMarkCategoryError };
        // UPDATE GROUP POST
        case keys.UPDATE_GROUP_POST_SUCCESS:
            return { ...state, updateGroupPostStatus: action.updateGroupPostStatus };
        case keys.UPDATE_GROUP_POST_DATA_SUCCESS:
            return { ...state, updateGroupPostData: action.updateGroupPostData };
        case keys.UPDATE_GROUP_POST_ERROR:
            return { ...state, updateGroupPostError: action.updateGroupPostError };
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
        // LEAVE GROUP EVENT
        case keys.LEAVE_GROUP_EVENT_SUCCESS:
            return { ...state, leaveGroupEventStatus: action.leaveGroupEventStatus };
        case keys.LEAVE_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, leaveGroupEventData: action.leaveGroupEventData };
        case keys.LEAVE_GROUP_EVENT_ERROR:
            return { ...state, leaveGroupEventError: action.leaveGroupEventError };
        // DELETE GROUP CUSTOM MARK CATEGORY
        case keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS:
            return { ...state, deleteGroupCustomMarkCategoryStatus: action.deleteGroupCustomMarkCategoryStatus };
        case keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS:
            return { ...state, deleteGroupCustomMarkCategoryData: action.deleteGroupCustomMarkCategoryData };
        case keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_ERROR:
            return { ...state, deleteGroupCustomMarkCategoryError: action.deleteGroupCustomMarkCategoryError };
        // DELETE GROUP MARK
        case keys.DELETE_GROUP_MARK_SUCCESS:
            return { ...state, deleteGroupMarkStatus: action.deleteGroupMarkStatus };
        case keys.DELETE_GROUP_MARK_DATA_SUCCESS:
            return { ...state, deleteGroupMarkData: action.deleteGroupMarkData };
        case keys.DELETE_GROUP_MARK_ERROR:
            return { ...state, deleteGroupMarkError: action.deleteGroupMarkError };
        // DELETE GROUP EVENT
        case keys.DELETE_GROUP_EVENT_SUCCESS:
            return { ...state, deleteGroupEventStatus: action.deleteGroupEventStatus };
        case keys.DELETE_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, deleteGroupEventData: action.deleteGroupEventData };
        case keys.DELETE_GROUP_EVENT_ERROR:
            return { ...state, deleteGroupEventError: action.deleteGroupEventError };
        // DELETE GROUP POST
        case keys.DELETE_GROUP_POST_SUCCESS:
            return { ...state, deleteGroupPostStatus: action.deleteGroupPostStatus };
        case keys.DELETE_GROUP_POST_DATA_SUCCESS:
            return { ...state, deleteGroupPostData: action.deleteGroupPostData };
        case keys.DELETE_GROUP_POST_ERROR:
            return { ...state, deleteGroupPostError: action.deleteGroupPostError };
        // LEAVE GROUP
        case keys.LEAVE_GROUP_SUCCESS:
            return { ...state, leaveGroupStatus: action.leaveGroupStatus };
        case keys.LEAVE_GROUP_DATA_SUCCESS:
            return { ...state, leaveGroupData: action.leaveGroupData };
        case keys.LEAVE_GROUP_ERROR:
            return { ...state, leaveGroupError: action.leaveGroupError };
        // DELETE GROUP
        case keys.DELETE_GROUP_SUCCESS:
            return { ...state, deleteGroupStatus: action.deleteGroupStatus };
        case keys.DELETE_GROUP_DATA_SUCCESS:
            return { ...state, deleteGroupData: action.deleteGroupData };
        case keys.DELETE_GROUP_ERROR:
            return { ...state, deleteGroupError: action.deleteGroupError };
        default:
            return state;
    }
};
