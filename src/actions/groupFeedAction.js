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

export const setGroupFeedData = data => {
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

    return (dispatch, getState) => {
        console.log(CHAT_URL)
        let socket;
        try {
            console.log("Connecting to Group Feed")
            socket = io.connect(CHAT_URL + '/groupFeed:' + newData.groupId);
            if (!socket) throw ("Unable to connect to server");
            dispatch(groupFeedSocket(socket));

            socket.on('connect', () => {
                socket.emit('authenticate', newData)
                    .on('authenticated', (data) => {
                        try {
                            let { groupFeedData } = getState().groupFeedReducer;
                            if (!groupFeedData) {
                                groupFeedData = [];
                            }

                            let index = groupFeedData.findIndex((post) => {
                                return post._id == data._id;
                            });
                            if (index != -1) {
                                groupFeedData[index] = data;
                            } else {
                                if (data) {
                                    groupFeedData.push(data);
                                }
                            }

                            dispatch(setGroupFeedData(groupFeedData));
                            dispatch(groupFeedStatus(true));
                        } catch (error) {
                            console.log(error)
                        }
                    })
                    .on('unauthorized', (msg) => {
                        dispatch(setGroupFeedData([]));
                        dispatch(groupFeedStatus(false));
                    })
                    .on('new post', (data) => {
                        try {
                            let { groupFeedData } = getState().groupFeedReducer;
                            let index = groupFeedData.findIndex((post) => {
                                return post._id == data._id;
                            });
                            if (index != -1) {
                                groupFeedData[index] = data;
                            } else {
                                groupFeedData.unshift(data);
                            }

                            dispatch(setGroupFeedData(groupFeedData));
                            dispatch(groupFeedStatus(true));
                        } catch (error) {
                            console.log(error)
                        }
                    })
                    .on('update post', (data) => {
                        try {
                            let { groupFeedData } = getState().groupFeedReducer;
                            let index = groupFeedData.findIndex((post) => {
                                return post._id == data._id;
                            });
                            if (index != -1) {
                                groupFeedData[index] = data;
                            } else {
                                groupFeedData.unshift(data);
                            }
                            dispatch(setGroupFeedData(groupFeedData));
                            dispatch(groupFeedStatus(true));
                        } catch (error) {
                            console.log(error)
                        }
                    })
                    .on('update feed', (data) => {
                        try {
                            console.log("Feed Updated")
                            let { groupFeedData } = getState().groupFeedReducer;
                            let index = groupFeedData.findIndex((post) => {
                                return post._id == data._id;
                            });
                            if (index != -1) {
                                groupFeedData[index] = data;
                            } else {
                                groupFeedData.unshift(data);
                            }

                            dispatch(setGroupFeedData(groupFeedData));
                            dispatch(groupFeedStatus(true));
                        } catch (error) {
                            console.log(error)
                        }
                    })
                    .on('reset post data', (data) => {
                        dispatch(setGroupFeedData(undefined));
                        dispatch(groupFeedStatus(true));
                    })
                    .on('delete post', (data) => {
                        try {
                            let { groupFeedData } = getState().groupFeedReducer;
                            if (!groupFeedData) {
                                groupFeedData = [];
                            }

                            let index = groupFeedData.findIndex((post) => {
                                return post._id == data._id;
                            });
                            if (index != -1) {
                                groupFeedData[index] = data;
                            } else {
                                if (data) {
                                    groupFeedData.push(data);
                                }
                            }

                            dispatch(setGroupFeedData(groupFeedData));
                            dispatch(groupFeedStatus(true));
                        } catch (error) {
                            console.log(error)
                        }
                    })
                    .on('disconnect', () => {
                        console.log("Disconnect Group Feed")
                        socket.disconnect();
                        // Reconnect
                        dispatch(connectToGroupFeed(data));
                    });
            });
        } catch (error) {
            console.log(error);
            socket.disconnect();
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

export const disconnectGroupFeed = data => {
    return dispatch => {
        try {
            data.groupFeedSocket.disconnect();
            data.groupFeedSocket.removeAllListeners();
            dispatch(disconnectGroupFeedStatus(true));
        } catch (error) {
            console.log(error);
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
        postImage: data.postImage,
        postCaption: data.postCaption,
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
*   UPDATE GROUP FEED
*/
export const updateGroupFeed = data => {
    return dispatch => {
        try {
            data.groupFeedSocket.emit('update feed', 'update');
        } catch (error) {
            console.log(error);
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
    return (dispatch, getState) => {
        try {
            data.groupFeedSocket.emit('delete post', data.postId);
            dispatch(deletePostGroupFeedStatus(true));
        } catch (error) {
            console.log(error)
            dispatch(deletePostGroupFeedStatus(false));
            dispatch(deletePostGroupFeedError(error));
        }
    };
};