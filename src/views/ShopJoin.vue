<template>
	<div class="container">
		1234
	</div>
</template>
<script>
	// @ is an alias to /src
	import {
	} from 'vant';

	import { app } from "../../utils/app";

	export default {
		name: 'ShopJoin',
		components: {
		},
		data() {
			return {
				hasToken:false
			}
		},
		beforeCreate(){
			app.storage.removeAll()
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
				var url = window.location.href;
				if (url.indexOf('https://open.weixin.qq.com/connect/oauth2/authorize') == -1 && !query['code']) {
					//不是授权页面，且没有code参数
					window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6d4b592411ae15a0&redirect_uri=' +
						url + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
				} else {
					var ua = window.navigator.userAgent.toLowerCase();
					if (ua.match(/MicroMessenger/i) == 'micromessenger') {
						if (query['code']) {
							app.loadWechat(query['code'], 'shop');
						} else {
							alert('授权失败~');
						}
					} else {
						alert('请在微信浏览器下打开~');
					}
				}
				// };
			}
		}
	}
</script>
<style lang="less">
</style>
