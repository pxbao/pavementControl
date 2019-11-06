//获取标段
const getBidSectionSeletor = state =>state.productiondata.bidSection || {}
//获取生产数据
const getProductionDataSelector = state =>state.productiondata.productionData || {}
//获取查询生产数据的时间筛选
const gettProductionDataDateSelector = state =>state.productiondata.productionDataDate || {}

export {
  getBidSectionSeletor,
  getProductionDataSelector,
  gettProductionDataDateSelector
}