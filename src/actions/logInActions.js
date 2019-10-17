import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

import keys from '../data/key';

export const logInSuccess = bool => {
  return {
    type: keys.LOG_IN_SUCCESS,
    status: bool,
  };
};

export const logInUserDataSuccess = data => {
  return {
    type: keys.LOG_IN_DATA_SUCCESS,
    data: data,
  };
};

export const logInToken = data => {
  return {
    type: keys.LOG_IN_TOKEN,
    token: data,
  };
};

export const logInUser = data => {
  let userData = {
    userEmail: data.userEmail,
    userPassword: data.userPassword,
  };

  return dispatch => {
    axios
      .post(API_URL + '/login', userData)
      .then(res => {
        //console.log('data after logInUser request return data: ', res.data);
        //console.log('data after logInUser request return header: ', res.headers.authentication);
        dispatch(logInUserDataSuccess(res.data));
        dispatch(logInToken(res.headers.authentication));
        dispatch(logInSuccess(true));
      })
      .catch(err => {
        console.log('logInUser errors: ', err);
      });
  };
};
