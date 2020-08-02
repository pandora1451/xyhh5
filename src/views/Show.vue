<template>
	<div class="container">
		<div class="title">
			<p>自由设计的专属店铺</p>
			<p>随心定制店铺推广码</p>
			<p>特色创新的裂变传播</p>
			<p>会员直播营销全覆盖</p>
		</div>
		<div class="body">
			<div class="img1-box">
			<img src="../assets/img/img1.png" alt="">
			</div>
			<div class="img2-box">
			<img src="../assets/img/img2.png" alt="">
			</div>
		</div>
        <div><p style="color:#333333">------------ 到底线了 ------------</p></div>
		<div class="btn-wrapper">
			<!-- <button v-on:click="btnClick">加入我们</button> -->
            <van-button type="primary" size="large" v-on:click="joinUs">加入我们</van-button>
		</div>
	</div>
</template>
<script>
	// @ is an alias to /src
	import axios from 'axios'
	import Vue from 'vue';
    import router from '../router';
    import {api} from '../../utils/api'
	import {Button
	} from 'vant';

    Vue.use(Button);

	export default {
		name: 'Show',
		components: {
		},
		data() {
			return {
			
			}
		},
		created() {
			console.log(api)
		},
		watch: {
			
		},
		methods: {
			init() {
				console.log(this.$route)
			},
			btnClick() {
				console.log('btn-clicked')
            },
            joinUs(){
                console.log('join us')
            }
		}
	}
</script>
<style>
    .container{
        padding-bottom: 50px;
    }
    .container .title{
        padding: 30px;
        font-size: 22px;
        font-weight: bold;
        background-image: linear-gradient(120deg, #ff3366 0%, #f5576c 100%);
        color: #ffffff;
    }
    .container .body{
        margin-bottom: 20px;
    }
	.container .body .img1-box img{
		width: 60%;
	}
	.container .body .img2-box img{
		width: 60%;
    }
    .btn-wrapper{
        height: 50px;
        width: 100%;
        line-height: 50px;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #ffffff;
    }
</style>
