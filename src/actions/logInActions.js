import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

import keys from '../data/key';

import { getGroups, getUserGroups } from './groupActions';
import { Actions, ActionConst } from 'react-native-router-flux';

console.log(API_URL);

export const logInSuccess = bool => {
  return {
    type: keys.LOG_IN_SUCCESS,
    status: bool
  };
};

export const logInUserDataSuccess = data => {
  return {
    type: keys.LOG_IN_DATA_SUCCESS,
    data: data
  };
};

export const logInUserError = data => {
  return {
    type: keys.LOG_IN_ERROR,
    error: data
  };
};

export const logInToken = data => {
  return {
    type: keys.LOG_IN_TOKEN,
    token: data
  };
};

export const logInUser = data => {
  let userData = {
    userEmail: data.userEmail,
    userPassword: data.userPassword
  };

  return async dispatch => {
    try {
      // Display Loading Screen (WIP - WILL IMPLEMENT WITH LOCAL STORAGE SAVING)
      // Actions.loadingScreen({ type: ActionConst.RESET });

      const res = await axios.post(API_URL + '/login', userData);
      // Load all groups on user login
      await dispatch(getUserGroups({ token: res.headers.authentication }));
      await dispatch(getGroups({ token: res.headers.authentication }));
      dispatch(logInUserDataSuccess(res.data));
      dispatch(logInToken(res.headers.authentication));
      dispatch(logInSuccess(true));
    } catch (err) {
      dispatch(logInSuccess(false));
      dispatch(logInUserError(err.response.data));
    }
  };
};
