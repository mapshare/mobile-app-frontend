import keys from '../data/key';

const INITIAL_LOG_IN_STATE = {
  status: false,
  userData: {},
};

export const logInReducer = (state = INITIAL_LOG_IN_STATE, action) => {
  switch (action.type) {
    case keys.LOG_IN_SUCCESS:
      return {...state, status: action.status};
    case keys.LOG_IN_DATA_SUCCESS:
      return {...state, userData: action.data};
      case keys.LOG_IN_ERROR:
        return {...state, logInError: action.error};
    case keys.LOG_IN_TOKEN:
      return {...state, token: action.token};
    default:
      return state;
  }
};
