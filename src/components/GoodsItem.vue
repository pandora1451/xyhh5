<template>
	<div class="container">
		<div class="goods-item">
			<div class="image-box">
				<img :src="list.img" alt="商品图">
			</div>
			<div class="title-box">
				{{list.title}}
			</div>
			<div class="price-box">
				<div class="left">¥{{list.price}}</div>
				<div class="right"><del>¥{{list.marketprice}}</del></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GoodsItem',
		props: ['list']
	}
</script>

<style>
	.goods-item {
		font-size: 16px;
		background-color: #ffffff;
	}

	.image-box {
		width: 100%;
	}

	.image-box img {
		width: 100%;
	}

	.goods-item .title-box {
		height: 42px;
		padding: 6px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		display: box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-align: left;
	}

	.goods-item .price-box {
		padding: 10px 16px;
		display: flex;
		justify-content: space-between;
	}

	.goods-item .price-box .left {
		color: #ff3366;
		font-size: 22px;
		font-weight: bold;
	}

	.goods-item .price-box .right {
		color: #999999;
		padding-top: 6px;
	}
</style>
