<template>
  <div class="container">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="date-box">
      <div class="days">{{ searchMonth }}</div>
      <div class="title-box">
        <div class="title"></div>
        <div class="content"></div>
      </div>
      <div class="button-box">
        <button @click="txBtnTap">提现</button>
      </div>
    </div>
    <div class="data-wrapper"></div>
    <div class="ad">下</div>
  </div>
</template>
<script>
import { getMonthFinanceList } from "../../utils/api";
import { app } from "../../utils/app";
import { NavBar } from "vant";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(NavBar);
Vue.use(Vuex);

// @ is an alias to /src

export default {
  name: "ShopData",
  components: {},
  data() {
    return {
      list: "",
      shopToken: "",
      searchMonth:'2020年11月'
    };
  },
  created() {
    let shopToken = app.storage.get("shopToken");
    this.shopToken = shopToken;
    console.log("shopToken:", this.shopToken);
    this.getMonthFinanceList();
  },
  mounted() {},
  watch: {},
  methods: {
    async getMonthFinanceList() {
      let params = {
        searchMonth: 202001,
        usertoken: this.shopToken,
      };
      let res = await getMonthFinanceList(params);
      console.log(res);
    },
    onClickLeft() {
      this.$router.back();
    },
    txBtnTap(){
      
    }
  },
};
</script>
<style>
.data-wrapper button {
  width: 12.5rem;
  height: 3.125rem;
  margin: 0.625rem;
}
</style>
