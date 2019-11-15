//运输管理
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './transportManage.scss'

import CarTab from './car'
//conf
import { ROUTE_MAP } from '../../constants/routeConf'
const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

@connect(mapStateToProps, mapDispatchToProps)
export default class TransportManage extends Component {
  config = {
    navigationBarTitleText: '运输管理',
  }
  constructor() {
    super(...arguments)
    this.state = {
      current: 0
    }
  }
  componentDidShow() {
  }
  handleClick(stateName, value) {
    this.setState({
      [stateName]: value
    })
  }
  renderTabs() {
    const { current } = this.state
    const tabList = [{ title: '运输车辆查询' }, { title: '摊铺质量查询' }]
    return (
      <View className='tabs-wrappper'>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this, 'current')}>
          <AtTabsPane current={current} index={0}>
            <View className='tab-content'>
              <CarTab />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='tab-content'>
              <CarTab />
            </View>
          </AtTabsPane>

        </AtTabs>
      </View>
    )
  }
  render() {
    return (
      <View className='wrapper '>
        {this.renderTabs()}
      </View>
    )
  }
}