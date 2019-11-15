import Taro from "@tarojs/taro"
//utils
import { fetch } from "../utils/fetch"

import { FETCH_URL_MAP } from "../constants/fetchConf"
import { ROUTE_MAP } from "../constants/routeConf"

import { getProductionDataDateSelector } from '../selectors/productionDataSelector'

//标段mock
import BidSection from '../mock/mockBidSection'
//生产数据mock
import ProductionData from '../mock/mockProductionData'
//用料详情mock
import ProductionDataDetails from '../mock/mockProductionDataDetails'

const PRODUCTION_DATA_ACTION_MAP = {
  GET_BIDSECTION: 'productionDataAction.getBidSection',
  GET_PRODUCTION_DATA: 'productionDataAction.getProductionData',
  SET_PRODUCTION_DATA_DATE: 'productionDataAction.setProductionDataDateAction',
  GET_PRODUCTION_DATA_DETAILS: 'productionDataAction.getProductionDataDetails'
}
//获取标段信息
const getBidSection = () => async (dispatch) => {
  const bidSection = BidSection
  dispatch({
    type: PRODUCTION_DATA_ACTION_MAP.GET_BIDSECTION,
    bidSection
  })
  return true;
}
//获取生产数据信息
const getProductionData = () => async (dispatch) => {
  const productionData = ProductionData;
  dispatch({
    type: PRODUCTION_DATA_ACTION_MAP.GET_PRODUCTION_DATA,
    productionData
  })
  return true;
}
//设置生产数据查询日期
const setProductionDataDateAction = productionDataDate => ({
  type: PRODUCTION_DATA_ACTION_MAP.SET_PRODUCTION_DATA_DATE,
  productionDataDate
});
/**
 * 设置生产数据查询开始日期
 * @returns {Function}
 */
const setDate = (e, type) => (dispatch, getState) => {
  const productionDataDate = getProductionDataDateSelector(getState());
  let { dateStart, timeStart, dateEnd, timeEnd } = productionDataDate
  switch (type) {
    case 1:
      dateStart = e.detail.value
      break;
    case 2:
      timeStart = e.detail.value
      break
    case 3:
      dateEnd = e.detail.value
      break
    case 4:
      timeEnd = e.detail.value
      break
  }

  const productionDataDateChange = {
    dateStart, timeStart, dateEnd, timeEnd
  }
  dispatch(setProductionDataDateAction(productionDataDateChange));

};
const getProductionDataDetails = () => async (dispatch) => {
  const productionDataDetails = ProductionDataDetails
  dispatch({
    type: PRODUCTION_DATA_ACTION_MAP.GET_PRODUCTION_DATA_DETAILS,
    productionDataDetails
  })
  return true;
}
export {
  PRODUCTION_DATA_ACTION_MAP,
  getBidSection,
  getProductionData,
  setProductionDataDateAction,
  setDate,
  getProductionDataDetails
}