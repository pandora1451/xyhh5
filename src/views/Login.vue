<template>
  <div class="container">
    <div class="img-wrapper">
      <!-- <img src="../assets/img/d.png" alt /> -->
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
    <div class="container">
      <template v-if="loginType==0">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </template>
      <template v-else>
        <van-form @submit="onSubmit">
          <van-field
            v-model="phone"
            name="手机号"
            label="手机号"
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
            v-model="verifycode"
            type="password"
            name="验证码"
            label="验证码"
            placeholder="验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </template>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import router from "../router";
import { Form, Field, Button,CellGroup,Toast } from "vant";
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(CellGroup);
Vue.use(Toast);

import { root } from "../../utils/api";
console.log(root)
export default {
  data() {
    return {
      username: "",
	  password: "",
      loginType: 0,
      codeText: "获取",
	  disabledCodeBtn: true,
	  phone: '',
	  verifycode: ''
    };
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
		console.log(1)
      if (this.verifyPhone()) {
		  console.log(2)
        Toast(this.verifyPhone());
      } else {
		  console.log(3)
        let res = await root.interFace.getValidateCode(this.phone);
        //  用手机号向后台换取验证码，发送成功则开始调用倒计时分方法
        if (res) {
          this.countDown(60);
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
    login() {
      if (this.verifyPhone()) {
        Toast(this.verifyPhone());
      } else {
        let params = {
          phone: this.phone,
          code: this.verifycode,
        };
        // 这里写登录的接口
      }
    },
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
      .tag {
        text-align: center;
        font-size: 18px;
        &.active {
          font-size: 22px;
        }
      }
    }
  }
}
</style>
