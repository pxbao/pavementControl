//摊铺速度
import _ from 'lodash';
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { View, ScrollView, Text } from '@tarojs/components'
//selector
import { getBidSectionSeletor } from '../../../selectors/productionDataSelector'
import { getWarningStatisticsDataSelector } from '../../../selectors/warningSelector'
//action
import { getBidSection } from '../../../actions/productionDataAction'
import { getWarningStatisticsData } from '../../../actions/wariningAction'
//utiils
import Toast from '../../../utils/Toast'
import Loading from '../../../utils/Loading'
import './index.scss'
import { ROUTE_MAP } from '../../../constants/routeConf'


const down = require('../../../assets/img/img_down.png'); // eslint-disable-line

const mapStateToProps = state => ({
  bidSection: getBidSectionSeletor(state),
  warningStatistics: getWarningStatisticsDataSelector(state)
})

const mapDispatchToProps = dispatch => ({
  dispatchGetBidSection: () => dispatch(getBidSection()),
  dispatchGetWarningStatisticsData: () => dispatch(getWarningStatisticsData())
})
@connect(mapStateToProps, mapDispatchToProps)
export default class Statistics extends Component {
  static defaultProps = {
    bidSection: null,
    warningStatistics: null
  };
  state = {
    bidSectionSelectorValue: 0,
  }
  componentDidShow() {
    this.fetchData();
  }
  fetchData = () => {
    const { dispatchGetBidSection, dispatchGetWarningStatisticsData } = this.props;
    Loading.showMaskLoading();
    dispatchGetBidSection()
      .then(() => {
        dispatchGetWarningStatisticsData()
          .then(() => {
            Loading.hideLoading();
          }).catch((e) => {
            console.warn(e);
            Loading.hideLoading();
            Toast.showErrorToast(e);
          })
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
  renderContent() {
    const { warningStatistics } = this.props
    if (warningStatistics == null) {
      return ''
    }
    const { primary, middle, senior, list } = warningStatistics

    const listView = (!list || !_.isArray(list)) ? '' : <View >
      {
        list.map((datail, index) => {
          const {
            totalOutput,
            dayOutput,
            totlalPlate,
            warnPlate,
            warnOutput,
            warnOutputFL,
            warnPlateFL,
            warningRate,
            warnGrade } = datail
          return (
            <View className='list-wrapper'>
              <View key={`${index}`} className='data-list-item-content-wrapper'>
                <View className='data-list-item-content-item-all'>
                  <Text className='data-list-item-content-name '>总产量(t):</Text>
                  <Text className='data-list-item-content-value'>{totalOutput}</Text>
                </View>
                <View className='data-list-item-content-item-half'>
                  <Text className='data-list-item-content-name '>当天量(t):</Text>
                  <Text className='data-list-item-content-value'>{dayOutput}</Text>
                </View>
                <View className='data-list-item-content-item-half'>
                  <Text className='data-list-item-content-name '>总盘数:</Text>
                  <Text className='data-list-item-content-value'>{totlalPlate}</Text>
                </View>
                <View className='data-list-item-content-item-half'>
                  <Text className='data-list-item-content-name '>预警盘数:</Text>
                  <Text className='data-list-item-content-value'>{warnPlate}</Text>
                </View>
                <View className='data-list-item-content-item-half'>
                  <Text className='data-list-item-content-name '>预警产量:</Text>
                  <Text className='data-list-item-content-value'>{warnOutput}</Text>
                </View>
                <View className='data-list-item-content-item-half'>
                  <Text className='data-list-item-content-name '>(收尾盘)预警产量:</Text>
                  <Text className='data-list-item-content-value'>{warnOutputFL}</Text>
                </View>
                <View className='data-list-item-content-item-half'>
                  <Text className='data-list-item-content-name '>(收尾盘)预警盘数:</Text>
                  <Text className='data-list-item-content-value'>{warnPlateFL}</Text>
                </View>
                <View className='data-list-item-content-item-all'>
                  <Text className='data-list-item-content-name '>预警率(%):</Text>
                  <Text className='data-list-item-content-value'>{warningRate}</Text>
                </View>
              </View>
              <View className='line' />
            </View>

          )
        })
      }
    </View>

    return (
      <ScrollView>
        <View className='content-wrapper'>
          <View className='content-title-wrapper'>
            <View className='content-title-item-wrapper'>
              <Text className='content-title-item-yellow'>{primary}</Text>
              <Text className='content-title-item-name'>初级预警(盘)</Text>
            </View>
            |
          <View className='content-title-item-wrapper'>
              <Text className='content-title-item-orange'>{middle}</Text>
              <Text className='content-title-item-name'>中级预警(盘)</Text>
            </View>
            |
          <View className='content-title-item-wrapper'>
              <Text className='content-title-item-red'>{senior}</Text>
              <Text className='content-title-item-name'>高级预警(盘)</Text>
            </View>
          </View>
          <View className='line' />
          {listView}
        </View>
      </ScrollView>

    )
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
        {this.renderContent()}
      </View>
    )
  }
}    