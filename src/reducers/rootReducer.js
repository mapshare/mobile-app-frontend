import {combineReducers} from 'redux';
import {logInReducer} from './logInReducer';
import {registerReducer} from './registerReducer';
// for future form implementation
// import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  logInReducer,
  registerReducer,
  //  form: formReducer,
});
