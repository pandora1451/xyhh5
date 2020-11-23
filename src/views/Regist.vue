<template>
  <div class="container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <div class="img1-box">
          <img src="../assets/img/a.png" alt />
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="img2-box">
          <img src="../assets/img/c.png" alt />
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="login-box">
    </div>
    <div class="container-form">
      <van-form>
        <van-field
          v-model="mobile"
          name="手机号"
          label="手机号"
          left-icon="user-o"
          placeholder=""
          :rules="[{ required: true, message: '请填写手机号' },
			{ pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！'}]"
        >
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="sendVerifycode()"
            :disabled="!disabledCodeBtn"
          >{{codeText}}</van-button>
        </van-field>
      </van-form>
      <van-form>
         <van-field
          v-model="validateCode"
          type="number"
          name="验证码"
          label="验证码"
          left-icon="chat-o"
          placeholder=""
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
        <van-field
          v-model="chatname"
          name="店铺名称"
          label="店铺名"
          left-icon="shop-o"
          placeholder=""
          :rules="[{ required: true, message: '请填写店铺名称' }]"
        />
        <van-field
          v-model="wechatAccount"
          name="微信号"
          label="微信号"
          left-icon="friends-o"
          placeholder=""
          :rules="[{ required: true, message: '请填写微信号' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" v-on:click="goRegist">提交入驻</van-button>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" v-on:click="goLoginPage">账号登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import router from "../router";
import { app } from "../../utils/app";
import { Form, Field, Button, CellGroup, Toast,Swipe,SwipeItem ,Dialog} from "vant";
import { getValidateCode, regist } from "../../utils/api";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(CellGroup);
Vue.use(Toast);

import { root } from "../../utils/api";
console.log(root);
export default {
  data() {
    return {
      codeText: "获取验证码",
      disabledCodeBtn: true,
      token: "",
      mobile:"",//手机号
      chatname:"",//店铺名称
      validateCode:"",//验证码
      wechatAccount:""//微信号
    };
  },
  async created() {
    // app.storage.set("token", "bd73938c37ec421fa545e530990d4cf4");
    let t = await app.storage.get("token");
    this.token = t;
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    typeChange(e) {
      console.log(e.target.dataset.type);
      this.loginType = e.target.dataset.type;
    },
    // 向后台要验证码方法
    async sendVerifycode() {
      console.log(1);
      if(this.verifyPhone()){
        Toast(this.verifyPhone())
      }else{
        let params = {
          mobileNo: this.mobile,
          token: this.token,
        };
        let res = await getValidateCode(params);
        //  用手机号向后台换取验证码，发送成功则开始调用倒计时分方法
        if (res) {
          this.countDown(60);
          Toast(res.data.message)
        }
      }
    },
    // 表单校验方法
    verifyPhone() {
      if (!this.mobile) {
        return "请输入手机号";
      } else if (this.mobile.length !== 11) {
        return "请输入11位手机号";
      } else {
        return false;
      }
    },
    // 倒计时方法
    countDown(time) {
      if (time === 0) {
        this.disabledCodeBtn = true;
        this.codeText = "获取验证码";
        return;
      } else {
        this.disabledCodeBtn = false;
        this.codeText = "重新发送(" + time + ")";
        time--;
      }
      setTimeout(() => {
        this.countDown(time);
      }, 1000);
    },
    // 注册
    async goRegist() {
      let params;
      console.log(111);
      params = {
        chatname: this.chatname,
        mobile: this.mobile,
        validateCode: this.validateCode,
        wechatAccount:this.wechatAccount,
        token:this.token
      };
      let res1 = await regist(params)
      console.log('res1',res1)
      if(res1.data.code == 0){
        console.log('申请提交，跳转到登录页面')
        Dialog.alert({ message: res1.data.msg }).then(()=>{
          this.$router.push('/Login');
        });
      }else{
        Dialog.alert({ message: res1.data.msg }).then(()=>{

        });
      }
    },
    getValidateCode() {},
    goLoginPage(){
        this.$router.push('/Login');
    }
  },
};
</script>
<style lang="less">
.container {
  background-color: #ffffff;
  .img-wrapper {
    background-color: #ffffff;
    text-align: center;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
    }
  }
  .body .img1-box img {
    width: 100%;
  }
  .body .img2-box img {
    width: 100%;
  }
  .login-box {
    .tags {
      display: flex;
      justify-content: space-around;
      .tag {
        text-align: center;
        font-size: 18px;
        &.active {
          font-size: 22px;
        }
      }
    }
  }
  .container-form{
      margin: 10px 20px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      top: -20px;
  }
  .my-swipe{
     .img1-box img {
      width: 100%;
    }
    .img2-box img {
      width: 100%;
    }
  }
}
</style>
