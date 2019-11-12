import keys from '../data/key';

const CURRENT_CONTENT_STATE = {
    currentContentStateData: 1,
};

export const groupMenuReducer = (state = CURRENT_CONTENT_STATE, action) => {
    switch (action.type) {
        case keys.CURRENT_CONTENT_STATE_DATA:
            return { ...state, currentContentStateData: action.currentContentStateData };
        case keys.CURRENT_CONTENT_SUCCESS:
            return { ...state, currentContentStatus: action.currentContentStatus };
        case keys.CURRENT_EDITING_GROUP_ID_SUCCESS:
            return { ...state, currentEditingGroupIdStatus: action.currentEditingGroupIdStatus };
        case keys.CURRENT_EDITING_GROUP_ID_DATA:
            return { ...state, currentEditingGroupIdData: action.currentEditingGroupIdData };
        case keys.CURRENT_EDITING_GROUP_MEMBER_SUCCESS:
            return { ...state, currentEditingGroupMemberStatus: action.currentEditingGroupMemberStatus };
        case keys.CURRENT_EDITING_GROUP_MEMBER_DATA:
            return { ...state, currentEditingGroupMemberData: action.currentEditingGroupMemberData };
        default:
            return state;
    }
};
