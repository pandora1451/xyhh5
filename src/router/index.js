import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/goods',
		name: 'goods',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('../views/Goods.vue')
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
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
