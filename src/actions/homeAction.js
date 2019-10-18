import Taro from "@tarojs/taro"
//utils
import {fetch} from "../utils/fetch"

import {FETCH_URL_MAP} from "../constants/fetchConf"
import {ROUTE_MAP} from "../constants/routeConf"
import HomeData from '../mock/mockHomeData'

const HOME_ACTION_MAP = {
  GET_HOME_DATA: 'homeAction.getHomeData'
}

const getHomeData = () => async(dispatch) => {
  const homeData = HomeData;
  dispatch({
    type:HOME_ACTION_MAP.GET_HOME_DATA,
    homeData
  });
  return true;
}
export {
  HOME_ACTION_MAP,
  getHomeData
}
