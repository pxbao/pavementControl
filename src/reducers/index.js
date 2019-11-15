import { combineReducers } from 'redux'
import user from './userReducer'
import home from './homeReducer'
import productiondata from './productionDataReducer'
import productioncurve from './productionCurveReducer'
import warning from './warningReducer'

export default combineReducers({
  user,
  home,
  productiondata,
  productioncurve,
  warning
});
