import Taro from '@tarojs/taro';
import {FETCH_DOMAIN} from "../constants/fetchConf";
import {ROUTE_MAP} from "../constants/routeConf";
import {getAuth} from "./user";

//const buildUrl = url => `${FETCH_DOMAIN}${url}`;

const reLogin = () => {
  Taro.navigateTo({
    url: `${ROUTE_MAP.login}?isBackToLastPage=YES`
  });
};

const fetch = (options) => new Promise((resolve, reject) => {
  const {
    url,
    method,
    data
  } = options;

  if (!url) {
    console.warn("参数url不能为空。");
    return;
  }

  const fetchUrl = url;

  console.log('fetchUrl', fetchUrl);

  Taro.request({
    url: fetchUrl,
    data,
    method: method || 'GET',
    header: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      token: getAuth() || ''
    }
  })
  .then((res) => {
    console.log('fetch res', res);
    switch (res.data.code) {
      case '200': {
        resolve(res.data);
        break;
      }
      case 402: {
        reLogin();
        break;
      }
      default: {
        const error = new Error(res.data.message);
        error.code = res.data && res.data.code ? res.data.code : -9999;
        reject(error);
        break;
      }
    }
  })
  .catch((e) => {
    if (e.message && e.message.indexOf('code 402') > -1) {
      reLogin();
      return;
    }
    reject(e);
  });
});

export {
  fetch
};
