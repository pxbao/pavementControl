import Taro from "@tarojs/taro"
//utils
import { fetch } from "../utils/fetch"

import { FETCH_URL_MAP } from "../constants/fetchConf"
import { ROUTE_MAP } from "../constants/routeConf"

import WarningStatistics from '../mock/mockWarningStatistics'

const WARNING_ACTION_MAP ={
  GET_WARNING_STATISTICS_DATA:'warningAction.getWarningStatisticsData'
}

//获取预警统计
const getWarningStatisticsData =() =>async(dispatch) =>{
  const warningStatistics = WarningStatistics;
  dispatch({
    type: WARNING_ACTION_MAP.GET_WARNING_STATISTICS_DATA,
    warningStatistics
  })
  return true;
}

export {
  WARNING_ACTION_MAP,
  getWarningStatisticsData
}