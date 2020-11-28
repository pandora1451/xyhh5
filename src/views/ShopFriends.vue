<template>
	<div class="container">
		<van-nav-bar
		  title="标题"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<div class="data-wrapper">
		</div>
		<div class="ad">下</div>
	</div>
</template>
<script>
	import {indexData,getOrderList} from "../../utils/api";
	import { app } from "../../utils/app";
	import { NavBar} from "vant";
	import Vue from 'vue'
	import Vuex from 'vuex'
	Vue.use(NavBar);
	Vue.use(Vuex)
	
	// @ is an alias to /src

	export default {
		name: 'ShopData',
		components: {
		},
		data() {
			return {
				list:'',
				shopToken:''
			}
		},
		created() {
			let shopToken = app.storage.get('shopToken')
			this.shopToken = shopToken
			console.log('shopToken:',this.shopToken)
			this.getOrderList()
		},
		mounted() {
		},
		watch: {
		},
		methods: {
			async getOrderList(){
				let params = {
					limit:20,
					offset:0,
					searchDay:'2020-01-01',
					usertoken:this.shopToken
				}
				let res = await getOrderList(params)
				console.log(res)
			},
			onClickLeft(){
				this.$router.back()
			}
		}
	}
</script>
<style>
	.data-wrapper button{
		width: 12.5rem;
		height: 3.125rem;
		margin: 0.625rem;
	}
</style>
