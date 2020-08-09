<template>
  <div class="container">
    <div class="title">
      <p>自由设计的专属店铺</p>
      <p>随心定制店铺推广码</p>
      <p>特色创新的裂变传播</p>
      <p>会员直播营销全覆盖</p>
    </div>
    <div class="body">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <div class="img1-box">
            <img src="../assets/img/img1.png" alt />
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="img2-box">
            <img src="../assets/img/img2.png" alt />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="footer">
      <p>------------ 到底线了 ------------</p>
    </div>
    <div class="btn-wrapper">
      <!-- <button v-on:click="btnClick">加入我们</button> -->
      <van-button type="primary" size="large" v-on:click="joinUs">加入我们</van-button>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import Vue from "vue";
import router from "../router";


import { Button, Swipe, SwipeItem } from "vant";
Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
  name: "Show",
  components: {},
  data() {
    return {};
  },
  created() {
  },
  watch: {},
  methods: {
    init() {
      console.log(this.$route);
    },
    btnClick() {
      console.log("btn-clicked");
    },
    joinUs() {
      this.$router.push({
        path: "/join",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding-bottom: 50px;
  .title {
    padding: 30px;
    font-size: 22px;
    font-weight: bold;
    background-image: linear-gradient(120deg, #ff3366 0%, #f5576c 100%);
    color: #ffffff;
  }
  .body {
    padding-top: 20px;
    padding-bottom: 20px;
    // border-top: 1px solid #dedede;
    // border-bottom: 1px solid #dedede;
    .img1-box img {
      width: 70%;
      border-radius: 10px;
    }
    .img2-box img {
      width: 70%;
      border-radius: 10px;
    }
  }
  .footer {
    color: #c7c7c7;
  }
  .btn-wrapper {
    height: 50px;
    width: 100%;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
  }
}
</style>
