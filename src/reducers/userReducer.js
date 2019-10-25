import keys from '../data/key';

const INITIAL_USER_STATE = {
  status: false,
};

export const userReducer = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
    // GET USER
    case keys.GET_USER_SUCCESS:
      return {...state, getUserStatus: action.getUserStatus};
    case keys.GET_USER_DATA_SUCCESS:
      return {...state, getUserData: action.getUserData};
    case keys.GET_USER_ERROR:
      return {...state, getUserError: action.getUserError};
    // UPDATE USER
    case keys.UPDATE_USER_SUCCESS:
      return {...state, updateUserStatus: action.updateUserStatus};
    case keys.UPDATE_USER_DATA_SUCCESS:
      return {...state, updateUserData: action.updateUserData};
    case keys.UPDATE_USER_ERROR:
      return {...state, updateUserError: action.updateUserError};
    // DELETE USER
    case keys.DELETE_USER_SUCCESS:
        return {...state, deleteUserStatus: action.deleteUserStatus};
      case keys.DELETE_USER_DATA_SUCCESS:
        return {...state, deleteUserData: action.deleteUserData};
      case keys.DELETE_USER_ERROR:
        return {...state, deleteUserError: action.deleteUserError};
    default:
      return state;
  }
};
