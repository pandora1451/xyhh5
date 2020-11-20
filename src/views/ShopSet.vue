<template>
	<div class="container">
		<div>头像</div>
		<van-uploader :after-read="afterRead" />
		<div>数据</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Uploader } from "vant";
	Vue.use(Uploader);
	export default {
	  methods: {
	    afterRead(file) {
	      // 此时可以自行将文件上传至服务器
	      console.log(file);
	    },
	  },
	};
</script>

<style>
</style>
