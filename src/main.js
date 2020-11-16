import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import less from 'less'
// import jquery from "jquery"

// import axios from 'axios'
Vue.use(less)
// Vue.use(axios);

// Vue.prototype.$ajax = axios
Vue.config.devtools = true;
Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
