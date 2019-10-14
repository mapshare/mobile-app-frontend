import axios from 'axios';
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

export const logInUser = data => {
  let userData = {
    userEmail: data.userEmail,
    userPassword: data.userPassword,
  };

  return dispatch => {
    axios
      .post(process.env.API_ROUTE + '/login', userData)
      .then(res => {
        console.log('data after logInUser request return: ', res.data);
        dispatch(logInUserDataSuccess(res.data));
        dispatch(logInSuccess(true));
      })
      .catch(err => {
        console.log('logInUser errors: ', err.response);
      });
  };
};
