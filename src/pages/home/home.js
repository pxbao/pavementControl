import Taro, { Component, Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types';
import { View, Text, Picker } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtGrid,AtFab } from 'taro-ui'
import Menu from './menu'
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


const totalOutputImg = require('../../assets/img/tab_total_output.png'); // eslint-disable-line
const yujinglv = require('../../assets/img/img_tabs_yujinglv.png'); // eslint-disable-line
const yujingpanshu = require('../../assets/img/img_tabs_yujingpanshu.png'); // eslint-disable-line
const zongpanshu = require('../../assets/img/img_tabs_zongpanshu.png'); // eslint-disable-line

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

  constructor() {
    super(...arguments)
    this.state = {
      data: [
        {
          image:require('../../assets/gid/img_grid_shengchanguanli.png'),
          value: '生产管理'
        },
        {
          image:require('../../assets/gid/img_grid_yunshuguanli.png'),
          value: '运输管理'
        },
        {
          image:require('../../assets/gid/img_grid_shigongguanli.png'),
          value: '施工管理'
        },
        {
          image:require('../../assets/gid/img_grid_yujingguanli.png'),
          value: '预警管理'
        },
        {
          image:require('../../assets/gid/img_grid_tongjifenxi.png'),
          value: '统计分析'
        },
        {
          image:require('../../assets/gid/img_grid_ribao.png'),
          value: '施工日报'
        }
      ],
      projectSelectorValues: [0, 0],
      current: 0
    }
  }

  handleGridClick = (value, index) => {
    console.log(value, index)
  }

  static propTypes = {
    dispatchGetHomeData: PropTypes.func.isRequired
  };

  static defaultProps = {
    homeData: null
  };


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
  handleClick(stateName, value) {
    this.setState({
      [stateName]: value
    })
  }
  renderTabContent(index) {
    return (
      <View className='tab-content-info'>
        <View className='tab-content-info-wrapper'>
          <View className='tab-content-info-content'>
            <Text className='tab-content-info-name'>113011.23</Text>
            <Text className='tab-content-info-title'>总产量(吨)</Text>
          </View>
          <Image className='tab-content-info-imgage' src={totalOutputImg}></Image>
        </View>
        <View className='tab-content-info-between'>
          <View className='tab-content-info-between-wrapper_1'>
            <View className='tab-content-info-content'>
              <Text className='tab-content-info-between-name'>113011.23</Text>
              <Text className='tab-content-info-between-title'>总盘数</Text>
            </View>
            <Image className='tab-content-info-between-imgage' src={zongpanshu}></Image>
          </View>
          <View className='tab-content-info-between-wrapper_2'>
            <View className='tab-content-info-content'>
              <Text className='tab-content-info-between-name'>113011.23</Text>
              <Text className='tab-content-info-between-title'>预警盘数</Text>
            </View>
            <Image className='tab-content-info-between-imgage' src={yujingpanshu}></Image>
          </View>
          <View className='tab-content-info-between-wrapper_3'>
            <View className='tab-content-info-content'>
              <Text className='tab-content-info-between-name'>11.23%</Text>
              <Text className='tab-content-info-between-title'>预警率</Text>
            </View>
            <Image className='tab-content-info-between-imgage' src={yujinglv}></Image>
          </View>
        </View>
        <View className='tabs-grid-item'>
        <Menu />
        </View>
      </View>
    )
  }
  renderTabs() {
    const { current } = this.state
    const tabList = [{ title: '沥青系统' }, { title: '水稳系统' }]
    return (
      <View className='tabs-wrappper'>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this, 'current')}>
          <AtTabsPane current={current} index={0}>
            <View className='tab-content'>{this.renderTabContent(1)}</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className='tab-content'>{this.renderTabContent(2)}</View>
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
        <View className='btn-fab'>
          <AtFab >
            <Text >警</Text>
          </AtFab>
        </View>
        <View className='btn-warm-fab'>
        <Text className='btn-warm-num'>99+</Text>
        </View>
      </View>
    )
  }
}

