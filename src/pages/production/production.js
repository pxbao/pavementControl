//生产管理
import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './production.scss'


import DataTab from './data'
import CurveTab from './curve'

//conf
import { ROUTE_MAP } from '../../constants/routeConf'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Production extends Component {
  config = {
    navigationBarTitleText: '生产管理',
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
    const tabList = [{ title: '生产数据' }, { title: '合成级配曲线' }, { title: '误差走势图' }]
    return (
      <View className='tabs-wrappper'>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this, 'current')}>
          <AtTabsPane current={current} index={0}>
            <View className='tab-content'>
              <DataTab />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='tab-content'>
              <CurveTab />
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View className='tab-content'>
              <CurveTab />
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
