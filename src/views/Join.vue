<template>
	<div class="container">
		授权页内容
	</div>
</template>
<script>
	// @ is an alias to /src
	import axios from 'axios'
	import Vue from 'vue';
	import router from '../router';
	import {
	} from 'vant';

	import { app } from "../../utils/app";
	import { api } from "../../utils/api";

	import { appid } from "../../utils/const";

	export default {
		name: 'Home',
		components: {
		},
		data() {
			return {
				hasToken:false
			}
		},
		created() {
			this.login()
		},
		watch: {
			
		},
		methods: {
			init() {
				console.log('route',this.$route)
			},
			login(){
				var query = app.parseUrlQuery();
				if (app.checkToken()) {
					var token = app.checkToken();
					console.log(token)
					var userData = app.storage.get('userData');
					if (userData.wechatUrl && userData.wechatUrl != '/0') {
						var imgUrl = userData.wechatUrl;
					} else {
						var imgUrl = 'img/w3.png';
					}
					// $('.thumb>img').attr('src', imgUrl);
					// $('.person>.nick>span').html(userData.wechatName);
					app.loadUserMsgStatus(token, 'user');
				} else {
					var url = window.location.href;
					if (url.indexOf('https://open.weixin.qq.com/connect/oauth2/authorize') == -1 && !query['code']) {
						window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6d4b592411ae15a0&redirect_uri=' +
							url + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
					} else {
						var ua = window.navigator.userAgent.toLowerCase();
						if (ua.match(/MicroMessenger/i) == 'micromessenger') {
							if (query['code']) {
								app.loadWechat(query['code'], 'user');
							} else {
								alert('授权失败~');
							}
						} else {
							alert('请在微信浏览器下打开~');
						}
					}
				};
			}
		}
	}
</script>
<style>
	.container .body .img1-box img{
		width: 100%;
	}
	.container .body .img2-box img{
		width: 100%;
	}
</style>
