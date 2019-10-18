import { createReducer, updateObject } from '../utils/reducer'
import {HOME_ACTION_MAP} from '../actions/homeAction'

const getHomeDataReducer = (state,{homeData}) => updateObject(state,{
  homeData
})
export default createReducer({
  homeData:{
    
  }
},{
  [HOME_ACTION_MAP.GET_HOME_DATA]:getHomeDataReducer
})