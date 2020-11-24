<template>
	<div class="container">
		<div class="nav-bar">头</div>
		<div class="data-wrapper">
		</div>
		<div class="ad">下</div>
	</div>
</template>
<script>
	import {indexData,getMonthFinanceList} from "../../utils/api";
	import { app } from "../../utils/app";
	import Vue from 'vue'
	import Vuex from 'vuex'
	
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
			this.getMonthFinanceList()
		},
		mounted() {
		},
		watch: {
		},
		methods: {
			async getMonthFinanceList(){
				let params = {
					searchMonth:202001,
					usertoken:this.shopToken
				}
				let res = await getMonthFinanceList(params)
				console.log(res)
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
