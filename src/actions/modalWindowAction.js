import keys from '../data/key';

export const addMarkModalWindow = bool => {
  return {
    type: keys.ADD_MARK_MODAL_WINDOW,
    addMarkStatus: bool
  };
};

export const clickMarkModalWindow = bool => {
  return {
    type: keys.CLICK_MARK_MODAL_WINDOW,
    onClickMarkStatus: bool
  };
};

export const addCustomMarkModalWindow = bool => {
  return {
    type: keys.ADD_CUSTOM_MARK_MODAL_WINDOW,
    addCustomMarkStatus: bool
  };
};
