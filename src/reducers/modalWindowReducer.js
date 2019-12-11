import keys from '../data/key';

const INITIAL_MODAL_WINDOW_STATE = {
  addMarkStatus: false,
  onClickMarkStatus: false,
  deleteLocation: {},
  addCustomMarkStatus: false,
  customMarkOptionStatus: false,
  isModalWindowStatus: false
};

export const modalWindowReducer = (
  state = INITIAL_MODAL_WINDOW_STATE,
  action
) => {
  switch (action.type) {
    case keys.ADD_CUSTOM_MARK_MODAL_WINDOW:
      return { ...state, addCustomMarkStatus: action.addCustomMarkStatus };
    case keys.ADD_MARK_MODAL_WINDOW:
      return { ...state, addMarkStatus: action.addMarkStatus };
    case keys.CLICK_MARK_MODAL_WINDOW:
      return { ...state, onClickMarkStatus: action.onClickMarkStatus };
    case keys.DELETE_LOCATION_MODAL_WINDOW:
      return { ...state, deleteLocation: action.deleteLocation }
    case keys.CUSTOM_MARK_OPTION_MODAL_WINDOW:
      return {
        ...state,
        customMarkOptionStatus: action.customMarkOptionStatus
      };
    case keys.IS_MODAL_WINDOW:
      return {
        ...state,
        isModalWindowStatus: action.isModalWindowStatus
      }
    default:
      return state;
  }
};
