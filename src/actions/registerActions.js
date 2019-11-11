import axios from "axios";
import { API_URL } from "react-native-dotenv";

import keys from "../data/key";

export const registerSuccess = bool => {
  return {
    type: keys.REGISTER_SUCCESS,
    status: bool
  };
};

export const registerUserDataSuccess = data => {
  return {
    type: keys.REGISTER_DATA_SUCCESS,
    data: data
  };
};

export const registerUserError = data => {
  console.log(data);
  return {
    type: keys.REGISTER_ERROR,
    error: data
  };
};

export const registerUser = data => {
  let userData = {
    userEmail: data.userEmail,
    userFirstName: data.userFirstName,
    userLastName: data.userLastName,
    userPassword: data.userPassword
  };

  return dispatch => {
    axios
      .post(API_URL + "/register", userData)
      .then(res => {
        console.log("data after registerUser request return: ", res.data);
        dispatch(registerUserDataSuccess(res.data));
        dispatch(registerSuccess(true));
      })
      .catch(err => {
        console.log("registerUser errors: ", err.response.data);
        dispatch(registerUserError(err.response.data));
        dispatch(registerSuccess(false));
      });
  };
};
