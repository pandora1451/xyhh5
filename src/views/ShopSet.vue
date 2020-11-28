<template>
  <div class="container">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div>头像</div>
    <van-uploader :after-read="afterRead" />
    <div>数据</div>
  </div>
</template>

<script>
import Vue from "vue";
import { Uploader } from "vant";
import { NavBar } from "vant";
Vue.use(NavBar);
Vue.use(Uploader);
export default {
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>
