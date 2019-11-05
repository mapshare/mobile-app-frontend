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


export const currentEditingGroupIdSuccess = bool => {
    return {
        type: keys.CURRENT_EDITING_GROUP_ID_SUCCESS,
        currentEditingGroupIdStatus: bool,
    };
};

export const currentEditingGroupIdData = data => {
    return {
        type: keys.CURRENT_EDITING_GROUP_ID_DATA,
        currentEditingGroupIdData: data,
    };
};


export const setCurrentEditingGroupId = data => {
    return dispatch => {
        dispatch(currentEditingGroupIdData(data));
        dispatch(currentEditingGroupIdSuccess(true));
    };
};
