import keys from '../data/key';

const INITIAL_REGISTER_STATE = {
  status: false,
  userData: {},
};

export const registerReducer = (state = INITIAL_REGISTER_STATE, action) => {
  switch (action.type) {
    case keys.REGISTER_SUCCESS:
      return {...state, status: action.status};
    case keys.REGISTER_DATA_SUCCESS:
      return {...state, userData: action.data};
    default:
      return state;
  }
};
