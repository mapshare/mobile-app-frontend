import axios from 'axios';
import Config from 'react-native-config';

import keys from '../data/key';

export const registerSuccess = bool => {
  return {
    type: keys.REGISTER_SUCCESS,
    status: bool,
  };
};

export const registerUserDataSuccess = data => {
  return {
    type: keys.REGISTER_DATA_SUCCESS,
    data: data,
  };
};

export const registerUser = data => {
  let userData = {
    userEmail: data.userEmail,
    userFirstName: data.userFirstName,
    userLastName: data.userLastName,
    userPassword: data.userPassword,
  };

  return dispatch => {
    axios
      .post(Config.API_ROUTE + '/register', userData)
      .then(res => {
        console.log('data after registerUser request return: ', res.data);
        dispatch(registerUserDataSuccess(res.data));
        dispatch(registerSuccess(true));
      })
      .catch(err => {
        console.log('registerUser errors: ', err.response);
      });
  };
};
