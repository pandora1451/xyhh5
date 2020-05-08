<template>
	<div id="goods-container">
		<!-- <van-nav-bar title="商品详情--星愿荟商城" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
		<van-nav-bar title="商品详情--星愿荟商城">
		  <template #left >
				<van-icon name="arrow-left" size="16" @click="onClickLeft"/>
				<div class="van-nav-bar__text" @click="onClickLeft">返回</div>
		  </template>
		</van-nav-bar>
		<div class="banner-box">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item v-for="(image, index) in goodsitem.imgs" :key="index">
					<van-image :src="image" />
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="price-box">
			<div class="left" v-if="goodsitem.ccprice">¥{{goodsitem.ccprice}}</div>
			<div class="right" v-if="goodsitem.marketprice"><del>¥{{goodsitem.marketprice}}</del></div>
		</div>
		<div class="title-box">{{goodsitem.title}}</div>
		<div class="specification-box">{{goodsitem.specification}}</div>
		<div class="details-box">
			<div class="title">
				<van-divider>商品详情</van-divider>
			</div>
			<div v-for="(image, index) in goodsitem.goodsdetail" :key="index">
				<van-image lazy-load :src="image" />
			</div>
		</div>
		<van-goods-action>
			<van-goods-action-button type="danger" text="点击前往小程序购买" @click="onClickButton" />
		</van-goods-action>
		<van-overlay :show="show">
			<div class="wrapper" @click.stop="hideIt">
				<div>
					<p class="title">识别下方二维码前往商品页</p>
					<img :src="goodsitem.miniUrl" alt="">
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<script>
	// console.log(this.$route.query.name)
	// @ is an alias to /src
	import axios from 'axios'
	import Vue from 'vue';
	import router from '../router';
	import {
		Swipe,
		SwipeItem,
		Lazyload,
		Image as VanImage,
		Divider,
		NavBar,
		GoodsAction,
		GoodsActionIcon,
		GoodsActionButton,
		Overlay
	} from 'vant';

	Vue.use(Swipe);
	Vue.use(SwipeItem);
	Vue.use(Lazyload);
	Vue.use(VanImage);
	Vue.use(Divider);
	Vue.use(NavBar);
	Vue.use(GoodsAction);
	Vue.use(GoodsActionButton);
	Vue.use(GoodsActionIcon);
	Vue.use(Overlay);

	export default {
		name: 'Goods',
		components: {},
		data() {
			return {
				goodsitem: {
					imgs: null, //banner图
					goodsdetail: null, //详情图
					title: null,
					ccprice: null,
					marketprice: null,
					miniUrl: null,
					specification: null
				},
				show: false
			}
		},
		created() {
			let that = this;
			let id = this.$route.query.id
			let hGoodsid = this.$route.query.hGoodsid
			axios.get(
					process.env.VUE_APP_BASE_URL+'/mall/small/default/goods?token=&goodsid=' + id + '&recommid=&typeid=&attrid=&freeid=&fOrderid=&hGoodsid=' +
					hGoodsid, {})
				.then(function(res) {
					that.goodsitem.imgs = res.data.data.imgs;
					that.goodsitem.goodsdetail = res.data.data.goodsdetail.split(',');
					that.goodsitem.title = res.data.data.title;
					that.goodsitem.ccprice = res.data.data.ccprice;
					that.goodsitem.marketprice = res.data.data.marketprice;
					that.goodsitem.miniUrl = res.data.data.miniUrl;
					that.goodsitem.specification = res.data.data.specification
				})
				.catch(function(error) {
					console.log(error);
				})
				.then(function() {
					// always executed
				});

			this.init()
		},
		methods: {
			init() {
				console.log(this.$route.query.id)
			},
			onClickLeft() {
				router.back(-1)
			},
			onClickButton() {
				this.show = true
			},
			hideIt() {
				this.show = false
			}
		}
	}
</script>

<style>
	#goods-container {
		background-color: #ffffff;
	}

	#goods-container .price-box {
		display: flex;
		padding: 0.625rem 1.125rem;
	}

	#goods-container .price-box .left {
		color: #FF3366;
		font-size: 2.4rem;
		font-weight: bold;
	}

	#goods-container .price-box .right {
		margin-left: 0.625rem;
		padding-top: 0.625rem;
		color: #999999;
		font-size: 1.6rem;
		font-weight: bold;
	}

	#goods-container .title-box {
		font-size: 1.25rem;
		font-weight: bold;
		text-align: left;
		padding: 0.625rem 1.125rem;
	}

	#goods-container .specification-box {
		color: #999999;
		font-size: 1rem;
		font-weight: bold;
		text-align: left;
		padding: 0rem 1.125rem;
	}

	#goods-container .details-box {
		margin-top: 1.25rem;
		padding-bottom: 3rem;
		line-height: 0;
	}

	#goods-container .details-box img {
		width: 100%;
	}

	#goods-container .details-box .title {
		color: #666666;
		text-align: center;
		font-size: 1rem;
	}
	#goods-container .banner-box{
		min-height: 6.25rem;
	}
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #FFFFFF;
		font-size: 0.8rem;
		font-weight: bold;
	}

	.wrapper img {
		width: 50%;
	}

	.block {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}

	.my-swipe .van-image {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}

	.my-swipe .van-image img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
