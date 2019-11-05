import keys from '../data/key';


export const addGroupFormSuccess = bool => {
  return {
    type: keys.ON_ADD_GROUP_FORM_SUCCESS,
    onAddGroupFormStatus: bool,
  };
};


export const addGroupSuccess = data => {
  return dispatch => {
        dispatch(addGroupFormSuccess(data.success));
  };
};
