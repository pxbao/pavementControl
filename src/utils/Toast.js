import Taro from '@tarojs/taro';

// const failedImage = require('../assets/img/failed.png'); // eslint-disable-line

export default class Toast {
  static showToast(title) {
    Taro.showToast({
      title,
      icon: 'none'
    });
  }

  /**
   * @param error
   * @param defaultMessage
   */
  static showErrorToast(error, defaultMessage) {
    Taro.showToast({
      title: error && error.message ? error.message : (defaultMessage ? defaultMessage : '失败了，请稍后再试'),
      icon: 'none'
    })
  }
}
