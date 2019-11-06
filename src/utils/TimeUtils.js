import Taro from '@tarojs/taro';
import {  format,subDays } from 'date-fns';
/**
 * 根据日期格式  获取当前日期
 * @param {日期格式} formats 
 */
const getNowDateByFormat = formats =>{
  return format(new Date(),formats)
}
/**
 * 根据天数及日期格式 获取几天前的时间
 * @param {几天前 正数向前 负数向后} days 
 * @param {日期格式} formats 
 */
const getDateBefor = (days,formats) =>{
  return format(subDays(new Date(),days),formats)
}


export{
  getNowDateByFormat,
  getDateBefor
}