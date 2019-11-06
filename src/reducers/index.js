import { combineReducers } from 'redux'
import user from './userReducer'
import home from './homeReducer'
import productiondata from './productionDataReducer'

export default combineReducers({
  user,
  home,
  productiondata
});
