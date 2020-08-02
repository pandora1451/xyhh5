<template>
	<div class="container">
		<div class="title">
			<p>自由设计的专属店铺</p>
			<p>随心定制店铺推广码</p>
			<p>特色创新的裂变传播</p>
			<p>会员直播营销全覆盖</p>
		</div>
		<div class="body">
			<div class="img1-box">
			<img src="../assets/img/img1.png" alt="">
			</div>
			<div class="img2-box">
			<img src="../assets/img/img2.png" alt="">
			</div>
		</div>
		<div class="btn-wrapper">
			<button v-on:click="btnClick">加入我们</button>
		</div>
	</div>
</template>
<script>
	// @ is an alias to /src
	import axios from 'axios'
	import Vue from 'vue';
	import router from '../router';
	import {
	} from 'vant';


	export default {
		name: 'Home',
		components: {
		},
		data() {
			return {
			
			}
		},
		created() {
			
		},
		watch: {
			
		},
		methods: {
			init() {
				console.log(this.$route)
			},
			btnClick() {
				console.log('btn-clicked')
			}
		}
	}
</script>
<style>
	
</style>
