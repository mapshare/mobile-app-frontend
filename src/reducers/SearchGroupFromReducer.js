import keys from "../data/key";

const SEARCH_GROUP_FORM_STATE = {
  onSearchFocusStatus: false,
  requestClearFieldStatus: false
};

export const searchGroupFormReducer = (
  state = SEARCH_GROUP_FORM_STATE,
  action
) => {
  switch (action.type) {
    case keys.ON_SEARCH_FOCUS_SUCCESS:
      return { ...state, onSearchFocusStatus: action.onSearchFocusStatus };
    case keys.REQUEST_CLEAR_FIELD_SUCCESS:
      return {
        ...state,
        requestClearFieldStatus: action.requestClearFieldStatus
      };
    default:
      return state;
  }
};
