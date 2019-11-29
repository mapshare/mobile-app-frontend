import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

import keys from '../data/key';

import { getGroups, getUserGroups, getActiveGroupNoLoadingScreen } from './groupActions';
import { Actions, ActionConst } from 'react-native-router-flux';

import { AsyncStorage } from "react-native";
import SplashScreen from 'react-native-splash-screen'

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
      Actions.loadingScreen({ type: ActionConst.RESET });

      const res = await axios.post(API_URL + '/login', userData);
      // Load all groups on user login
      await dispatch(getUserGroups({ token: res.headers.authentication }));
      await dispatch(getGroups({ token: res.headers.authentication }));

      dispatch(logInUserDataSuccess(res.data));
      dispatch(logInToken(res.headers.authentication));
      dispatch(logInSuccess(true));

      AsyncStorage.setItem('token', res.headers.authentication);

      Actions.initial({ type: ActionConst.RESET });
    } catch (err) {
      dispatch(logInSuccess(false));
      dispatch(logInUserError(err.response.data));
    }
  };
};


export const logInUserWithToken = data => {
  return async dispatch => {
    try {

      let token = await AsyncStorage.getItem('token');
      let lastActiveGroupId = await AsyncStorage.getItem('lastActiveGroupId');

      if (token) {
        Actions.loadingScreen({ type: ActionConst.RESET });
        SplashScreen.hide();
        // get User Data
        const res = await axios.get(API_URL + '/loginWithToken', { headers: { 'authentication': token } });

        // Load all groups on user login
        await dispatch(getUserGroups({ token: token }));
        await dispatch(getGroups({ token: token }));

        dispatch(logInUserDataSuccess(res.data));
        dispatch(logInToken(token));
        dispatch(logInSuccess(true));

        // get last active group
        if (lastActiveGroupId) {
          await dispatch(getActiveGroupNoLoadingScreen({ token: token, groupId: lastActiveGroupId }));
          Actions.navTab({ type: ActionConst.RESET });
        } else {
          Actions.initial({ type: ActionConst.RESET });
        }
      } else {
        SplashScreen.hide();
      }
    } catch (err) {
      AsyncStorage.setItem('token', "");
      Actions.Auth({ type: ActionConst.RESET });
      dispatch(logInSuccess(false));
      dispatch(logInUserError(err.response.data));
    }
  };
};