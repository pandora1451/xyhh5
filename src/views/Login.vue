<template>
  <div class="container1">
    <div class="img-wrapper">
      <img src="../assets/img/d.png" alt />
    </div>
    <div class="login-box">
      <div class="tags">
        <div
          class="tag"
          v-bind:class="loginType==0?'active':''"
          v-on:click="typeChange"
          data-type="0"
        >账号密码登录</div>
        <div
          class="tag"
          v-bind:class="loginType==1?'active':''"
          v-on:click="typeChange"
          data-type="1"
        >短信验证码登录</div>
      </div>
    </div>
    <div class="container-form">
      <template v-if="loginType==0">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            left-icon="manager-o"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            left-icon="closed-eye"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button
              class-prefix="my-btn"
              round
              block
              type="primary"
              native-type="submit"
              v-on:click="goLogin"
            >登录</van-button>
          </div>
        </van-form>
      </template>
      <template v-else>
        <van-form @submit="onSubmit">
          <van-field
            v-model="phone"
            name="手机号"
            label="手机号"
            left-icon="user-o"
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
            v-model="verifycode"
            type="password"
            name="验证码"
            label="验证码"
            left-icon="chat-o"
            :rules="[{ required: true, message: '请填写验证码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit" v-on:click="goLogin">登录</van-button>
          </div>
        </van-form>
      </template>
    </div>
    <van-overlay :show="show" @click="overlayClick">
      <div class="wrapper">
        <div class="block">
          <p class="title">恭喜您通过审核！</p>
          <p class="title2">请登录PC端管理后台，装修店铺，上传商品，处理订单。地址：</p>
          <p class="url">https://man.ydxyh.cn</p>
          <p class="bot">——星愿荟</p>
        </div>
      </div>
    </van-overlay>
  </div>
  
</template>
<script>
import axios from "axios";
import Vue from "vue";
import router from "../router";
import { app } from "../../utils/app";
import { Form, Field, Button, CellGroup, Toast,Dialog,Overlay } from "vant";
import { getValidateCode, login } from "../../utils/api";
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(CellGroup);
Vue.use(Toast);
Vue.use(Overlay);

import { root } from "../../utils/api";
console.log(root);
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      phone: "", //手机号
      verifycode: "", //验证码
      loginType: 0, //登录方式0账号密码1手机号验证码
      codeText: "获取验证码",
      disabledCodeBtn: true,
      token: "",
      show:false
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
          mobileNo: this.phone,
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
      if (!this.phone) {
        return "请输入手机号";
      } else if (this.phone.length !== 11) {
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
    // 登录
    async goLogin() {
      let params;
      if (this.loginType == 0) {
        console.log(2222);
        params = {
          username: this.username,
          password: this.password,
          loginType: 0,
        };
      } else {
        params = {
          username: this.phone,
          password: this.verifycode,
          loginType: 1,
        };
      }
      let res1 = await login(params)
      console.log('res1',res1,res1.data.msg)
      if(res1.status == 200){
        if(res1.data.code == 0){
          if(res1.data.state == 0){
            Dialog.alert({
              message: res1.data.content
            }).then(() => {
              console.log('用户确认')
            });
          }else if(res1.data.state == 1){
            this.show = true
          }else{
            Dialog.alert({
              message: res1.data.content
            }).then(() => {
              console.log('用户确认')
            });
          }
        }else{
          Dialog.alert({
            message: res1.data.msg
          }).then(() => {
            console.log('用户确认')
          });
        }
      }else{
        Dialog.alert({
          message: res1.data.msg
        }).then(() => {
          console.log('用户确认')
        });
      }
    },
    getValidateCode() {},
    overlayClick(){
      console.log(1)
      this.show = false
    }
  },
};
</script>
<style lang="less">
.container1 {
  background-color: #ffffff;
  .img-wrapper {
    background-color: #ffffff;
    text-align: center;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 40%;
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
      padding: 0 30px;
      .tag {
        text-align: center;
        font-size: 16px;
        height: 22px;
        padding: 0 10px;
        line-height: 22px;
        color: #888888;
        box-sizing: border-box;
        &.active {
          font-size: 16px;
          color: #333333;
          border-bottom: 1px solid #dedede;
        }
      }
    }
  }
  .container-form {
    padding: 10px 20px;
    .van-button--small {
      height: 24px;
      line-height: 24px;
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 320px;
    height: 360px;
    padding: 40px 20px 20px 20px;
    background-color: #fff;
    border-radius: 20px;
    font-size: 22px;
    .title{
      font-size: 26px;
    text-align: center;
    }
    .title2{
      font-size: 20px;
      margin-top: 20px;
      text-align: left;
    }
    .url{
      font-size: 24px;
      font-weight: bold;
      color:#0364e4;
      text-align: left;
    }
    .bot{
      text-align: right;
      color: #FF3366;
      font-size: 22px;
      margin-top: 100px;
      font-weight: bold;
    }
  }
}
</style>
