<template>
	<div :class="isCovertMode ? '' : 'container'">
		<div class="nav-bar">头</div>
		<div class="data-wrapper">
			<div class="title">11111</div>
			<div class="finance">222222</div>
			<div class="data-group">
				<div class="order">1</div>
				<div class="group">2</div>
				<div class="balance">3</div>
			</div>
			<div id="myChart" style="width: 100%;height: 300px;border: 1px solid #42B983;box-sizing: border-box;"></div>
			<button @click="clicked1">vuex1</button>
			<button @click="clicked2">vuex2</button>
			<button @click="clicked3">vuex3</button>
		</div>
		<div class="ad">下</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Vuex from 'vuex'
	import { app } from "../../utils/app";
	import {indexData,getOrderList} from "../../utils/request";
	Vue.use(Vuex)
	
	// @ is an alias to /src102.42

	export default {
		name: 'ShopData',
		components: {
		},
		data() {
			return {
				isCovertMode:this.$isCovertMode,
				saleList:'',
				todayAmount:'',
				todayCount:'',
				totalCount:'',
				totalMember:''
			}
		},
		beforeCreate() {
			console.log('beforeCreate')
		},
		async created() {
			console.log('isCovertMode:',this.$isCovertMode)
			let shopToken = this.$store.state.shopToken || app.storage.get("shopToken")
			if(shopToken){
				console.log(shopToken)
				let res = await indexData({usertoken:shopToken})
				this.saleList = res.data.saleList
				this.todayAmount = res.data.todayAmount
				this.todayCount = res.data.todayCount
				this.totalCount = res.data.totalCount
				this.totalMember = res.data.totalMember
			}else{
				this.$router.push({path:'/ShopLogin'})
			}
		},
		beforeMount() {
			console.log('beforeMount')
		},
		mounted() {
			console.log('mounted')
			// this.myEcharts();
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
				this.$router.push({path:'/ShopSet'})
			},
			clicked3(){
				console.log(this.$store.state.shopInfo)
			},
			myEcharts(){
			// 基于准备好的dom，初始化echarts实例
			var myChart = this.$echarts.init(document.getElementById('myChart'));

			// 指定图表的配置项和数据
			var option = {
				title: {
					text: 'ECharts 入门示例'
				},
				tooltip: {},
				legend: {
					data:['销量']
				},
				xAxis: {
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				}]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
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
