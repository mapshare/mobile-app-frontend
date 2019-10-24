import keys from '../data/key';

const INITIAL_GROUP_POST_STATE = {
    status: false,
};

export const groupPostReducer = (state = INITIAL_GROUP_POST_STATE, action) => {
    switch (action.type) {
        // ADD GROUP POST
        case keys.ADD_GROUP_POST_SUCCESS:
            return { ...state, addGroupPostStatus: action.addGroupPostStatus };
        case keys.ADD_GROUP_POST_DATA_SUCCESS:
            return { ...state, addGroupPostData: action.addGroupPostData };
        case keys.ADD_GROUP_POST_ERROR:
            return { ...state, addGroupPostError: action.addGroupPostError };
        // GET GROUP POST
        case keys.GET_GROUP_POST_SUCCESS:
            return { ...state, getGroupPostStatus: action.getGroupPostStatus };
        case keys.GET_GROUP_POST_DATA_SUCCESS:
            return { ...state, getGroupPostData: action.getGroupPostData };
        case keys.GET_GROUP_POST_ERROR:
            return { ...state, getGroupPostError: action.getGroupPostError };
        // UPDATE GROUP POST
        case keys.UPDATE_GROUP_POST_SUCCESS:
            return { ...state, updateGroupPostStatus: action.updateGroupPostStatus };
        case keys.UPDATE_GROUP_POST_DATA_SUCCESS:
            return { ...state, updateGroupPostData: action.updateGroupPostData };
        case keys.UPDATE_GROUP_POST_ERROR:
            return { ...state, updateGroupPostError: action.updateGroupPostError };
        // DELETE GROUP POST
        case keys.DELETE_GROUP_POST_SUCCESS:
            return { ...state, deleteGroupPostStatus: action.deleteGroupPostStatus };
        case keys.DELETE_GROUP_POST_DATA_SUCCESS:
            return { ...state, deleteGroupPostData: action.deleteGroupPostData };
        case keys.DELETE_GROUP_POST_ERROR:
            return { ...state, deleteGroupPostError: action.deleteGroupPostError };
        default:
            return state;
    }
};
