//生产数据
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { DataTimeSelect } from '@components'
import { View, Text } from '@tarojs/components'
//selector
import { getBidSectionSeletor, getProductionDataSelector, gettProductionDataDateSelector } from '../../../selectors/productionDataSelector'
//action
import { getBidSection, getProductionData, setProductionDataDateAction, setDateStart } from '../../../actions/productionDataAction'
//utiils
import Toast from '../../../utils/Toast'
import Loading from '../../../utils/Loading'
import './index.scss'

const mapStateToProps = state => ({
  bidSection: getBidSectionSeletor(state),
  productionData: getProductionDataSelector(state),
  productionDataDate: gettProductionDataDateSelector(state)
})

const mapDispatchToProps = dispatch => ({
  dispatchGetBidSection: () => dispatch(getBidSection()),
  dispatchGetProductionData: () => dispatch(getProductionData()),
  dispatchSetDate: (...args) => dispatch(setDateStart(...args))
})
@connect(mapStateToProps, mapDispatchToProps)
export default class Data extends Component {
  static propTypes = {
    // props
    productionDataDate: PropTypes.shape({
      dateStart: PropTypes.string,
      timeStart: PropTypes.string,
      dateEnd: PropTypes.string,
      timeEnd: PropTypes.string
    }),

    // dispatch
    dispatchGetProductionData: PropTypes.func.isRequired,
    dispatchSetDate: PropTypes.func.isRequired
  };
  static defaultProps = {
    bidSection: null,
    productionData: null
  };
  state = {
    bidSectionSelectorValue: 0,
  }
  componentDidShow() {
    this.fetchData();
  }
  fetchData = () => {
    const { dispatchGetBidSection } = this.props;
    Loading.showMaskLoading();
    dispatchGetBidSection()
      .then(() => {
        Loading.hideLoading();
      })
      .catch((e) => {
        console.warn(e);
        Loading.hideLoading();
        Toast.showErrorToast(e);
      })
  }
  /**
   * 生成数据查询开始日期修改
   * type ：
   */
  handleDateChange = (e, type) => {
    const { dispatchSetDate } = this.props;
    dispatchSetDate(e,type);
  };
  //标段选择
  handleBidSectionChange = e => {
    this.setState({
      bidSectionSelectorValue: e.detail.value
    })
  }

  render() {
    const { bidSection, productionDataDate } = this.props;
    const { bidSectionSelectorValue } = this.state
    return (
      <View className='wrapper '>
        <DataTimeSelect
          dateStart={`${productionDataDate.dateStart}`}
          timeStart={`${productionDataDate.timeStart}`}
          dateEnd={`${productionDataDate.dateEnd}`}
          timeEnd={`${productionDataDate.timeEnd}`}
          handleDateChange={this.handleDateChange} />
        <View className='bidsection-wrapper'>
          <Picker mode='selector' range={bidSection.section} value={bidSectionSelectorValue} onChange={this.handleBidSectionChange}>
            <View className='bidsection-content'>
              <View className='bidsection-content-text'>{bidSection.section[bidSectionSelectorValue]}</View>
            </View>
          </Picker>
        </View>

      </View>
    )
  }
}