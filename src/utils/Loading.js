import Taro from '@tarojs/taro';

export default class Loading {
  static showMaskLoading(title) {
    Taro.showLoading({
      title: title || '加载中...',
      mask: true
    });
  }

  static hideLoading() {
    Taro.hideLoading();
  }
}

