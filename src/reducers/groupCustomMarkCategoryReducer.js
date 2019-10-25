import keys from '../data/key';

const INITIAL_GROUP_CUSTOM_MARK_CATEGORY_STATE = {
    status: false,
};

export const groupCustomMarkCategoryReducer = (state = INITIAL_GROUP_CUSTOM_MARK_CATEGORY_STATE, action) => {
    switch (action.type) {
        // ADD GROUP CUSTOM MARK CATEGORY
        case keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS:
            return { ...state, addGroupCustomMarkCategoryStatus: action.addGroupCustomMarkCategoryStatus };
        case keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS:
            return { ...state, addGroupCustomMarkCategoryData: action.addGroupCustomMarkCategoryData };
        case keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_ERROR:
            return { ...state, addGroupCustomMarkCategoryError: action.addGroupCustomMarkCategoryError };
        // GET GROUP CUSTOM MARK CATEGORY
        case keys.GET_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS:
            return { ...state, getGroupCustomMarkCategoryStatus: action.getGroupCustomMarkCategoryStatus };
        case keys.GET_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS:
            return { ...state, getGroupCustomMarkCategoryData: action.getGroupCustomMarkCategoryData };
        case keys.GET_GROUP_CUSTOM_MARK_CATEGORY_ERROR:
            return { ...state, getGroupCustomMarkCategoryError: action.getGroupCustomMarkCategoryError };
        // UPDATE GROUP CUSTOM MARK CATEGORY
        case keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS:
            return { ...state, updateGroupCustomMarkCategoryStatus: action.updateGroupCustomMarkCategoryStatus };
        case keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS:
            return { ...state, updateGroupCustomMarkCategoryData: action.updateGroupCustomMarkCategoryData };
        case keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_ERROR:
            return { ...state, updateGroupCustomMarkCategoryError: action.updateGroupCustomMarkCategoryError };
        // DELETE GROUP CUSTOM MARK CATEGORY
        case keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS:
            return { ...state, deleteGroupCustomMarkCategoryStatus: action.deleteGroupCustomMarkCategoryStatus };
        case keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS:
            return { ...state, deleteGroupCustomMarkCategoryData: action.deleteGroupCustomMarkCategoryData };
        case keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_ERROR:
            return { ...state, deleteGroupCustomMarkCategoryError: action.deleteGroupCustomMarkCategoryError };
        default:
            return state;
    }
};
