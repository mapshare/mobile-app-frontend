import keys from '../data/key';

const ADD_POST_STATE = {
    onAddGroupFormStatus: false,
};

export const addPostReducer = (state = ADD_POST_STATE, action) => {
    switch (action.type) {
        case keys.IMAGE_STATUS:
            return { ...state, imageStatus: action.imageStatus };
        case keys.IMAGE_DATA:
            return { ...state, imageData: action.imageData };
        case keys.CAPTION_STATUS:
            return { ...state, captionStatus: action.captionStatus };
        case keys.CAPTION_DATA:
            return { ...state, captionData: action.captionData };
        default:
            return state;
    }
};
