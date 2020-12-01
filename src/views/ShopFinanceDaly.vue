<template>
  <div class="container-finance-daly">
    <van-nav-bar
      title="CWYB"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="data-wrapper">
        <FinanceItemDaly 
          v-for="item in list"
          :key="item.id"
          :payType = "item.operationType"
          :orderSn = "item.ordersn"
          :date = "item.createDate"
          :amount = "item.amount"
        />
    </div>
  </div>
</template>
<script>
import { getDayFinanceList } from "../../utils/api";
import FinanceItemDaly from "@/components/FinanceItemDaly.vue";
import { app } from "../../utils/app";
import { NavBar, Uploader, Popup, Form, Field, Button } from "vant";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(NavBar);
Vue.use(Vuex);
Vue.use(Uploader);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);

// @ is an alias to /src

export default {
  name: "ShopData",
  components: {FinanceItemDaly},
  data() {
    return {
      list:''
    };
  },
  created() {
    let shopToken = app.storage.get("shopToken");
    this.shopToken = shopToken;
    console.log("shopToken:", this.shopToken);
    this.getDayFinanceList();
  },
  mounted() {

  },
  watch: {},
  methods: {
      onClickLeft() {
      this.$router.back();
    },
    async getDayFinanceList() {
      let params = {
        limit:20,
        offset:0,
        searchDay: '2020-11-28',
        usertoken: this.shopToken,
      };
      let res = await getDayFinanceList(params);
      console.log(res.data.balanceInfoList);
      this.list = res.data.balanceInfoList
    },
  },
};
</script>
<style lang="scss">

</style>
