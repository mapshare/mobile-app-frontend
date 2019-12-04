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