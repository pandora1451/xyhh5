import axios from 'axios'
// import { Message, Loading } from 'element-ui'
const ConfigBaseURL = process.env.VUE_APP_BASE_URL //默认路径，这里也可以使用env来判断环境
// const ConfigBaseURL = '/api'
// let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
export const ServiceGet = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'get',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
export const ServiceWxGet = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: 'https://api.ydxyh.cn/mall/small',
  method: 'get',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
// Service.interceptors.request.use(config => {
//   loadingInstance = Loading.service({
//     lock: true,
//     text: 'loading...'
//   })
//   return config
// })
// // 添加响应拦截器
// Service.interceptors.response.use(response => {
//   loadingInstance.close()
//   // console.log(response)
//   return response.data
// }, error => {
//   console.log('TCL: error', error)
//   const msg = error.Message !== undefined ? error.Message : ''
//   Message({
//     message: '网络错误' + msg,
//     type: 'error',
//     duration: 3 * 1000
//   })
//   loadingInstance.close()
//   return Promise.reject(error)
// })