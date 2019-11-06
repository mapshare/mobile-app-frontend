import { combineReducers } from "redux";
import { logInReducer } from "./logInReducer";
import { registerReducer } from "./registerReducer";
import { groupReducer } from "./groupReducer";
import { groupPostReducer } from "./groupPostReducer";
import { groupMarkReducer } from "./groupMarkReducer";
import { groupCustomMarkCategoryReducer } from "./groupCustomMarkCategoryReducer";
import { groupEventReducer } from "./groupEventReducer";
import { groupChatRoomReducer } from "./groupChatRoomReducer";
import { modalWindowReducer } from "./modalWindowReducer";
import { searchGroupFormReducer } from "./SearchGroupFromReducer";
import { addGroupFormReducer } from "./AddGroupFromReducer";
import { groupMenuReducer } from "./GroupMenuReducer";
// for future form implementation
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  logInReducer,
  registerReducer,
  groupReducer,
  groupPostReducer,
  groupMarkReducer,
  groupCustomMarkCategoryReducer,
  groupEventReducer,
  groupChatRoomReducer,
  modalWindowReducer,
  searchGroupFormReducer,
  addGroupFormReducer,
  groupMenuReducer,
  form: formReducer
});
