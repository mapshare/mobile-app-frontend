import keys from "../data/key";

const INITIAL_BOTTOM_WINDOW_STATE = {
  reviewWindow: {},
};

export const bottomWindowReducer = (
  state = INITIAL_BOTTOM_WINDOW_STATE,
  action
) => {
  switch (action.type) {
    case keys.REVIEW_BOTTOM_WINDOW:
      return { ...state, reviewWindow: action.reviewWindow };
    default:
      return state;
  }
};
