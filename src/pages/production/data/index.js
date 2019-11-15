//生产数据
import _ from 'lodash';
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { DataTimeSelect } from '@components'
import { View, Text } from '@tarojs/components'
//selector
import { getBidSectionSeletor, getProductionDataSelector, getProductionDataDateSelector } from '../../../selectors/productionDataSelector'
//action
import { getBidSection, getProductionData,  setDate } from '../../../actions/productionDataAction'
//utiils
import Toast from '../../../utils/Toast'
import Loading from '../../../utils/Loading'
import './index.scss'
import {ROUTE_MAP} from '../../../constants/routeConf'


const down = require('../../../assets/img/img_down.png'); // eslint-disable-line

const mapStateToProps = state => ({
  bidSection: getBidSectionSeletor(state),
  productionData: getProductionDataSelector(state),
  productionDataDate: getProductionDataDateSelector(state)
})

const mapDispatchToProps = dispatch => ({
  dispatchGetBidSection: () => dispatch(getBidSection()),
  dispatchGetProductionData: () => dispatch(getProductionData()),
  dispatchSetDate: (...args) => dispatch(setDate(...args))
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
    const { dispatchGetBidSection, dispatchGetProductionData } = this.props;
    Loading.showMaskLoading();
    dispatchGetBidSection()
      .then(() => {
        dispatchGetProductionData()
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
   * 生成数据查询开始日期修改
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


  renderDataList(time, list) {
    return (
      <View className='data-list-item' onClick={()=>this.onClickJumpToProductionDataDetail()}>
        <View className='data-list-item-title-content'>
          <Text className='data-list-item-title-content-titel-name'>出料时间:</Text>
          <Text className='data-list-item-title-content-titel-value'>{time}</Text>
        </View>
        <View className='line'/>
        <View className='data-list-item-content-wrapper'>
            {
              list.map((datail,index) =>{
                const {id,name,value} = datail
                return (
                  <View key = {`${id}_${index}`} className ='data-list-item-content-item'>
                    <Text className='data-list-item-content-name '>{name}:</Text>
                    <Text className = 'data-list-item-content-value'>{value}</Text>
                  </View>
                )
              })
            }
        </View>
      </View>
    )
  }
  
  onClickJumpToProductionDataDetail(){
    Taro.navigateTo({
      url: ROUTE_MAP.productionDataDetails
    });
  }
  renderContent() {
    const { productionData } = this.props;
    const { data } = productionData
    if (!data || !_.isArray(data)) {
      return '';
    }
    return (
      <View>{data.map((info, index) => {
        const {
          time,
          list
        } = info;

        return (
          <View key={`detail-${index}`} >
            {this.renderDataList(time, list)}
          </View>
        );
      })}

      </View>
    )
  }
  render() {
    const { bidSection, productionDataDate, productionData } = this.props;
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
              <Image src={down} className='img-down' />
            </View>
          </Picker>
        </View>
        <View className='data-list-wrapper'>
          {this.renderContent()}
        </View>

      </View>
    )
  }
}