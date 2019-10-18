import Taro from "@tarojs/taro"

//utils
import {fetch} from "../utils/fetch"
import {clearAuth,setAuth} from "../utils/user"

import {FETCH_URL_MAP} from "../constants/fetchConf"
import {ROUTE_MAP} from "../constants/routeConf"

const USER_ACTION_MAP = {
  GET_LOGIN_INFO:'userAction.getLoginInfo'
}

const getLoginInfoAction = loginInfo =>({
  type:USER_ACTION_MAP.GET_LOGIN_INFO,
  loginInfo
})
/**
 * 登录
 * @param {*} phone 
 * @param {*} password 
 */
const login = (phone,password) => async(dispatch) =>{
  try{
    const ret = await fetch({
      url:FETCH_URL_MAP.getTokenUser,
      method:'POST',
      data:{
        loginId:phone,
        source:'djgk-app',
        version:'V1.0'
      }
    })
    const {userId,token} = ret.data || {};
    
    setAuth(token)

    dispatch(getLoginInfoAction({
      userId,phone,token
    }))

    return true
  }catch(e){
    throw e
  }
}
/**
 * 退出登录
 */
const logout = () => {
  clearAuth();

  Taro.redirectTo({
    url: ROUTE_MAP.login
  });
}

export{
  USER_ACTION_MAP,
  login,
  logout
}