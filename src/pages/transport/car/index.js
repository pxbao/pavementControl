//车辆运输管理
import _ from 'lodash';
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { NoData } from '@components'
import { View, Text } from '@tarojs/components'
//selector
import { getBidSectionSeletor } from '../../../selectors/productionDataSelector'
//action
import { getBidSection } from '../../../actions/productionDataAction'
//utiils
import Toast from '../../../utils/Toast'
import Loading from '../../../utils/Loading'
import './index.scss'
import { ROUTE_MAP } from '../../../constants/routeConf'


const down = require('../../../assets/img/img_down.png'); // eslint-disable-line

const mapStateToProps = state => ({
  bidSection: getBidSectionSeletor(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchGetBidSection: () => dispatch(getBidSection()),
})
@connect(mapStateToProps, mapDispatchToProps)
export default class Car extends Component {
  static defaultProps = {
    bidSection: null,
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

  //标段选择
  handleBidSectionChange = e => {
    this.setState({
      bidSectionSelectorValue: e.detail.value
    })
  }
  render() {
    const { bidSection } = this.props;
    const { bidSectionSelectorValue } = this.state
    return (
      <View className='wrapper '>
        <View className='bidsection-wrapper'>
          <Picker mode='selector' range={bidSection.section} value={bidSectionSelectorValue} onChange={this.handleBidSectionChange}>
            <View className='bidsection-content'>
              <View className='bidsection-content-text'>{bidSection.section[bidSectionSelectorValue]}</View>
              <Image src={down} className='img-down' />
            </View>
          </Picker>
        </View>
        <NoData/>
      </View>
    )
  }
}    