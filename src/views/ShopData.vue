<template>
	<div class="container">
		<div class="nav-bar">头</div>
		<div class="data-wrapper">
			<button @click="clicked">vuex</button>
		</div>
		<div class="ad">下</div>
	</div>
</template>
<script>
	// @ is an alias to /src
	

	export default {
		name: 'ShopData',
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
			clicked(){
				console.log(1234)
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
