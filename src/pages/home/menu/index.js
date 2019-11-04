import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import jump from '../../../utils/jump'
import classNames from 'classnames'
import './index.scss'

const MENU_LIST = [{
  key: 'order',
  text: '生产管理',
  img: require('./assets/img_grid_shengchanguanli.png')
}, {
  key: 'pin',
  text: '运输管理',
  img: require('./assets/img_grid_yunshuguanli.png')
}, {
  key: 'bargain',
  text: '施工管理',
  img: require('./assets/img_grid_shigongguanli.png')
}, {
  key: 'credit',
  text: '预警管理',
  img: require('./assets/img_grid_yujingguanli.png')
}, {
  key: 'service',
  text: '统计分析',
  img: require('./assets/img_grid_tongjifenxi.png')
}, {
  key: 'coupon',
  text: '施工日报',
  img: require('./assets/img_grid_ribao.png')
}]
const COUNT_LINE = 3

export default class Menu extends Component {
  handleClick = (menu) => {
    // NOTE 时间关系，此处只实现帮助中心，用于演示多端 webview
    if (menu.key === 'help') {
      jump({ url: menu.url, title: menu.text })
    } else {
      Taro.showToast({
        title: '目前只实现了帮助中心~',
        icon: 'none'
      })
    }
  }

  render () {
    return (
      <View className='user-menu'>
        {MENU_LIST.map((menu, index) => {
          // NOTE 不用伪元素选择器，需自行计算
          const nth = (index + 1) % COUNT_LINE === 0
          const lastLine = parseInt(index / COUNT_LINE) === parseInt(MENU_LIST.length / COUNT_LINE)
          return (
            <View
              key={menu.key}
              className={classNames(
                'user-menu__item',
                nth && 'user-menu__item--nth',
                lastLine && 'user-menu__item--last',
              )}
              onClick={this.handleClick.bind(this, menu)}
            >
              <Image className='user-menu__item-img' src={menu.img} />
              <Text className='user-menu__item-txt'>{menu.text}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}
