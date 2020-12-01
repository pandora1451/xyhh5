<template>
  <div class="container set-container">
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
	<div class="user-info">
		<div class="avatar-box">
			<van-uploader :after-read="afterRead" />
		</div>
		<div class="info-box">
			<div class="shop-name">{{shopInfo.shopTitle}}</div>
			<div class="shop-tel">{{shopInfo.shopNo}}</div>
		</div>
	</div>
	<van-cell-group>
		<van-cell title="修改密码" is-link @click="showChange"/>
		<van-cell title="收款二维码" is-link value="" />
		<van-cell title="关于我们" is-link value="" />
		<van-cell title="版本" value="1.0" />
	</van-cell-group>
	<van-popup v-model="showChangePWD" position="bottom" class="pop-layer">
		<van-form @submit="onChangeSubmit">
			<van-field
				v-model="password"
				type="password"
				name="password"
				label="旧密码"
				clearable
				placeholder="旧密码"
			/>
			<van-field
				v-model="passwordNew1"
				type="password"
				name="passwordNew1"
				label="新密码"
				clearable
				placeholder="新密码"
			/>
			<van-field
				v-model="passwordNew2"
				type="password"
				name="passwordNew2"
				label="重复新密码"
				clearable
				placeholder="重复新密码"
			/>
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">
				提交
				</van-button>
			</div>
		</van-form>
	</van-popup>
  </div>
</template>

<script>
import { app } from "../../utils/app";
import Vue from "vue";
import { Uploader,Popup,Form,Field,Button } from "vant";
import { NavBar,Cell, CellGroup  } from "vant";
Vue.use(NavBar);
Vue.use(Uploader);
Vue.use(Popup)
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
export default {
	data() {
		return{
			shopInfo:'',
			showChangePWD:false,
			password:'',
			passwordNew1:'',
			passwordNew2:''
		}
	},
	create(){
		let shopInfo = app.storage.get("shopInfo");
		console.log(shopInfo)
	},
	mounted(){
		let shopInfo = app.storage.get("shopInfo");
		this.shopInfo = shopInfo
	},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    onClickLeft() {
      this.$router.back();
	},
	showChange(){
		this.showChangePWD = true
	},
	onChangeSubmit(values){
		console.log('submit',values)
		if(values.passwordNew1 != values.passwordNew2){
			console.log('两次新密码不相等')
			return
		}else{
			console.log(1)
		}
	}
  },
};
</script>

<style lang="scss">
.set-container{
	/* min-height: calc(100vh - 46px); */
	margin-top: 46px;
	.pop-layer{
		min-height: 300px;
		box-sizing: border-box;
		padding: 20px;
	}
	.user-info{
		display: flex;
		padding: 10px;
		.avatar-box{
			color: #333333;
		}
		.info-box{
			color: #333333;
			font-size: 18px;
		}
	}
}
</style>
