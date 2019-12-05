import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

import keys from '../data/key';

/* Routes
 *
 * CUSTOM MARK CATEGORY
 * -------------
 * ADD GROUP CUSTOM MARK CATEGORY
 * GET GROUP CUSTOM MARK CATEGORY
 * GET ALL GROUP CUSTOM MARK CATEGORY
 * UPDATE GROUP CUSTOM MARK CATEGORY
 * DELETE GROUP CUSTOM MARK CATEGORY
 *
 */

/*
 *   ADD GROUP CUSTOM MARK CATEGORY
 */
export const addGroupCustomMarkCategorySuccess = bool => {
  return {
    type: keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS,
    addGroupCustomMarkCategoryStatus: bool
  };
};

export const addGroupCustomMarkCategoryDataSuccess = data => {
  return {
    type: keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS,
    addGroupCustomMarkCategoryData: data
  };
};

export const addGroupCustomMarkCategoryError = data => {
  return {
    type: keys.ADD_GROUP_CUSTOM_MARK_CATEGORY_ERROR,
    addGroupCustomMarkCategoryError: data
  };
};

export const addGroupCustomMarkCategory = data => {
  let customMarkCategoryData = {
    customMarkCategoryName: data.customMarkCategoryName,
    categoryColor: data.categoryColor
  };

  return dispatch => {
    axios
      .post(
        API_URL + '/groups/' + data.groupId + '/customCategory',
        customMarkCategoryData,
        { headers: { 'authentication': data.token } }
      )
      .then(res => {
        console.log('add category success! ', res.data);
        dispatch(addGroupCustomMarkCategoryDataSuccess(res.data));
        dispatch(addGroupCustomMarkCategorySuccess(true));
      })
      .catch(err => {
        dispatch(addGroupCustomMarkCategorySuccess(false));
        dispatch(addGroupCustomMarkCategoryError(err.response.data));
      });
  };
};

/*
 *   GET GROUP CUSTOM MARK CATEGORY
 */
export const getGroupCustomMarkCategorySuccess = bool => {
  return {
    type: keys.GET_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS,
    getGroupCustomMarkCategoryStatus: bool
  };
};

export const getGroupCustomMarkCategoryDataSuccess = data => {
  return {
    type: keys.GET_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS,
    getGroupCustomMarkCategoryData: data
  };
};

export const getGroupCustomMarkCategoryError = data => {
  return {
    type: keys.GET_GROUP_CUSTOM_MARK_CATEGORY_ERROR,
    getGroupCustomMarkCategoryError: data
  };
};

export const getGroupCustomMarkCategory = data => {
  return dispatch => {
    axios
      .get(
        API_URL +
          '/groups/' +
          data.groupId +
          '/customCategory/' +
          data.customMarkCategoryId,
        { headers: { 'authentication': data.token } }
      )
      .then(res => {
        dispatch(getGroupCustomMarkCategoryDataSuccess(res.data));
        dispatch(getGroupCustomMarkCategorySuccess(true));
      })
      .catch(err => {
        dispatch(getGroupCustomMarkCategorySuccess(false));
        dispatch(getGroupCustomMarkCategoryError(err.response.data));
      });
  };
};

/*
 *   GET GROUP ALL CUSTOM MARK CATEGORY
 */
export const getGroupAllCustomMarkCategorySuccess = bool => {
  return {
    type: keys.GET_GROUP_ALL_CUSTOM_MARK_CATEGORY_SUCCESS,
    getGroupAllCustomMarkCategoryStatus: bool
  };
};

export const getGroupAllCustomMarkCategoryDataSuccess = data => {
  return {
    type: keys.GET_GROUP_ALL_CUSTOM_MARK_CATEGORY_DATA_SUCCESS,
    getGroupAllCustomMarkCategoryData: data
  };
};

export const getGroupAllCustomMarkCategoryError = data => {
  return {
    type: keys.GET_GROUP_ALL_CUSTOM_MARK_CATEGORY_ERROR,
    getGroupAllCustomMarkCategoryError: data
  };
};

