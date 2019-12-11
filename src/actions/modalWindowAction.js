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

export const deleteLocationModalWindow = data => {
  return {
    type: keys.DELETE_LOCATION_MODAL_WINDOW,
    deleteLocation: {
      ...data,
      status: data.status,
    }
  };
};

export const addCustomMarkModalWindow = bool => {
  return {
    type: keys.ADD_CUSTOM_MARK_MODAL_WINDOW,
    addCustomMarkStatus: bool
  };
};

export const customMarkOptionModalWindow = bool => {
  return {
    type: keys.CUSTOM_MARK_OPTION_MODAL_WINDOW,
    customMarkOptionStatus: bool
  };
};

export const isModalWindow = bool => {
  return {
    type: keys.IS_MODAL_WINDOW,
    isModalWindowStatus: bool
  };
};
