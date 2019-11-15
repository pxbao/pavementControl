//无数据
import Taro, { Component } from '@tarojs/taro';
import { Text, View } from '@tarojs/components';

const noDataImage = require('../../assets/img/img_no_data.png'); // eslint-disable-line
export default class DataTimeSelect extends Component {
  
  render() {
    return (
      <View className='wrapper'>
        <Image src={noDataImage} className='nodataImg-img'/>
        <Text>暂无数据</Text>
      </View>
    )
  }
}