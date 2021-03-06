import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'ShopData',
		component:() => import('../views/ShopData.vue')
	},{
		path: '/Home',
		name: 'Home',
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
	},
	{
		path:'/ShopLogin',
		name:'ShopLogin',
		component: ()=>import('../views/ShopLogin.vue')
	},
	{
		path:'/ShopRegist',
		name:'ShopRegist',
		component: ()=>import('../views/ShopRegist.vue')
	},{
		path: '/ShopData',
		name: 'ShopData',
		component:() => import('../views/ShopData.vue')
	},{
		path: '/ShopOrderList',
		name: 'ShopOrderList',
		component:() => import('../views/ShopOrderList.vue')
	},{
		path: '/ShopSet',
		name: 'ShopSet',
		component:() => import('../views/ShopSet.vue')
	},{
		path: '/ShopFriends',
		name: 'ShopFriends',
		component:() => import('../views/ShopFriends.vue')
	},{
		path: '/ShopFinance',
		name: 'ShopFinance',
		component:() => import('../views/ShopFinance.vue')
	},{
		path: '/ShopFinanceDaly',
		name: 'ShopFinanceDaly',
		component:() => import('../views/ShopFinanceDaly.vue')
	},{
		path: '/ShopJoin',
		name: 'ShopJoin',
		component:() => import('../views/ShopJoin.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
