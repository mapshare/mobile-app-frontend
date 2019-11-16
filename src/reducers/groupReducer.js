import keys from '../data/key';

const INITIAL_GROUP_STATE = {
    status: false,
    getActiveGroupStatus: false,
    getUserGroupsStatus: false,
    groupExistsStatus: true,
    getUserGroupsData: "",
    getActiveGroupError: "",
    getGroupMemberData: {
        _id: ""
    },
    loadingData: false,
    getGroupsData: "",
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
        // GET ALL GROUPS FOR LOCAL SEARCH     
        case keys.GET_GROUPS_SUCCESS:
            return { ...state, getGroupsSuccess: action.getGroupsSuccess };
        case keys.GET_GROUPS_DATA_SUCCESS:
            return { ...state, getGroupsData: action.getGroupsData };
        case keys.GET_GROUPS_ERROR:
            return { ...state, getGroupsError: action.getGroupsError };
        // GET GROUPS THAT A USER IS A MEMBER
        case keys.GET_USER_GROUP_SUCCESS:
            return { ...state, getUserGroupsStatus: action.getUserGroupsStatus };
        case keys.GET_USER_GROUP_DATA_SUCCESS:
            return { ...state, getUserGroupsData: action.getUserGroupsData };
        case keys.GET_USER_GROUP_ERROR:
            return { ...state, getUserGroupsError: action.getUserGroupsError };
        // GET ACTIVE GROUP
        case keys.GET_ACTIVE_GROUP_SUCCESS:
            return { ...state, getActiveGroupStatus: action.getActiveGroupStatus };
        case keys.GET_ACTIVE_GROUP_DATA_SUCCESS:
            return { ...state, getActiveGroupData: action.getActiveGroupData };
        case keys.GET_ACTIVE_GROUP_ERROR:
            return { ...state, getActiveGroupError: action.getActiveGroupError };
        // Loading Data
        case keys.LOADING_DATA:
            return { ...state, loadingData: action.loadingData };
        //  CHECK IF GROUP EXISTS
        case keys.GROUP_EXISTS_SUCCESS:
            return { ...state, groupExistsStatus: action.groupExistsStatus };
        // ADD GROUP MEMBER
        case keys.ADD_GROUP_MEMBER_SUCCESS:
            return { ...state, addGroupMemberStatus: action.addGroupMemberStatus };
        case keys.ADD_GROUP_MEMBER_DATA_SUCCESS:
            return { ...state, addGroupMemberData: action.addGroupMemberData };
        case keys.ADD_GROUP_MEMBER_ERROR:
            return { ...state, addGroupMemberError: action.addGroupMemberError };
        // UPDATE GROUP MEMBER
        case keys.UPDATE_GROUP_MEMBER_SUCCESS:
            return { ...state, updateGroupMemberStatus: action.updateGroupMemberStatus };
        case keys.UPDATE_GROUP_MEMBER_DATA_SUCCESS:
            return { ...state, updateGroupMemberData: action.updateGroupMemberData };
        case keys.UPDATE_GROUP_MEMBER_ERROR:
            return { ...state, updateGroupMemberError: action.updateGroupMemberError };
        // REQUEST TO JOIN GROUP
        case keys.REQUEST_TO_JOIN_GROUP_SUCCESS:
            return { ...state, getRequestToJoinGroupStatus: action.getRequestToJoinGroupStatus };
        case keys.REQUEST_TO_JOIN_GROUP_DATA_SUCCESS:
            return { ...state, getRequestToJoinGroupData: action.getRequestToJoinGroupData };
        case keys.REQUEST_TO_JOIN_GROUP_ERROR:
            return { ...state, getRequestToJoinGroupError: action.getRequestToJoinGroupError };
        // REVIEW JOIN GROUP REQUESTS
        case keys.REQUEST_TO_JOIN_GROUP_SUCCESS:
            return { ...state, getReviewJoinGroupRequestsStatus: action.getReviewJoinGroupRequestsStatus };
        case keys.REQUEST_TO_JOIN_GROUP_DATA_SUCCESS:
            return { ...state, getReviewJoinGroupRequestsData: action.getReviewJoinGroupRequestsData };
        case keys.REQUEST_TO_JOIN_GROUP_ERROR:
            return { ...state, getReviewJoinGroupRequestsError: action.getReviewJoinGroupRequestsError };
        // GET ALL JOIN GROUP REQUESTS
        case keys.GET_ALL_JOIN_GROUP_REQUESTS_SUCCESS:
            return { ...state, getAllJoinGroupRequestsStatus: action.getAllJoinGroupRequestsStatus };
        case keys.GET_ALL_JOIN_GROUP_REQUESTS_DATA_SUCCESS:
            return { ...state, getAllJoinGroupRequestsData: action.getAllJoinGroupRequestsData };
        case keys.GET_ALL_JOIN_GROUP_REQUESTS_ERROR:
            return { ...state, getAllJoinGroupRequestsError: action.getAllJoinGroupRequestsError };
        // GET GROUP MEMBER
        case keys.GET_GROUP_MEMBER_SUCCESS:
            return { ...state, getGroupMemberStatus: action.getGroupMemberStatus };
        case keys.GET_GROUP_MEMBER_DATA_SUCCESS:
            return { ...state, getGroupMemberData: action.getGroupMemberData };
        case keys.GET_GROUP_MEMBER_ERROR:
            return { ...state, getGroupMemberError: action.getGroupMemberError };
        // GET ALL GROUP MEMBER
        case keys.GET_ALL_GROUP_MEMBER_SUCCESS:
            return { ...state, getAllGroupMemberStatus: action.getAllGroupMemberStatus };
        case keys.GET_ALL_GROUP_MEMBER_DATA_SUCCESS:
            return { ...state, getAllGroupMemberData: action.getAllGroupMemberData };
        case keys.GET_ALL_GROUP_MEMBER_ERROR:
            return { ...state, getAllGroupMemberError: action.getAllGroupMemberError };
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
