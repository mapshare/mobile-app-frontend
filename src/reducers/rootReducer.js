import {combineReducers} from 'redux';
// for future form implementation
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  form: formReducer,
});
