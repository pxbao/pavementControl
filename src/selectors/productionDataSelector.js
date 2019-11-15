//获取标段
const getBidSectionSeletor = state =>state.productiondata.bidSection || {}
//获取生产数据
const getProductionDataSelector = state =>state.productiondata.productionData || {}
//获取查询生产数据的时间筛选
const getProductionDataDateSelector = state =>state.productiondata.productionDataDate || {}
//获取用料详情
const gettProductionDataDetailsSelector= state =>state.productiondata.productionDataDetails || {}

export {
  getBidSectionSeletor,
  getProductionDataSelector,
  getProductionDataDateSelector,
  gettProductionDataDetailsSelector
}