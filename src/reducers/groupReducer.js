import keys from '../data/key';

const INITIAL_GROUP_STATE = {
    status: false,
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
        // GET GROUP
        case keys.GET_ACTIVE_GROUP_SUCCESS:
            return { ...state, getActiveGroupStatus: action.getActiveGroupStatus };
        case keys.GET_ACTIVE_GROUP_DATA_SUCCESS:
            return { ...state, getActiveGroupData: action.getActiveGroupData };
        case keys.GET_ACTIVE_GROUP_ERROR:
            return { ...state, getActiveGroupError: action.getActiveGroupError };
        // ADD GROUP MEMBER
        case keys.ADD_GROUP_MEMBER_SUCCESS:
            return { ...state, addGroupMemberStatus: action.addGroupMemberStatus };
        case keys.ADD_GROUP_MEMBER_DATA_SUCCESS:
            return { ...state, addGroupMemberData: action.addGroupMemberData };
        case keys.ADD_GROUP_MEMBER_ERROR:
            return { ...state, addGroupMemberError: action.addGroupMemberError };
        // GET GROUP MEMBER
        case keys.GET_GROUP_MEMBER_SUCCESS:
            return { ...state, getGroupMemberStatus: action.getGroupMemberStatus };
        case keys.GET_GROUP_MEMBER_DATA_SUCCESS:
            return { ...state, getGroupMemberData: action.getGroupMemberData };
        case keys.GET_GROUP_MEMBER_ERROR:
            return { ...state, getGroupMemberError: action.getGroupMemberError };
        // UPDATE GROUP
        case keys.UPDATE_GROUP_SUCCESS:
            return { ...state, updateGroupStatus: action.updateGroupStatus };
        case keys.UPDATE_GROUP_DATA_SUCCESS:
            return { ...state, updateGroupData: action.updateGroupData };
        case keys.UPDATE_GROUP_ERROR:
            return { ...state, updateGroupError: action.updateGroupError };
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
