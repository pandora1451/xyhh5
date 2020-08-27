<template>
  <div class="container">
    <div class="img-wrapper">
      <img src="../assets/img/a.png" alt />
    </div>
    <div class="login-box">
    </div>
    <div class="container-form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="mobile"
          name="手机号"
          label="手机号"
          left-icon="user-o"
          placeholder="手机号"
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
        <van-field
          v-model="validateCode"
          type="number"
          name="验证码"
          label="验证码"
          left-icon="chat-o"
          placeholder="验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
        <van-field
          v-model="chatname"
          name="店铺名称"
          label="店铺名"
          left-icon="shop-o"
          placeholder="店铺名称"
          :rules="[{ required: true, message: '请填写店铺名称' }]"
        />
        <van-field
          v-model="wechatAccount"
          name="微信号"
          label="微信号"
          left-icon="friends-o"
          placeholder="微信号"
          :rules="[{ required: true, message: '请填写微信号' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" v-on:click="goLogin">提交注册信息</van-button>
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" v-on:click="goLoginPage">已有账号去登录</van-button>
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
import { Form, Field, Button, CellGroup, Toast } from "vant";
import { getValidateCode, regist } from "../../utils/request";
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
      codeText: "获取",
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
      let params = {
        mobileNo: this.phone,
        token: this.token,
      };
      let res = await getValidateCode(params);
      //  用手机号向后台换取验证码，发送成功则开始调用倒计时分方法
      if (res) {
        this.countDown(60);
      }
    },
    // 表单校验方法
    verifyPhone() {
      if (!this.username) {
        return "请输入手机号";
      } else if (this.username.length !== 11) {
        return "请输入11位手机号";
      } else {
        return false;
      }
    },
    // 倒计时方法
    countDown(time) {
      if (time === 0) {
        this.disabledCodeBtn = true;
        this.codeText = "获取";
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
    // 登录
    async goLogin() {
      let params;
      console.log(111);
      if (this.loginType == 0) {
        console.log(2222);
        params = {
          username: this.username,
          password: this.password,
          loginType: 0,
        };
      } else {
        console.log(33333);
        params = {
          chatname: this.chatname,
          mobile: this.mobile,
          validateCode: this.validateCode,
          wechatAccount:this.wechatAccount
        };
      }
      let res1 = await regist(params)
      console.log('res1',res1)
    //   axios
    //     .post(process.env.VUE_APP_BASE_URL + "/mall/small/h5/regist", { params })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
      // 这里写登录的接口
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
}
</style>
