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
            return { ...state, searchStatus: action.status };
        case keys.SEARCH_GROUP_DATA_SUCCESS:
            return { ...state, searchData: action.searchData };
        case keys.SEARCH_GROUP_ERROR:
            return { ...state, searchGroupError: action.searchGroupError };
        default:
            return state;
    }
};
