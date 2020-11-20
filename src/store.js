import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
		token:'',
		userInfo:'',
		shopInfo:'',
		shopToken:''
  },
  mutations: {
		setUserInfo(state,info){
			state.userInfo = info
		},
		setShopInfo(state,info){
			state.shopInfo = info
		},
		setShopToken(state,info){
			state.shopToken = info
		}
  }
})

export default store
