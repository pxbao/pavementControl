//合成极配曲线
import _ from 'lodash';
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { DataTimeSelect } from '@components'
import { View, Text } from '@tarojs/components'
//selector
import { getBidSectionSeletor } from '../../../selectors/productionDataSelector'
import { getProductionCurveDataSelector, getProductionCurveDateSelector } from '../../../selectors/productionCurveSeletor'
//action
import { getBidSection } from '../../../actions/productionDataAction'
import { setDate, getProductionCurveData } from '../../../actions/productionCurveAction'
//utiils
import Toast from '../../../utils/Toast'
import Loading from '../../../utils/Loading'
import './index.scss'
import { ROUTE_MAP } from '../../../constants/routeConf'

import Chart from 'taro-echarts'

const down = require('../../../assets/img/img_down.png'); // eslint-disable-line

const mapStateToProps = state => ({
  bidSection: getBidSectionSeletor(state),
  productionCurveData: getProductionCurveDataSelector(state),
  productionCurveDate: getProductionCurveDateSelector(state)
})

const mapDispatchToProps = dispatch => ({
  dispatchGetBidSection: () => dispatch(getBidSection()),
  dispatchGetProductionCurveData: () => dispatch(getProductionCurveData()),
  dispatchSetDate: (...args) => dispatch(setDate(...args))
})
@connect(mapStateToProps, mapDispatchToProps)
export default class Curve extends Component {
  static propTypes = {
    // props
    productionCurveDate: PropTypes.shape({
      dateStart: PropTypes.string,
      timeStart: PropTypes.string,
      dateEnd: PropTypes.string,
      timeEnd: PropTypes.string
    }),

    // dispatch
    dispatchGetProductionCurveData: PropTypes.func.isRequired,
    dispatchSetDate: PropTypes.func.isRequired
  };
  static defaultProps = {
    bidSection: null,
    productionCurveData: null
  };
  state = {
    bidSectionSelectorValue: 0,
  }
  componentDidShow() {
    this.fetchData();
  }
  fetchData = () => {
    const { dispatchGetBidSection, dispatchGetProductionCurveData } = this.props;
    Loading.showMaskLoading();
    dispatchGetBidSection()
      .then(() => {
        dispatchGetProductionCurveData()
          .then(() => {
            Loading.hideLoading();
          }).catch((e) => {
            console.warn(e);
            Toast.showErrorToast(e);
          })
      })
      .catch((e) => {
        console.warn(e);
        Loading.hideLoading();
        Toast.showErrorToast(e);
      })

  }
  /**
   * 查询日期修改
   * type ：
   */
  handleDateChange = (e, type) => {
    const { dispatchSetDate } = this.props;
    dispatchSetDate(e, type);
  };
  //标段选择
  handleBidSectionChange = e => {
    this.setState({
      bidSectionSelectorValue: e.detail.value
    })
  }
  render() {
    const { bidSection, productionCurveData, productionCurveDate } = this.props;
    const { bidSectionSelectorValue } = this.state
    return (
      <View className='wrapper '>
        <DataTimeSelect
          dateStart={`${productionCurveDate.dateStart}`}
          timeStart={`${productionCurveDate.timeStart}`}
          dateEnd={`${productionCurveDate.dateEnd}`}
          timeEnd={`${productionCurveDate.timeEnd}`}
          handleDateChange={this.handleDateChange} />
        <View className='bidsection-wrapper'>
          <Picker mode='selector' range={bidSection.section} value={bidSectionSelectorValue} onChange={this.handleBidSectionChange}>
            <View className='bidsection-content'>
              <View className='bidsection-content-text'>{bidSection.section[bidSectionSelectorValue]}</View>
              <Image src={down} className='img-down' />
            </View>
          </Picker>
        </View>
        <View className="line-chart-wrapper">
          <Chart 
            height='300px'
            option={{
              title: {
                text: '合成极配曲线',
                left: 'center'
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                top: '15%',
                data: ['实际极配', '标准极配', '预警上限', '预警下限']
              },
              grid: {
                top: '30%',
                left: '3%',
                right: '4%',
                bottom: '0%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['0.075', '0.3', '1.18', '4.75', '13.2', '19.1', '31.5']
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  formatter: '{value}%'
                }
              },
              series: [
                {
                  name: '实际极配',
                  type: 'line',
                  data: [120, 32, 101, 34, 90, 30, 10]
                },
                {
                  name: '标准极配',
                  type: 'line',
                  data: [20, 82, 91, 34, 90, 30, 10]
                },
                {
                  name: '预警上限',
                  type: 'line',
                  data: [50, 32, 1, 54, 90, 30, 10]
                },
                {
                  name: '预警下限',
                  type: 'line',
                  data: [20, 32, 1, 34, 90, 30, 20]
                }
              ]
            }}
          />
        </View>

      </View>
    )
  }
}