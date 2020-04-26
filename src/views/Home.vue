<template>
	<div class="home">
		<div class="banner-box">
			<img src="../assets/img/banner-hb.jpg" alt="">
		</div>
		<GoodsItem />
	</div>
</template>

<script>
	// @ is an alias to /src
	import GoodsItem from '@/components/GoodsItem.vue'
	const axios = require('axios');

	axios.get('/api/mall/small/h5/index', {

		})
		.then(function(response) {
			console.log(response);
		})
		.catch(function(error) {
			console.log(error);
		})
		.then(function() {
			// always executed
		});


	export default {
		name: 'Home',
		components: {
			GoodsItem
		}
	}
</script>
<style>
	.banner-box img {
		width: 100%;
	}
</style>
