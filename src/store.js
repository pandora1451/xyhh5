import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
		token:'',
		userInfo:'',
		shopInfo:''
  },
  mutations: {
		setUserInfo(state,info){
			state.userInfo = info
		},
		setShopInfo(state,info){
			state.shopInfo = info
		},
		setToken(state,info){
			state.token = info
		}
  }
})

export default store
