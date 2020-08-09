import Vue from 'vue'
import App from './App.vue'
import router from './router'
import less from 'less'
Vue.use(less)

Vue.config.devtools = true;
Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
