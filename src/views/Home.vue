<template>
	<div id="example-1" class="container">
		<!-- <van-nav-bar
		  title="星愿荟活动商品"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		/> -->
		<van-nav-bar title="活动商品合集--星愿荟商城">
		<!-- 	<template #left>
				<van-icon name="arrow-left" size="18" />
				<span size="18">返回</span>
			</template> -->
			<!-- <template #right>
		    <van-icon name="search" size="18" />
		  </template> -->
		</van-nav-bar>
		<div class="banner-box">
			<img src="../assets/img/banner-hb.png" alt="">
		</div>
		<div>
		</div>
		<ul id="example-2" class="goods-container">
			<li v-for="item in list" :key="item.hGoodsid" @click="gotolink(item.id,item.hGoodsid)">
				<GoodsItem :list="item" />
			</li>
		</ul>
	</div>
</template>

<script>
	// @ is an alias to /src
	import GoodsItem from '@/components/GoodsItem.vue'
	import axios from 'axios'
	import Vue from 'vue';
	import router from '../router';
	import {
		NavBar,
		Icon
	} from 'vant';

	Vue.use(Icon);
	Vue.use(NavBar);

	export default {
		name: 'Home',
		components: {
			GoodsItem
		},
		data() {
			return {
				list: [],
				isShow: true
			}
		},
		created() {
			let that = this
			
			axios.get(process.env.VUE_APP_BASE_URL+'/mall/small/h5/index', {

				})
				.then(function(res) {
					console.log(res);
					that.list = res.data.data.rows
				})
				.catch(function(error) {
					console.log(error);
				})
				.then(function() {
					// always executed
				});
			this.init();
			
			console.log(process.env.VUE_APP_BASE_URL)
		},
		watch: {
			$route(now, old) { //监控路由变换，控制返回按钮的显示
				if (now.path == "/home/home") {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
			}
		},
		methods: {
			init() {
				console.log(this.$route)
			},
			gotolink(id, hGoodsid) {
				// this.$router.push({name: 'goods',params:{ id:'1'}});
				this.$router.push({
					path: '/goods',
					query: {
						id,
						hGoodsid
					}
				});
			},
			onClickLeft() {
				router.back(-1)
			}
		}
	}
</script>
<style>
	.banner-box {
		display: block;
	}

	.banner-box img {
		width: 100%;
	}

	.goods-container {
		padding: 0.625rem 0.55rem;
		display: flex;
		display: -webkit-flex;
		/* Safari */
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.goods-container li {
		width: 49%;
		display: block;
		margin: 0.25rem 0;
	}
</style>