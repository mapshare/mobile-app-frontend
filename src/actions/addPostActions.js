import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

/*
*   SET CAPTION
*/
export const captionStatus = bool => {
    return {
        type: keys.CAPTION_STATUS,
        captionStatus: bool,
    };
};

export const captionData = data => {
    return {
        type: keys.CAPTION_DATA,
        captionData: data,
    };
};

export const setCaption = data => {
    return dispatch => {
        dispatch(captionData(data));
        dispatch(captionStatus(true));
    };
};

/*
*   SET IMAGE
*/
export const imageStatus = bool => {
    return {
        type: keys.IMAGE_STATUS,
        imageStatus: bool,
    };
};

export const imageData = data => {
    return {
        type: keys.IMAGE_DATA,
        imageData: data,
    };
};

export const setImage = data => {
    return dispatch => {
        dispatch(imageData(data));
        dispatch(imageStatus(true));
    };
};