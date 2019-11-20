import keys from '../data/key';


export const currentContentSuccess = bool => {
    return {
        type: keys.CURRENT_CONTENT_SUCCESS,
        currentContentStatus: bool,
    };
};

export const currentContentStateData = data => {
    return {
        type: keys.CURRENT_CONTENT_STATE_DATA,
        currentContentStateData: data,
    };
};


export const setCurrentContentState = data => {
    return dispatch => {
        dispatch(currentContentStateData(data));
        dispatch(currentContentSuccess(true));
    };
};


export const currentEditingGroupStatus = bool => {
    return {
        type: keys.CURRENT_EDITING_GROUP_SUCCESS,
        currentEditingGroupStatus: bool,
    };
};

export const currentEditingGroupData = data => {
    return {
        type: keys.CURRENT_EDITING_GROUP_DATA,
        currentEditingGroupData: data,
    };
};

export const setCurrentEditingGroup = data => {
    return dispatch => {
        dispatch(currentEditingGroupData(data));
        dispatch(currentEditingGroupStatus(true));
    };
};


export const currentEditingGroupMemberSuccess = bool => {
    return {
        type: keys.CURRENT_EDITING_GROUP_MEMBER_SUCCESS,
        currentEditingGroupMemberStatus: bool,
    };
};

export const currentEditingGroupMemberData = data => {
    return {
        type: keys.CURRENT_EDITING_GROUP_MEMBER_DATA,
        currentEditingGroupMemberData: data,
    };
};

export const setCurrentEditingGroupMember = data => {
    return dispatch => {
        dispatch(currentEditingGroupMemberData(data));
        dispatch(currentEditingGroupMemberSuccess(true));
    };
};