export const getGroupAllCustomMarkCategory = data => {
  const sortCategories = (a, b) => {
    const categoryA = a.customMarkCategoryName.toUpperCase();
    const categoryB = b.customMarkCategoryName.toUpperCase();

    let comparison = 0;
    if (categoryA > categoryB) {
      comparison = 1;
    } else if (categoryA < categoryB) {
      comparison = -1;
    }
    return comparison;
  };

  return dispatch => {
    axios
      .get(API_URL + '/groups/' + data.groupCategoryId + '/customCategory', {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        const data = res.data.groupCustomCategories.sort(sortCategories);
        // console.log('success get all custom category: ', data);
        dispatch(getGroupAllCustomMarkCategoryDataSuccess(data));
        dispatch(getGroupAllCustomMarkCategorySuccess(true));
      })
      .catch(err => {
        // console.log('failed get all custom category: ', err.response.data);
        dispatch(getGroupAllCustomMarkCategorySuccess(false));
        dispatch(getGroupAllCustomMarkCategoryError(err.response.data));
      });
  };
};

/*
 *   UPDATE GROUP CUSTOM MARK CATEGORY
 */
export const updateGroupCustomMarkCategorySuccess = bool => {
  return {
    type: keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS,
    updateGroupCustomMarkCategoryStatus: bool
  };
};

export const updateGroupCustomMarkCategoryDataSuccess = data => {
  return {
    type: keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS,
    updateGroupCustomMarkCategoryData: data
  };
};

export const updateGroupCustomMarkCategoryError = data => {
  return {
    type: keys.UPDATE_GROUP_CUSTOM_MARK_CATEGORY_ERROR,
    updateGroupCustomMarkCategoryError: data
  };
};

export const updateGroupCustomMarkCategory = data => {
  const customMarkCategoryData = {
    customMarkCategoryName: data.customMarkCategoryName,
    categoryColor: data.categoryColor
  };

  return dispatch => {
    axios
      .put(
        API_URL +
          '/groups/' +
          data.groupId +
          '/customCategory/' +
          data.categoryId,
        customMarkCategoryData,
        { headers: { 'authentication': data.token } }
      )
      .then(res => {
        // console.log('update: ', res.data);
        dispatch(updateGroupCustomMarkCategoryDataSuccess(res.data));
        dispatch(updateGroupCustomMarkCategorySuccess(true));
      })
      .catch(err => {
        // console.log('failed: ', err.response.data);
        dispatch(updateGroupCustomMarkCategorySuccess(false));
        dispatch(updateGroupCustomMarkCategoryError(err.response.data));
      });
  };
};

/*
 *   DELETE GROUP CUSTOM MARK CATEGORY
 */
export const deleteGroupCustomMarkCategorySuccess = bool => {
  return {
    type: keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_SUCCESS,
    deleteGroupCustomMarkCategoryStatus: bool
  };
};

export const deleteGroupCustomMarkCategoryDataSuccess = data => {
  return {
    type: keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_DATA_SUCCESS,
    deleteGroupCustomMarkCategoryData: data
  };
};

export const deleteGroupCustomMarkCategoryError = data => {
  return {
    type: keys.DELETE_GROUP_CUSTOM_MARK_CATEGORY_ERROR,
    deleteGroupCustomMarkCategoryError: data
  };
};

export const deleteGroupCustomMarkCategory = data => {
  return dispatch => {
    axios
      .delete(
        API_URL +
          '/groups/' +
          data.groupId +
          '/customCategory/' +
          data.categoryId,
        { headers: { 'authentication': data.token } }
      )
      .then(res => {
        // console.log('success! ', res.data);
        dispatch(deleteGroupCustomMarkCategoryDataSuccess(res.data));
        dispatch(deleteGroupCustomMarkCategorySuccess(true));
      })
      .catch(err => {
        // console.log('failed! ', err.response.data);
        dispatch(deleteGroupCustomMarkCategorySuccess(false));
        dispatch(deleteGroupCustomMarkCategoryError(err.response.data));
      });
  };
};
