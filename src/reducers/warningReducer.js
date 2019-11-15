import { createReducer, updateObject } from '../utils/reducer'
import {WARNING_ACTION_MAP} from '../actions/wariningAction'

const getWarningStatisticsDataReducer = (state, { warningStatistics }) => updateObject(state, {
  warningStatistics
})

export default createReducer({
  warningStatistics: {},
 
}, {
  [WARNING_ACTION_MAP.GET_WARNING_STATISTICS_DATA]: getWarningStatisticsDataReducer
})