//极配曲线
import Taro from "@tarojs/taro"
//utils
import { fetch } from "../utils/fetch"

import { FETCH_URL_MAP } from "../constants/fetchConf"
import { ROUTE_MAP } from "../constants/routeConf"

import {getProductionCurveDateSelector} from '../selectors/productionCurveSeletor'

//极配曲线mock
import ProductionCurveData from '../mock/mockProductionCurveData'

const PRODUCTION_CURVE_MAP ={
  SET_PRODUCTION_CURVE_DATE:'productionCurveAction.setProductionCurveDate',
  GET_PRODUCTION_CURVE_DATA:'productionCurveAction.productionCurveData'
}
//获取极配曲线数据
const getProductionCurveData  = () => async (dispatch) => {
  const productionCurveData = ProductionCurveData;
  dispatch({
    type: PRODUCTION_CURVE_MAP.GET_PRODUCTION_CURVE_DATA,
    productionCurveData
  })
  return true;
}
//设置极配曲线查询日期
const setProductionCurveDate = productionCurveDate => ({
  type: PRODUCTION_CURVE_MAP.SET_PRODUCTION_CURVE_DATE,
  productionCurveDate
});
/**
 * 设置极配曲线查询日期
 * @returns {Function}
 */
const setDate = (e, type) => (dispatch, getState) => {
  const productionCurveDate = getProductionCurveDateSelector(getState());
  let { dateStart, timeStart, dateEnd, timeEnd } = productionCurveDate
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

  const productionCurveDateChange = {
    dateStart, timeStart, dateEnd, timeEnd
  }
  dispatch(setProductionCurveDate(productionCurveDateChange));

};
export {
  PRODUCTION_CURVE_MAP,
  getProductionCurveData,
  setProductionCurveDate,
  setDate
}
