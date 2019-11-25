import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

import keys from '../data/key';

/* Routes
 *
 * MARK
 * ----
 * ADD GROUP MARK
 * GET GROUP MARK
 * UPDATE GROUP MARK
 * DELETE GROUP MARK
 *
 */

/*
 *   ADD GROUP MARK
 */
export const addGroupMarkSuccess = bool => {
  return {
    type: keys.ADD_GROUP_MARK_SUCCESS,
    addGroupMarkStatus: bool
  };
};

export const addGroupMarkOnClick = bool => {
  return {
    type: keys.ADD_GROUP_MARK_ONCLICK,
    addGroupMarkOnClick: bool
  };
};

export const addGroupMarkDataSuccess = data => {
  return {
    type: keys.ADD_GROUP_MARK_DATA_SUCCESS,
    addGroupMarkData: data
  };
};

export const addGroupMarkError = data => {
  return {
    type: keys.ADD_GROUP_MARK_ERROR,
    addGroupMarkError: data
  };
};

export const setCoordinates = data => {
  return {
    type: keys.SET_COORDINATES,
    coordinates: data
  };
};

export const addGroupMark = data => {
  let markData = {
    markName: data.markName,
    markLocations: data.markLocations,
    geometry: data.geometry,
    groupMarkCreatedBy: data.groupMarkCreatedBy
  };

  console.log('call add action!');

  return dispatch => {
    axios
      .post(API_URL + '/groups/' + data.groupId + '/mark', markData, {
        headers: { authentication: data.token }
      })
      .then(res => {
        console.log('success add!');
        dispatch(addGroupMarkDataSuccess(res.data));
        dispatch(addGroupMarkSuccess(true));
      })
      .catch(err => {
        dispatch(addGroupMarkSuccess(false));
        dispatch(addGroupMarkError(err.response.data));
      });
  };
};

/*
 *   GET GROUP MARK
 */
export const getGroupMarkSuccess = bool => {
  return {
    type: keys.GET_GROUP_MARK_SUCCESS,
    getGroupMarkStatus: bool
  };
};

export const getGroupMarkDataSuccess = data => {
  return {
    type: keys.GET_GROUP_MARK_DATA_SUCCESS,
    getGroupMarkData: data
  };
};

export const getGroupMarkError = data => {
  return {
    type: keys.GET_GROUP_MARK_ERROR,
    getGroupMarkError: data
  };
};

export const getGroupAllMarksData = data => {
  return {
    type: keys.GET_GROUP_ALL_MARKS,
    getGroupAllMarksData: data
  };
};

export const getCurrentOnClickMark = data => {
  return {
    type: keys.GET_CURRENT_MARK,
    getCurrentOnClickMarkData: data
  };
};

export const getGroupAllMarks = data => {
  return dispatch => {
    axios
      .get(API_URL + '/groups/groupMarks/' + data.groupMarkId, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        // console.log('get all marks', res.data);
        dispatch(getGroupAllMarksData(res.data.groupMarks));
        dispatch(getGroupMarkSuccess(true));
      })
      .catch(err => {
        dispatch(getGroupMarkSuccess(false));
        dispatch(getGroupMarkError(err.response.data));
      });
  };
};

export const getGroupMark = data => {
  return dispatch => {
    axios
      .get(API_URL + '/groups/' + data.groupId + '/mark/' + data.markId, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(getGroupMarkDataSuccess(res.data));
        dispatch(getGroupMarkSuccess(true));
      })
      .catch(err => {
        dispatch(getGroupMarkSuccess(false));
        dispatch(getGroupMarkError(err.response.data));
      });
  };
};

/*
 *   UPDATE GROUP MARK
 */
export const updateGroupMarkSuccess = bool => {
  return {
    type: keys.UPDATE_GROUP_MARK_SUCCESS,
    updateGroupMarkStatus: bool
  };
};

export const updateGroupMarkDataSuccess = data => {
  return {
    type: keys.UPDATE_GROUP_MARK_DATA_SUCCESS,
    updateGroupMarkData: data
  };
};

export const updateGroupMarkError = data => {
  return {
    type: keys.UPDATE_GROUP_MARK_ERROR,
    updateGroupMarkError: data
  };
};

export const updateGroupMark = data => {
  let markData = {
    markName: data.markName,
    markLocations: data.markLocations,
    geometry: data.geometry,
    groupMarkCreatedBy: data.groupMarkCreatedBy
  };

  return dispatch => {
    axios
      .put(
        API_URL + '/groups/' + data.groupId + '/mark/' + data.markId,
        markData,
        { headers: { 'authentication': data.token } }
      )
      .then(res => {
        dispatch(updateGroupMarkDataSuccess(res.data));
        dispatch(updateGroupMarkSuccess(true));
      })
      .catch(err => {
        dispatch(updateGroupMarkSuccess(false));
        dispatch(updateGroupMarkError(err.response.data));
      });
  };
};

/*
 *   DELETE GROUP MARK
 */
export const deleteGroupMarkSuccess = bool => {
  return {
    type: keys.DELETE_GROUP_MARK_SUCCESS,
    deleteGroupMarkStatus: bool
  };
};

export const deleteGroupMarkDataSuccess = data => {
  return {
    type: keys.DELETE_GROUP_MARK_DATA_SUCCESS,
    deleteGroupMarkData: data
  };
};

export const deleteGroupMarkError = data => {
  return {
    type: keys.DELETE_GROUP_MARK_ERROR,
    deleteGroupMarkError: data
  };
};

export const deleteGroupMark = data => {
  return dispatch => {
    axios
      .post(API_URL + '/groups/' + data.groupId + '/mark/' + data.markId, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        dispatch(deleteGroupMarkDataSuccess(res.data));
        dispatch(deleteGroupMarkSuccess(true));
      })
      .catch(err => {
        dispatch(deleteGroupMarkSuccess(false));
        dispatch(deleteGroupMarkError(err.response.data));
      });
  };
};
