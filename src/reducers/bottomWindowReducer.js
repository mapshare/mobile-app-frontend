import keys from "../data/key";

const INITIAL_BOTTOM_WINDOW_STATE = {
  reviewWindowStatus: false,
};

export const bottomWindowReducer = (
  state = INITIAL_BOTTOM_WINDOW_STATE,
  action
) => {
  switch (action.type) {
    case keys.REVIEW_BOTTOM_WINDOW:
      return { ...state, reviewWindowStatus: action.reviewWindowStatus };
    default:
      return state;
  }
};
