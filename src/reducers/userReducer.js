import { createReducer, updateObject } from '../utils/reducer'
import { USER_ACTION_MAP } from '../actions/userAction'

const getLoginInfoReducer = (state, { loginInfo }) => updateObject(state, {
  loginInfo
})

export default createReducer({
  loginInfo: {
    id: undefined,
    token: undefined
  }
}, {
  [USER_ACTION_MAP.GET_LOGIN_INFO]: getLoginInfoReducer
})