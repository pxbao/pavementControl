import Taro from "@tarojs/taro"
//utils
import {fetch} from "../utils/fetch"

import {FETCH_URL_MAP} from "../constants/fetchConf"
import {ROUTE_MAP} from "../constants/routeConf"

import {gettProductionDataDateSelector} from '../selectors/productionDataSelector'

//标段mock
import BidSection from '../mock/mockBidSection'

const PRODUCTION_DATA_ACTION_MAP = {
  GET_BIDSECTION:'productionDataAction.getBidSection',
  GET_PRODUCTION_DATA:'productionDataAction.getProductionData',
  SET_PRODUCTION_DATA_DATE:'productionDataAction.setProductionDataDateAction'
}
//获取标段信息
const getBidSection = () => async(dispatch) =>{
  const bidSection = BidSection
  dispatch({
    type:PRODUCTION_DATA_ACTION_MAP.GET_BIDSECTION,
    bidSection
  })
  return true;
}
//获取生产数据信息
const getProductionData = () => async(dispatch) =>{
  const productionData={};
  dispatch({
    type:PRODUCTION_ACTION_MAP.GET_PRODUCTION_DATA,
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
const setDateStart = (e,type) => (dispatch, getState) => {
  switch(type){
    case 1:
      break;
  }
  const productionDataDate = gettProductionDataDateSelector(getState());
  const {timeStart,dateEnd,timeEnd} = productionDataDate
  const dateStart =e.detail.value
  const productionDataDateChange = {
    dateStart,timeStart,dateEnd,timeEnd
  }
  dispatch(setProductionDataDateAction(productionDataDateChange));
};

export{
  PRODUCTION_DATA_ACTION_MAP,
  getBidSection,
  getProductionData,
  setProductionDataDateAction,
  setDateStart
}