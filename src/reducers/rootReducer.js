import {combineReducers} from 'redux';
import {loginReducer} from './logInReducer';
import {registerReducer} from './registerReducer';
// for future form implementation
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  form: formReducer,
});
