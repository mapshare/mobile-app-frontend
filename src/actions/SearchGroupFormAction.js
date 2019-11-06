import keys from '../data/key';


export const onSearchFocusSuccess = bool => {
  return {
    type: keys.ON_SEARCH_FOCUS_SUCCESS,
    onSearchFocusStatus: bool,
  };
};


export const onSearchFocus = data => {
  return dispatch => {
        dispatch(onSearchFocusSuccess(data.focus));
  };
};


export const requestClearFieldSuccess = bool => {
  return {
    type: keys.REQUEST_CLEAR_FIELD_SUCCESS,
    requestClearFieldStatus: bool,
  };
};


export const requestClearField = data => {
  return dispatch => {
        dispatch(requestClearFieldSuccess(data));
  };
};

