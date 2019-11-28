import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

import keys from '../data/key';

/* Routes
 *
 * DEFAULT MARK CATEGORY
 * -------------
 * GET GROUP DEFAULT MARK CATEGORY
 *
 */

/*
 *   GET GROUP DEFAULT MARK CATEGORY
 */
export const getGroupDefaultMarkCategorySuccess = bool => {
  return {
    type: keys.GET_GROUP_DEFAULT_MARK_CATEGORY_SUCCESS,
    getGroupDefaultMarkCategoryStatus: bool
  };
};

export const getGroupDefaultMarkCategoryDataSuccess = data => {
  return {
    type: keys.GET_GROUP_DEFAULT_MARK_CATEGORY_DATA_SUCCESS,
    getGroupDefaultMarkCategoryData: data
  };
};

export const getGroupDefaultMarkCategoryError = data => {
  return {
    type: keys.GET_GROUP_DEFAULT_MARK_CATEGORY_ERROR,
    getGroupDefaultMarkCategoryError: data
  };
};

export const getGroupDefaultMarkCategory = data => {
  const sortCategories = (a, b) => {
    const categoryA = a.defaultCategoryName.toUpperCase();
    const categoryB = b.defaultCategoryName.toUpperCase();

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
      .get(API_URL + '/defaultCategory', {
        headers: { 'authentication': data.token }
      })
      .then(res => {
        const data = res.data.sort(sortCategories);

        dispatch(getGroupDefaultMarkCategoryDataSuccess(data));
        dispatch(getGroupDefaultMarkCategorySuccess(true));
      })
      .catch(err => {
        dispatch(getGroupDefaultMarkCategorySuccess(false));
        dispatch(getGroupDefaultMarkCategoryError(err.response.data));
      });
  };
};

export const categoriesOptionOnClick = bool => {
  return {
    type: keys.CATEGORIES_OPTION_ON_CLICK,
    categoriesOptionOnClickStatus: bool
  };
};

export const categoryOptionType = data => {
  return {
    type: keys.CATEGORY_OPTION_TYPE,
    categoryOptionTypeData: data
  };
};
