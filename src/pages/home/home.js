import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types';
import { View, Text, Picker } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './home.scss'

//conf
import { ROUTE_MAP } from '../../constants/routeConf'

//action
import { getHomeData } from '../../actions/homeAction'

//selector
import { getLoginInfoSelector } from '../../selectors/userSelector'
import { getHomeDataSelector } from '../../selectors/homeSelector'

//utiils
import Toast from '../../utils/Toast'
import Loading from '../../utils/Loading'

const mapStateToProps = state => ({
  loginInfo: getLoginInfoSelector(state),
  homeData: getHomeDataSelector(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchGetHomeData: (...args) => dispatch(getHomeData(...args))
})


@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends Component {
  config = {
    navigationBarTitleText: '路面管控',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#2BB4FD'
  }
  static propTypes = {
    dispatchGetHomeData: PropTypes.func.isRequired
  };

  static defaultProps = {
    homeData: null
  };

  state = {
    projectSelectorValues: [0, 0],
    current: 0
  }

  fetchData = () => {
    const { dispatchGetHomeData } = this.props;
    Loading.showMaskLoading();
    dispatchGetHomeData()
      .then(() => {
        Loading.hideLoading();
      })
      .catch((e) => {
        console.warn(e);
        Loading.hideLoading();
        Toast.showErrorToast(e);
      })
  }
  componentDidShow() {
    this.fetchData();
  }
  handleProjectChange = e => {
    this.setState({
      projectSelectorValues: e.detail.value
    })
  }
  renderProjectSelect() {
    const { homeData } = this.props
    const { projectSelectorValues } = this.state
    return (
      <View className='project-select-wrapper'>
        <Picker mode='multiSelector' range={homeData.project} value={projectSelectorValues} onChange={this.handleProjectChange}>
          <View className='project-select'>
            <View className='project-select__label'>{`${homeData.project[0][projectSelectorValues[0]]}`}</View>
            <View className='project-select__value'>{`${homeData.project[1][projectSelectorValues[1]]}`}</View>
          </View>
        </Picker>
      </View>
    );
  }
  handleClick (stateName, value) {
    this.setState({
      [stateName]: value
    })
  }
  renderTabs() {
    const {current} = this.state
    const tabList = [{ title: '沥青系统' }, { title: '水稳系统' }]
    return (
      <View className='tabs-wrappper'>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this, 'current')}>
          <AtTabsPane current={current} index={0}>
            <View className='tab-content'>标签页一的内容</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='tab-content'>标签页二的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
  render() {
    return (
      <View className='home-wrapper '>
        {this.renderProjectSelect()}
        {this.renderTabs()}
      </View>
    )
  }
}

