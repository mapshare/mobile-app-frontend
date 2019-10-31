import keys from "../data/key";

const INITIAL_GROUP_STATE = {
  status: false,
  groupData: {},
  createGroupError: ""
};

export const groupEventReducer = (state = INITIAL_GROUP_STATE, action) => {
    switch (action.type) {
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
        // GET GROUP EVENT
        case keys.GET_GROUP_EVENT_SUCCESS:
            return { ...state, getGroupEventStatus: action.getGroupEventStatus };
        case keys.GET_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, getGroupEventData: action.getGroupEventData };
        case keys.GET_GROUP_EVENT_ERROR:
            return { ...state, getGroupEventError: action.getGroupEventError };
        // UPDATE GROUP EVENT
        case keys.UPDATE_GROUP_EVENT_SUCCESS:
            return { ...state, updateGroupEventStatus: action.updateGroupEventStatus };
        case keys.UPDATE_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, updateGroupEventData: action.updateGroupEventData };
        case keys.UPDATE_GROUP_EVENT_ERROR:
            return { ...state, updateGroupEventError: action.updateGroupEventError };
        // LEAVE GROUP EVENT
        case keys.LEAVE_GROUP_EVENT_SUCCESS:
            return { ...state, leaveGroupEventStatus: action.leaveGroupEventStatus };
        case keys.LEAVE_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, leaveGroupEventData: action.leaveGroupEventData };
        case keys.LEAVE_GROUP_EVENT_ERROR:
            return { ...state, leaveGroupEventError: action.leaveGroupEventError };
        // DELETE GROUP EVENT
        case keys.DELETE_GROUP_EVENT_SUCCESS:
            return { ...state, deleteGroupEventStatus: action.deleteGroupEventStatus };
        case keys.DELETE_GROUP_EVENT_DATA_SUCCESS:
            return { ...state, deleteGroupEventData: action.deleteGroupEventData };
        case keys.DELETE_GROUP_EVENT_ERROR:
            return { ...state, deleteGroupEventError: action.deleteGroupEventError };
        default:
            return state;
    }
};
