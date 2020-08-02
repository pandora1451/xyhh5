<template>
	<div id="goods-container">
		<!-- <van-nav-bar title="商品详情--星愿荟商城" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
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
			<van-goods-action-button type="danger" text="获取购买二维码" @click="onClickButton" />
		</van-goods-action>
		<van-overlay :show="show">
			<div class="wrapper" @click.stop="hideIt($event)">
				<div>
					<p class="title">长按保存下方二维码</p>
					<p class="title">通过「微信扫一扫」识别保存的二维码</p>
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
	import html2canvas from "html2canvas"
	import {
		Swipe,
		SwipeItem,
		Lazyload,
		Image as VanImage,
		Divider,
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
				show: false,
				photoUrl: "",
				photoShow: false
			}
		},
		created() {
			let that = this;
			let id = this.$route.query.id
			let hGoodsid = this.$route.query.hGoodsid
			let typeid = this.$route.query.typeid || ''
			let recommid = this.$route.query.recommid || ''
			let attrid = this.$route.query.attrid || ''
			let freeid = this.$route.query.freeid || ''
			let fOrderid = this.$route.query.fOrderid || ''
			axios.get(
					process.env.VUE_APP_BASE_URL + '/mall/small/default/goods?token=&goodsid=' + id +
					'&recommid='+recommid+'&typeid='+typeid+'&attrid='+attrid+'&freeid='+freeid+'&fOrderid='+fOrderid+'&hGoodsid=' +
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
			hideIt(e) {
				if(e.target.localName !== 'img'){
					this.show = false
				}
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

	#goods-container .banner-box {
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
		width: 60%;
		margin-top: 0.5rem;
	}

	.wrapper .title {
		font-weight: bold;
	}

	.block {
		width: 120px;
		height: 120px;
		background-color: #fff;
	}

	#goods-container .my-swipe .van-image {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}

	#goods-container .my-swipe .van-image img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
