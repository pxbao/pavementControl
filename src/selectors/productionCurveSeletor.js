
//获取查询极配曲线的时间筛选
const getProductionCurveDateSelector = state =>state.productioncurve.productionCurveDate || {}
//获取极配曲线数据
const getProductionCurveDataSelector = state =>state.productioncurve.productionCurveData || {}

export {
  getProductionCurveDateSelector,
  getProductionCurveDataSelector
}