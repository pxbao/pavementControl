import { combineReducers } from 'redux'
import user from './userReducer';
import home from './homeReducer'

export default combineReducers({
  user,
  home
});
