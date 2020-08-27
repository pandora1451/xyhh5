import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		// component: Home
		component:() => import('../views/Home.vue')
	},
	{
		path: '/goods',
		name: 'goods',
		component: () => import('../views/Goods.vue')
	},
	{
		path:'/show',
		name:'show',
		component: ()=>import('../views/Show.vue')
	},
	{
		path:'/join',
		name:'join',
		component: ()=>import('../views/Join.vue')
	},
	{
		path:'/login',
		name:'login',
		component: ()=>import('../views/Login.vue')
	},
	{
		path:'/regist',
		name:'regist',
		component: ()=>import('../views/Regist.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
