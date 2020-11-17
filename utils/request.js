import { Service,ServiceGet } from './service'
import { app } from './app';

//申请验证码
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
//商铺登录
export function shopLogin(params){
	return Service({
	  url: '/shop/sshop/login',
	  params: params
	})
}
//商铺注册
export function shopRegist(paams){
	return Service({
	  url: '/shop/sshop/rigist',
	  params: params
	})
}
//扫码支付
export function wxPay(params){
	return Service({
	  url: '/shop/sshop/order/weixinpay',
	  params: params
	})
}
//店铺数据
export function indexData(params){
	return ServiceGet({
	  url: '/shop/sshop/index',
	  params: params
	})
}