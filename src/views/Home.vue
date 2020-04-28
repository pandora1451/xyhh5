<template>
	<div id="example-1" class="container">
		<div class="banner-box">
			<img src="../assets/img/banner-hb.jpg" alt="">
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

	export default {
		name: 'Home',
		components: {
			GoodsItem
		},
		data() {
			return {
				list: []
			}
		},
		created() {
			let that = this
			axios.get('/api/mall/small/h5/index', {

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
		},
		methods: {
			init() {
				console.log(this.$route)
			},
			gotolink(id,hGoodsid) {
				// this.$router.push({name: 'goods',params:{ id:'1'}});
				this.$router.push({
					path: '/goods',
					query: {
						id,
						hGoodsid
					}
				});
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
		padding: 0.625rem 1.25rem;
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
