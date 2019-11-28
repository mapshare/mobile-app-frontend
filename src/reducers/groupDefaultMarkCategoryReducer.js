import keys from '../data/key';

const INITIAL_GROUP_DEFAULT_MARK_CATEGORY_STATE = {
  getGroupDefaultMarkCategoryStatus: false,
  getGroupDefaultMarkCategoryData: [],
  getGroupDefaultMarkCategoryError: '',
  categoriesOptionOnClickStatus: false
};

export const groupDefaultMarkCategoryReducer = (
  state = INITIAL_GROUP_DEFAULT_MARK_CATEGORY_STATE,
  action
) => {
  switch (action.type) {
    // GET GROUP DEFAULT MARK CATEGORY
    case keys.GET_GROUP_DEFAULT_MARK_CATEGORY_SUCCESS:
      return {
        ...state,
        getGroupDefaultMarkCategoryStatus:
          action.getGroupDefaultMarkCategoryStatus
      };
    case keys.GET_GROUP_DEFAULT_MARK_CATEGORY_DATA_SUCCESS:
      return {
        ...state,
        getGroupDefaultMarkCategoryData: action.getGroupDefaultMarkCategoryData
      };
    case keys.GET_GROUP_DEFAULT_MARK_CATEGORY_ERROR:
      return {
        ...state,
        getGroupDefaultMarkCategoryError:
          action.getGroupDefaultMarkCategoryError
      };
    case keys.CATEGORIES_OPTION_ON_CLICK:
      return {
        ...state,
        categoriesOptionOnClickStatus: action.categoriesOptionOnClickStatus
      };
    default:
      return state;
  }
};
