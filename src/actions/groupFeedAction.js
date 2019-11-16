import axios from 'axios';
import { API_URL, CHAT_URL } from 'react-native-dotenv'

import io from 'socket.io-client';
import keys from '../data/key';

/*
*   CONNECT TO GROUP FEED
*/
export const groupFeedStatus = bool => {
    return {
        type: keys.GROUP_FEED_STATUS,
        groupFeedStatus: bool,
    };
};

export const groupFeedSocket = data => {

    return {
        type: keys.GROUP_FEED_SOCKET,
        groupFeedSocket: data,
    };
};

export const groupFeedData = data => {
    return {
        type: keys.GROUP_FEED_DATA,
        groupFeedData: data,
    };
};

export const groupFeedError = data => {
    return {
        type: keys.GROUP_FEED_ERROR,
        groupFeedError: data,
    };
};

export const connectToGroupFeed = data => {

    const newData = {
        token: data.token,
        groupId: data.groupId,
    }

    return dispatch => {
        try {
            console.log("Connecting to Group Feed")
            const socket = io.connect(CHAT_URL + '/groupFeed:' + newData.groupId);
            if (!socket) throw ("Unable to connect to server");
            dispatch(groupFeedSocket(socket));

            socket.on('connect', () => {
                socket.emit('authenticate', newData)
                    .on('authenticated', (data) => {
                        dispatch(groupFeedData(data));
                        dispatch(groupFeedStatus(true));
                    })
                    .on('unauthorized', (msg) => {
                        throw ("Unauthorized to connect to server: " + JSON.stringify(msg));
                    })
                    .on('new post', (data) => {
                        dispatch(groupFeedData(data));
                        dispatch(groupFeedStatus(true));
                    })
                    .on('update post', (data) => {
                        dispatch(groupFeedData(data));
                        dispatch(groupFeedStatus(true));
                    })
                    .on('delete message', (data) => {
                        dispatch(groupFeedData(data));
                        dispatch(groupFeedStatus(true));
                    });
            });
        } catch (error) {
            console.log(error);
            dispatch(groupFeedStatus(false));
            dispatch(groupFeedError(error));
        }
    }
};

/*
*   SEND POST TO GROUP FEED
*/
export const sendPostToGroupFeedStatus = bool => {
    return {
        type: keys.SEND_POST_TO_GROUP_FEED_STATUS,
        sendPostToGroupFeedStatus: bool,
    };
};

export const sendPostToGroupFeedError = data => {
    return {
        type: keys.SEND_POST_TO_GROUP_FEED_ERROR,
        sendPostToGroupFeedError: data,
    };
};

export const sendPostToGroupFeed = data => {
    const newData = {
        postImage: data.postImage,
        postCaption: data.postCaption,
    }
    return dispatch => {
        try {
            data.groupFeedSocket.emit('new post', newData);
            dispatch(sendPostToGroupFeedStatus(true));
        } catch (error) {
            console.log(error)
            dispatch(sendPostToGroupFeedStatus(false));
            dispatch(sendPostToGroupFeedError(error));
        }
    };
};

/*
*   DISCONNECT GROUP FEED
*/
export const disconnectGroupFeedStatus = bool => {
    return {
        type: keys.DISCONECT_GROUP_FEED_STATUS,
        disconnectGroupFeedStatus: bool,
    };
};

export const disconnectGroupFeedError = data => {
    return {
        type: keys.DISCONECT_GROUP_FEED_ERROR,
        disconnectGroupFeedError: data,
    };
};

export const disconnectGroupChatRoom = data => {
    return dispatch => {
        try {
            data.groupFeedSocket.emit('disconnect', true);
            data.groupFeedSocket.removeAllListeners();
            dispatch(disconnectGroupFeedStatus(true));
        } catch (error) {
            dispatch(disconnectGroupFeedStatus(false));
            dispatch(disconnectGroupFeedError(error));
        }
    };
};

/*
*   UPDATE POST IN GROUP FEED
*/
export const updatePostInGroupFeedStatus = bool => {
    return {
        type: keys.UPDATE_POST_IN_GROUP_FEED_STATUS,
        updatePostInGroupFeedStatus: bool,
    };
};
export const updatePostInGroupFeedError = data => {
    return {
        type: keys.UPDATE_POST_IN_GROUP_FEED_ERROR,
        updatePostInGroupFeedError: data,
    };
};

export const updatePostInGroupFeed = data => {
    const newPostData = {
        postContent: data.postContent
    }

    return dispatch => {
        try {
            data.groupFeedSocket.emit('update post', data.postId, newPostData);
            dispatch(updatePostInGroupFeedStatus(true));
        } catch (error) {
            dispatch(updatePostInGroupFeedStatus(false));
            dispatch(updatePostInGroupFeedError(error));
        }
    };
};

/*
*   DELETE MESSAGE IN GROUP FEED
*/
export const deletePostGroupFeedStatus = bool => {
    return {
        type: keys.DELETE_POST_GROUP_FEED_STATUS,
        deletePostGroupFeedStatus: bool,
    };
};

export const deletePostGroupFeedError = data => {
    return {
        type: keys.DELETE_POST_GROUP_FEED_ERROR,
        deletePostGroupFeedError: data,
    };
};

export const deletePostGroupFeed = data => {
    return dispatch => {
        try {
            data.groupFeedSocket.emit('delete message', data.postId);
            dispatch(deletePostGroupFeedStatus(true));
        } catch (error) {
            dispatch(deletePostGroupFeedStatus(false));
            dispatch(deletePostGroupFeedError(error));
        }
    };
};