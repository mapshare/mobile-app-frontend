import axios from 'axios';
import { API_URL, MAPBOX } from 'react-native-dotenv';

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
export const newMarkAdded = bool => {
  return {
    type: keys.NEW_MARK_ADDED,
    newMarkAddedFlag: bool
  };
};

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

export const getGeocodingLocation = data => {
  return {
    type: keys.GET_GEOCODING_LOCATION,
    getGeocodingLocation: data
  };
};

export const geocodingLocation = data => {
  let url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    data[0] +
    '%2C' +
    data[1] +
    '.json?access_token=' +
    MAPBOX;

  return async dispatch => {
    dispatch(setCoordinates(data));

    try {
      const res = await axios.get(url);
      let saveAddress = res.data.features[0].place_name.split(',');
      let parsedAddress =
        saveAddress[0] + ',' + saveAddress[1] + ',' + saveAddress[2];

      dispatch(getGeocodingLocation(parsedAddress));
    } catch (err) {
      console.log('geocoding error: ', err);
    }
  };
};

export const addGroupMark = data => {
  let markData = {
    markName: data.markName,
    markLocations: data.markLocations,
    geometry: data.geometry,
    groupMarkCreatedBy: data.groupMarkCreatedBy
  };

  console.log(markData.markLocations)

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
        // console.log(
        //   'get all marks',
        //   res.data.groupMarks[res.data.groupMarks.length - 1]
        // );
        dispatch(getGroupAllMarksData(res.data.groupMarks));
        dispatch(getGroupMarkSuccess(true));
      })
      .catch(err => {
        console.log('get all marks error: ', err);
        dispatch(getGroupMarkSuccess(false));
        dispatch(getGroupMarkError(err.response.data));
      });
  };
};

export const getGroupMarkById = data => {
  return dispatch => {
    axios
      .get(API_URL + '/groups/' + data.groupId + '/mark/' + data.markId, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        console.log('get mark by id success!')
        dispatch(getGroupMarkDataSuccess(res.data));
        dispatch(getGroupMarkSuccess(true));
      })
      .catch(err => {
        console.log('get mark by id failed!: ', err.response.data)
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
    markLocations: data.locationImageData,
  };

  return dispatch => {
    axios
      .put(
        API_URL + '/groups/' + data.groupId + '/mark/' + data.markId,
        markData,
        { headers: { 'authentication': data.token } }
      )
      .then(res => {
        const getMarkData = {
          groupId: data.groupId,
          token: data.token,
          markId: res.data.updatedMark._id
        }
        console.log('update mark success! ', res.data)
        dispatch(getGroupMarkById(getMarkData));
        dispatch(updateGroupMarkDataSuccess(res.data));
        dispatch(updateGroupMarkSuccess(true));
      })
      .catch(err => {
        console.log('update mark failed: ', err.response.data)
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
      .delete(API_URL + '/groups/' + data.groupId + '/mark/' + data.markId, {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        // console.log('success delete!')
        dispatch(deleteGroupMarkDataSuccess(res.data));
        dispatch(deleteGroupMarkSuccess(true));
      })
      .catch(err => {
        // console.log('failed! error: ', err.response.data)
        dispatch(deleteGroupMarkSuccess(false));
        dispatch(deleteGroupMarkError(err.response.data));
      });
  };
};
