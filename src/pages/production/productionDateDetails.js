//用料明细
import _ from 'lodash';
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './productionDateDetails.scss'

//utiils
import Toast from '../../utils/Toast'
import Loading from '../../utils/Loading'

//selector
import {gettProductionDataDetailsSelector} from '../../selectors/productionDataSelector'
//action
import { getProductionDataDetails } from '../../actions/productionDataAction'

const mapStateToProps = state => ({
  productionDataDetails:gettProductionDataDetailsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  dispatchGetProductionDataDetails: () => dispatch(getProductionDataDetails()),
})
@connect(mapStateToProps, mapDispatchToProps)
export default class Production extends Component {
  config = {
    navigationBarTitleText: '用料详情',
  }
  static defaultProps = {
    productionDataDetails: null
  };
  componentDidShow() {
    this.fetchData();
  }
  fetchData = () => {
    const { dispatchGetProductionDataDetails } = this.props;
    Loading.showMaskLoading();
    dispatchGetProductionDataDetails()
      .then(() => {
        Loading.hideLoading();
      })
      .catch((e) => {
        console.warn(e);
        Loading.hideLoading();
        Toast.showErrorToast(e);
      })

  }
  renderList(){
    const {productionDataDetails} = this.props
    const {list} = productionDataDetails
    if (!list || !_.isArray(list)) {
      return '';
    }
    return (
      <View className='list-wrapper'>
            {
              list.map((datail,index) =>{
                const {id,name,value,ratioA,ratioB,error} = datail
                const isWhite =  (index%2==0)
                return (
                  <View key = {`${id}_${index}`} className={isWhite?'list-item-content-wrapper_whit':'list-item-content-wrapper_gray'}>
                    <Text className='list-item-content-title '>{name}</Text>
                    <Text className = 'list-item-content-value'>{value}</Text>
                    <Text className = 'list-item-content-value'>{ratioA}</Text>
                    <Text className = 'list-item-content-value'>{ratioB}</Text>
                    <Text className = 'list-item-content-red'>{error}</Text>
                  </View>
                )
              })
            }
        </View>
    )
  }
  render() {
    const {productionDataDetails} = this.props
    const {time,section,list} = productionDataDetails
    return(
      <View className='wrapper'>
        <View className='title-content-wrapper'>
          <Text className='title-content-name'>{section?section:''}</Text>
          <Text className ='title-content-value'> 出料时间: {time?time:''}</Text>
        </View>
        <View className='list-title-wrapper'>
          <Text className='list-title-item'>{'类型'}</Text>
          <Text className='list-title-item'>{'实际用量'+'\n'+'(t)'}</Text>
          <Text className='list-title-item'>{'实际配比'+'\n'+'(%)'}</Text>
          <Text className='list-title-item'>{'理论配比'+'\n'+'(%)'}</Text>
          <Text className='list-title-item'>{'误差'+'\n'+'(%)'}</Text>
        </View>
        {this.renderList()}
      </View>
    )
  }
}