// import {root } from "./const"
// import { CID } from './const'
// var INTERFACE_URL = process.env.VUE_APP_BASE_URL;
// console.log('INTERFACE_URL',INTERFACE_URL)

import {
	Service,
	ServiceGet
} from './service'
import {
	app
} from './app';

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
export function shopLogin(params) {
	return Service({
		url: '/shop/sshop/login',
		params: params
	})
}
//商铺注册
export function shopRegist(params) {
	return Service({
		url: '/shop/sshop/rigist',
		params: params
	})
}
//扫码支付
export function wxPay(params) {
	return Service({
		url: '/shop/sshop/order/weixinpay',
		params: params
	})
}
//店铺数据
export function indexData(params) {
	return ServiceGet({
		url: '/shop/sshop/index',
		params: params
	})
}
//订单列表
export function getOrderList(params) {
	return ServiceGet({
		url: '/shop/sshop/orderList',
		params: params
	})
}
//每日财务详情
export function getDayFinanceList(params) {
	return ServiceGet({
		url: '/shop/sshop/dayFinanceList',
		params: params
	})
}
//月度财务列表
export function getMonthFinanceList(params) {
	return ServiceGet({
		url: '/shop/sshop/monthFinanceList',
		params: params
	})
}
//提现申请
export function withDraw(params) {
	return Service({
		url: '/shop/sshop/user/withdraw',
		params: params
	})
}
//重置密码
export function resetShopPwd(params) {
	return ServiceGet({
		url: '/sshop/resetShopPwd',
		params: params
	})
}
//申请验证码
export function sendValidateCode(params) {
	return Service({
		url: '/sshop/send_validate_code',
		params: params
	})
}
//修改门店
export function updateShop(params) {
	return ServiceGet({
		url: '/sshop/updateShop',
		params: params
	})
}
//修改头像
export function updateShopPic(params) {
	return ServiceGet({
		url: '/sshop/updateShopPic',
		params: params
	})
}
//修改密码
export function updateShopPwd(params) {
	return ServiceGet({
		url: '/sshop/updateShopPwd',
		params: params
	})
}
//团队管理页面数据
//领用喇叭
export function getHorn(params) {
	return ServiceGet({
		url: '/sshop/getHorn',
		params: params
	})
}
//定制语音
export function makeMessage(params) {
	return ServiceGet({
		url: '/sshop/makeMessage',
		params: params
	})
}
//获取总好友数
export function friendList(params) {
	return ServiceGet({
		url: '/user/friend-list',
		params: params
	})
}
//获取周新增好友数
export function friendReturn(params) {
	return ServiceGet({
		url: '/user/friend-return',
		params: params
	})
}