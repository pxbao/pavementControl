//运输管理
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './warningManage.scss'

import Statistics from './statistics'
//conf
import { ROUTE_MAP } from '../../constants/routeConf'
const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

@connect(mapStateToProps, mapDispatchToProps)
export default class WarningManage extends Component {
  config = {
    navigationBarTitleText: '预警管理',
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
    const tabList = [{ title: '预警统计' }, { title: '预警短信' }]
    return (
      <View className='tabs-wrappper'>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this, 'current')}>
          <AtTabsPane current={current} index={0}>
            <View className='tab-content'>
              <Statistics />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='tab-content'>
              <Statistics />
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