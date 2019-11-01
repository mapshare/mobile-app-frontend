import keys from "../data/key";

const INITIAL_MODAL_WINDOW_STATE = {
  status: false
};

export const modalWindowReducer = (
  state = INITIAL_MODAL_WINDOW_STATE,
  action
) => {
  switch (action.type) {
    case keys.MODAL_WINDOW:
      return { status: action.status };
    default:
      return state;
  }
};
