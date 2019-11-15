import { createReducer, updateObject } from '../utils/reducer'
import { PRODUCTION_CURVE_MAP } from '../actions/productionCurveAction'
import { getNowDateByFormat, getDateBefor } from '../utils/TimeUtils';

const getProductionCurveDataReducer = (state, { productionCurveData }) => updateObject(state, {
  productionCurveData
})
const setProductionCurveDateReducer = (state, { productionCurveDate }) => updateObject(state, {
  productionCurveDate
})
export default createReducer({
  productionCurveData: {},
  productionCurveDate: {
    dateStart: getDateBefor(30, 'yyyy-MM-dd'),
    timeStart: getNowDateByFormat('hh:mm'),
    dateEnd: getNowDateByFormat('yyyy-MM-dd'),
    timeEnd: getNowDateByFormat('hh:mm')
  }
}, {
  [PRODUCTION_CURVE_MAP.GET_PRODUCTION_CURVE_DATA]: getProductionCurveDataReducer,
  [PRODUCTION_CURVE_MAP.SET_PRODUCTION_CURVE_DATE]: setProductionCurveDateReducer
})


