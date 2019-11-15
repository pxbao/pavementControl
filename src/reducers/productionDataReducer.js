import { createReducer, updateObject } from '../utils/reducer'
import { PRODUCTION_DATA_ACTION_MAP } from '../actions/productionDataAction'
import { getNowDateByFormat, getDateBefor } from '../utils/TimeUtils';
const getBidSectionReducer = (state, { bidSection }) => updateObject(state, {
  bidSection
})
const getProductionDataReducer = (state, { productionData }) => updateObject(state, {
  productionData
})
const setProductionDataDateReducer = (state, { productionDataDate }) => updateObject(state, {
  productionDataDate
})

const getProductionDataDetailsReducer = (state, { productionDataDetails }) => updateObject(state, {
  productionDataDetails
})
export default createReducer({
  bidSection: {},
  productionData: {},
  productionDataDate: {
    dateStart: getDateBefor(30, 'yyyy-MM-dd'),
    timeStart: getNowDateByFormat('hh:mm'),
    dateEnd: getNowDateByFormat('yyyy-MM-dd'),
    timeEnd: getNowDateByFormat('hh:mm')
  },
  productionDataDetails:{}
}, {
  [PRODUCTION_DATA_ACTION_MAP.GET_BIDSECTION]: getBidSectionReducer,
  [PRODUCTION_DATA_ACTION_MAP.GET_PRODUCTION_DATA]: getProductionDataReducer,
  [PRODUCTION_DATA_ACTION_MAP.SET_PRODUCTION_DATA_DATE]: setProductionDataDateReducer,
  [PRODUCTION_DATA_ACTION_MAP.GET_PRODUCTION_DATA_DETAILS]:getProductionDataDetailsReducer
})


