import keys from '../data/key';

const INITIAL_GROUP_MARK_STATE = {
  addGroupMarkOnClickStatus: false,
  newMarkAddedFlag: false,
  addGroupMarkStatus: false,
  coordinates: [],
  getCurrentOnClickMarkData: {},
  getGroupAllMarksData: [],
  sortGroupMarkData: [],
  getGeocodingLocation: '',
  sortGroupMarkOnClickFlag: false,
  getLocationReviewsData: []
};

export const groupMarkReducer = (state = INITIAL_GROUP_MARK_STATE, action) => {
  switch (action.type) {
    // ADD GROUP MARK
    case keys.NEW_MARK_ADDED:
      return { ...state, newMarkAddedFlag: action.newMarkAddedFlag };
    case keys.ADD_GROUP_MARK_SUCCESS:
      return { ...state, addGroupMarkStatus: action.addGroupMarkStatus };
    case keys.ADD_GROUP_MARK_ONCLICK:
      return {
        ...state,
        addGroupMarkOnClickStatus: action.addGroupMarkOnClick
      };
    case keys.SET_COORDINATES:
      return {
        ...state,
        coordinates: action.coordinates
      };
    case keys.GET_GEOCODING_LOCATION:
      return {
        ...state,
        getGeocodingLocation: action.getGeocodingLocation
      };
    case keys.ADD_GROUP_MARK_DATA_SUCCESS:
      return {
        ...state,
        addGroupMarkData: action.addGroupMarkData
      };
    case keys.ADD_GROUP_MARK_ERROR:
      return { ...state, addGroupMarkError: action.addGroupMarkError };
    // GET GROUP MARK
    case keys.GET_GROUP_MARK_SUCCESS:
      return { ...state, getGroupMarkStatus: action.getGroupMarkStatus };
    case keys.GET_GROUP_MARK_DATA_SUCCESS:
      return { ...state, getGroupMarkData: action.getGroupMarkData };
    case keys.GET_GROUP_MARK_ERROR:
      return { ...state, getGroupMarkError: action.getGroupMarkError };
    case keys.GET_GROUP_ALL_MARKS:
      return { ...state, getGroupAllMarksData: action.getGroupAllMarksData };
    case keys.GET_CURRENT_MARK:
      return {
        ...state,
        getCurrentOnClickMarkData: action.getCurrentOnClickMarkData
      };
    case keys.GET_LOCATION_REVIEWS:
      return {
        ...state,
        getLocationReviewsData: action.getLocationReviewsData
      }
    // UPDATE GROUP MARK
    case keys.UPDATE_GROUP_MARK_SUCCESS:
      return { ...state, updateGroupMarkStatus: action.updateGroupMarkStatus };
    case keys.UPDATE_GROUP_MARK_DATA_SUCCESS:
      return { ...state, updateGroupMarkData: action.updateGroupMarkData };
    case keys.UPDATE_GROUP_MARK_ERROR:
      return { ...state, updateGroupMarkError: action.updateGroupMarkError };
    // DELETE GROUP MARK
    case keys.DELETE_GROUP_MARK_SUCCESS:
      return { ...state, deleteGroupMarkStatus: action.deleteGroupMarkStatus };
    case keys.DELETE_GROUP_MARK_DATA_SUCCESS:
      return { ...state, deleteGroupMarkData: action.deleteGroupMarkData };
    case keys.DELETE_GROUP_MARK_ERROR:
      return { ...state, deleteGroupMarkError: action.deleteGroupMarkError };
    case keys.SORT_GROUP_MARK:
      return { ...state, sortGroupMarkData: action.sortGroupMarkData };
    case keys.SORT_GROUP_MARK_FLAG:
      return {
        ...state,
        sortGroupMarkOnClickFlag: action.sortGroupMarkOnClickFlag
      };
    default:
      return state;
  }
};
