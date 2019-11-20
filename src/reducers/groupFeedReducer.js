import keys from "../data/key";

const INITIAL_GROUP_FEED_STATE = {
    groupFeedStatus: false,
    sendPostToGroupFeedStatus: false,
    disconnectGroupFeedStatus: false,
    updatePostInGroupFeedStatus: false,
    deletePostGroupFeedStatus: false,
};

export const groupFeedReducer = (state = INITIAL_GROUP_FEED_STATE, action) => {
    switch (action.type) {
        case keys.GROUP_FEED_STATUS:
            return { ...state, groupFeedStatus: action.groupFeedStatus };
        case keys.GROUP_FEED_SOCKET:
            try {
                if (state.groupFeedSocket)
                    state.groupFeedSocket.disconnect();
                return { ...state, groupFeedSocket: action.groupFeedSocket };
            } catch (error) {
                return { ...state, groupFeedSocket: action.groupFeedSocket };
            }
        case keys.GROUP_FEED_DATA:
            return { ...state, groupFeedData: action.groupFeedData };
        case keys.GROUP_FEED_ERROR:
            return { ...state, groupFeedError: action.groupFeedError };
        case keys.SEND_POST_TO_GROUP_FEED_STATUS:
            return { ...state, sendPostToGroupFeedStatus: action.sendPostToGroupFeedStatus };
        case keys.SEND_POST_TO_GROUP_FEED_ERROR:
            return { ...state, sendPostToGroupFeedError: action.sendPostToGroupFeedError };
        case keys.DISCONECT_GROUP_FEED_STATUS:
            return { ...state, disconnectGroupFeedStatus: action.disconnectGroupFeedStatus };
        case keys.DISCONECT_GROUP_FEED_ERROR:
            return { ...state, disconnectGroupFeedError: action.disconnectGroupFeedError };
        case keys.UPDATE_POST_IN_GROUP_FEED_STATUS:
            return { ...state, updatePostInGroupFeedStatus: action.updatePostInGroupFeedStatus };
        case keys.UPDATE_POST_IN_GROUP_FEED_ERROR:
            return { ...state, updatePostInGroupFeedError: action.updatePostInGroupFeedError };
        case keys.DELETE_POST_GROUP_FEED_STATUS:
            return { ...state, deletePostGroupFeedStatus: action.deletePostGroupFeedStatus };
        case keys.DELETE_POST_GROUP_FEED_ERROR:
            return { ...state, deletePostGroupFeedError: action.deletePostGroupFeedError };
        default:
            return state;
    }
};
