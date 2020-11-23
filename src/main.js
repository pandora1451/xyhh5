import {isCovertMode} from '../utils/const.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import less from 'less'
import store from './store.js'
import echarts from 'echarts'
import {app} from '../utils/app.js'
Vue.prototype.$echarts = echarts
Vue.prototype.$isCovertMode = isCovertMode
// import axios from 'axios'
Vue.use(Vuex)
Vue.use(less)
// Vue.use(axios);

// Vue.prototype.$ajax = axios
Vue.prototype.$axios=axios
Vue.config.devtools = true;
Vue.config.productionTip = false

// let token = app.storage.get("toekn")
// let url = 'http://w.ydxyh.cn/shopJoin'
// if(token){
// 	console.log(1234)
// }else{
// 	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6d4b592411ae15a0&redirect_uri=' +
// 		url + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
// }


new Vue({
	router,
	store: store,
  render: h => h(App),
}).$mount('#app')
