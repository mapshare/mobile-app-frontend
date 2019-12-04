import keys from "../data/key";

const INITIAL_MODAL_WINDOW_STATE = {
  addMarkStatus: false,
  onClickMarkStatus: false,
  deleteLocation: {}
};

export const modalWindowReducer = (
  state = INITIAL_MODAL_WINDOW_STATE,
  action
) => {
  switch (action.type) {
    case keys.ADD_MARK_MODAL_WINDOW:
      return { ...state, addMarkStatus: action.addMarkStatus };
    case keys.CLICK_MARK_MODAL_WINDOW:
      return { ...state, onClickMarkStatus: action.onClickMarkStatus };
    case keys.DELETE_LOCATION_MODAL_WINDOW:
      return { ...state, deleteLocation: action.deleteLocation }
    default:
      return state;
  }
};
