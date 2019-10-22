import {combineReducers} from 'redux';
import {logInReducer} from './logInReducer';
import {registerReducer} from './registerReducer';
import {groupReducer} from './groupReducer';
// for future form implementation
// import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  logInReducer,
  registerReducer,
  groupReducer
  //  form: formReducer,
});
