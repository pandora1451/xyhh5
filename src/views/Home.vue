<template>
	<div id="example-1" class="container">
		<!-- <van-nav-bar
		  title="星愿荟活动商品"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		/> -->
		<div class="banner-box-home">
			<van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
				<van-swipe-item v-for="(item, index) in bannerList" :key="index">
					<van-image :src="item.imgUrl" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<ul id="example-2" class="goods-container">
			<li v-for="item in list" :key="item.hGoodsid" @click="gotolink(item.id,item.hGoodsid,item.typeid,item.recommid,item.attrid,item.freeid,item.fOrderid)">
				<GoodsItem :list="item" />
			</li>
			<!-- <li v-if="list.length%2 !== 0">
				<p>更多商品请关注「星愿荟」小程序</p>
			</li> -->
		</ul>
		<div class="banner-bottom-box">
			<img src="../assets/img/banner-bottom.jpg" />
		</div>
	</div>
</template>
<script>
	// @ is an alias to /src
	import GoodsItem from '@/components/GoodsItem.vue'
	import axios from 'axios'
	import Vue from 'vue';
	import router from '../router';
	import {
		Swipe,
		SwipeItem,
		Image as VanImage,
		Icon
	} from 'vant';

	Vue.use(Icon);
	Vue.use(Swipe);
	Vue.use(SwipeItem);
	Vue.use(VanImage);

	export default {
		name: 'Home',
		components: {
			GoodsItem
		},
		data() {
			return {
				list: [],
				bannerList: [],
				isShow: true
			}
		},
		created() {
			let that = this

			axios.get(process.env.VUE_APP_BASE_URL + '/mall/small/h5/index', {

				})
				.then(function(res) {
					console.log(res);
					that.list = res.data.data.rows;
					that.bannerList = res.data.bannerList;
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
			gotolink(id, hGoodsid,typeid,recommid,attrid,freeid,fOrderid) {
				// this.$router.push({name: 'goods',params:{ id:'1'}});
				this.$router.push({
					path: '/goods',
					query: {
						id,
						hGoodsid,
						typeid,
						recommid,
						attrid,
						freeid,
						fOrderid
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
		box-shadow: 0px 0px 8px #70a6de;
	}
	.banner-bottom-box{
		width: 100%;
		min-height: 100px;
		padding-bottom: 1rem;
	}
	.banner-bottom-box img{
		width: 100%;
	}
</style>
