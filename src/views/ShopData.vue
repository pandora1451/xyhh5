<template>
	<div class="container">
		<div class="nav-bar">头</div>
		<div class="data-wrapper">
			<button @click="clicked1">vuex1</button>
			<button @click="clicked2">vuex2</button>
			<button @click="clicked3">vuex3</button>
		</div>
		<div class="ad">下</div>
	</div>
</template>
<script>
	import {indexData} from "../../utils/request";
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
			}
		},
		beforeCreate() {
			console.log('beforeCreate')
		},
		async created() {
			console.log('created')
			let token = this.$store.state.token
			if(token){
				console.log(token)
				let res = indexData({usertoken:token})
				console.log('res',res)
			}else{
				this.$router.push({path:'/ShopLogin'})
			}
		},
		beforeMount() {
			console.log('beforeMount')
		},
		mounted() {
			console.log('mounted')
		},
		beforeUpdate() {
			console.log('beforeUpdate')
		},
		updated() {
			console.log('updated')
		},
		beforeDestroy() {
			console.log('beforeDestroy')
		},
		destroyed() {
			console.log('destroyed')
		},
		watch: {
		},
		methods: {
			clicked1(){
				console.log(this.$store.state.token)
			},
			clicked2(){
				console.log(this.$store.state.userInfo)
			},
			clicked3(){
				console.log(this.$store.state.shopInfo)
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
