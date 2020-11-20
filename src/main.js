import {isCovertMode} from '../utils/const.js'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import less from 'less'
import store from './store.js'
import echarts from 'echarts'
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

new Vue({
	router,
	store: store,
  render: h => h(App),
}).$mount('#app')
