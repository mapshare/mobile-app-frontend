import keys from '../data/key';

const ADD_GROUP_FORM_STATE = {
    onAddGroupFormStatus: false,
};

export const addGroupFormReducer = (state = ADD_GROUP_FORM_STATE, action) => {
    switch (action.type) {
        case keys.ON_ADD_GROUP_FORM_SUCCESS:
            return { ...state, onAddGroupFormStatus: action.onAddGroupFormStatus };
        default:
            return state;
    }
};
