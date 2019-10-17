import Taro from '@tarojs/taro';

const AUTH_KEY = 'token';
// const expiredDate = 30 * 60 * 1000; // 30分钟有效期

const setAuth = auth => {
  try {
    if (!auth) {
      return;
    }

    const timestamp = (new Date()).getTime();
    const ret = {
      auth,
      timestamp
    };
    Taro.setStorageSync(AUTH_KEY, JSON.stringify(ret));
  } catch (e) {
    console.warn(e);
  }
};


const getAuth = () => {
  try {
    const value = Taro.getStorageSync(AUTH_KEY);

    if (!value) {
      return null;
    }

    const ret = JSON.parse(value);

    if (!ret) {
      return null;
    }

    // const {auth, timestamp} = ret;
    // const nowTime = (new Date()).getTime();

    return ret.auth || '';

    // if (auth && nowTime - timestamp < expiredDate) {
    //   return auth;
    // }
    //
    // return null;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

const clearAuth = () => {
  try {
    Taro.removeStorageSync(AUTH_KEY);
  } catch (e) {
    console.warn(e);
  }
};

export {
  setAuth,
  getAuth,
  clearAuth
}
