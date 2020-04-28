<template>
	<div id="goods-container">
		<div class="banner-box">{{goodsitem.imgs}}</div>
		<div class="price-box">
			<div class="left">{{goodsitem.ccprice}}</div>
			<div class="right"><del>{{goodsitem.marketprice}}</del></div>
		</div>
		<div class="title-box">{{goodsitem.title}}</div>
		<div class="specification-box">{{goodsitem.specification}}</div>
		<div class="details-box"></div>
	</div>
</template>

<script>
	// console.log(this.$route.query.name)
	// @ is an alias to /src
	import axios from 'axios'

	export default {
		name: 'Goods',
		components: {},
		data() {
			return {
				goodsitem: {
					imgs: null,//banner图
					imgmore: null,//详情图
					title: null,
					ccprice: null,
					marketprice: null,
					miniUrl: null,
					specification:null
				}
			}
		},
		created() {
			let that = this;
			let id = this.$route.query.id
			let hGoodsid = this.$route.query.hGoodsid
			axios.get(
					'/api/mall/small/default/goods?token=&goodsid=' + id + '&recommid=&typeid=&attrid=&freeid=&fOrderid=&hGoodsid=' +
					hGoodsid, {})
				.then(function(res) {
					that.goodsitem.imgs = res.data.data.imgs;
					that.goodsitem.imgmore = res.data.data.imgmore;
					that.goodsitem.title = res.data.data.drawTitle;
					that.goodsitem.ccprice = res.data.data.ccprice;
					that.goodsitem.marketprice = res.data.data.marketprice;
					that.goodsitem.miniUrl = res.data.data.miniUrl;
					that.goodsitem.specification=res.data.data.specification
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
			}
		}
	}
</script>

<style>
	#goods-container{
		
	}
	#goods-container .price-box{
		display: flex;
		padding: 0.625rem 1.125rem;
	}
	#goods-container .price-box .left{
		color: #FF3366;
		font-size: 1.5rem;
		font-weight: bold;
	}
	#goods-container .price-box .right{
		color: #999999;
		font-size: 1rem;
		font-weight: bold;
	}
	#goods-container .title-box{
		font-size: 1.25rem;
		font-weight: bold;
		text-align: left;
		padding: 0.625rem 1.125rem;
	}
</style>
