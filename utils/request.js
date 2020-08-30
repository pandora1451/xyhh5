import { Service } from './service'
import { app } from './app';

export function getValidateCode(params) {
  return Service({
    url: '/customer/send_validate_code',
    params: app.toMyJson(params)
  })
}
export function getWechatCode(params) {
  return Service({
    url: '/customer/getWechatInfoByCode',
    params: app.toMyJson(params)
  })
}
export function login(params) {
  console.log('login1234')
  return Service({
    url: '/mall/small/h5/login',
    params: params
  })
}
export function regist(params) {
  return Service({
    url: '/mall/small/h5/regist',
    params: params
  })
}
