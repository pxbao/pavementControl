import Taro, { Component } from '@tarojs/taro';
import { Text, View, Picker } from '@tarojs/components';
import { AtIcon } from 'taro-ui'
import PropTypes from 'prop-types';
import { getEmptyFunc } from '../../utils/func';
import './index.scss'


const calendarImg = require('../../assets/img/img_calendar.png'); // eslint-disable-line

export default class DataTimeSelect extends Component {
  static propTypes = {
    dateStart: PropTypes.oneOfType([
      PropTypes.string.isRequired
    ]),
    timeStart: PropTypes.oneOfType([
      PropTypes.string.isRequired
    ]),
    dateEnd: PropTypes.oneOfType([
      PropTypes.string.isRequired
    ]),
    timeEnd: PropTypes.oneOfType([
      PropTypes.string.isRequired
    ]),
    handleDateChange: PropTypes.func
  };
  static defaultProps = {
    handleDateChange: getEmptyFunc()
  };
  // handleTimeStartChange = e => {
  //   this.setState({
  //     timeStart: e.detail.value
  //   })
  // }

  // handleDateStartChange = e => {
  //   this.setState({
  //     dateStart: e.detail.value
  //   })
  // }
  render() {
    const { dateStart, timeStart, dateEnd, timeEnd,handleDateChange} = this.props;
    return (
      <View className='wrapper'>
        <View className='wrapper-half'>
          <View className='wrapper-half-content'>
            <Image src={calendarImg} className='calendarImg-img'></Image>
            <Picker mode='date' value={dateStart} onChange={(e) => {handleDateChange(e,1)}}>
              <View className='text-content'>{dateStart}</View>
            </Picker>
            <Picker mode='time' value={timeStart} onChange={(e) => {handleDateChange(e,2)}}>
              <View className='text-content'>{timeStart}</View>
            </Picker>
          </View>
        </View>
        |
        <View className='wrapper-half'>
          <View className='wrapper-half-content'>
            <Image src={calendarImg} className='calendarImg-img'></Image>
            <Picker mode='date' value={dateEnd} onChange={(e) => {handleDateChange(e,3)}}>
              <View className='text-content'>{dateEnd}</View>
            </Picker>
            <Picker mode='time' value={timeEnd} onChange={(e) => {handleDateChange(e,4)}}>
              <View className='text-content'>{timeEnd}</View>
            </Picker>
          </View>
        </View>
      </View>
    )
  }
}