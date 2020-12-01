<template>
  <div class="container-finance">
    <van-nav-bar
      title="财务月报"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="date-box">
      <div class="days">{{ searchMonth }}</div>
      <div class="title-box">
        <div class="title">当前余额:</div>
        <div class="content">{{nowPrice}}</div>
      </div>
      <div class="button-box">
        <button @click="txBtnTap">提现</button>
      </div>
    </div>
    <div class="data-wrapper">
        <FinanceItem 
          v-for="item in list"
          :key="item.id"
          :date = "item.settleDay"
          :incomeOn = "item.incomeOn"
          :paymentOff = "item.paymentOff"
        />
    </div>
    <div class="ad"></div>
    <van-popup v-model="showTX" position="bottom" class="pop-layer">
      <van-form @submit="onTX">
        <van-field
          v-model="txPrice"
          type="number"
          name="txPrice"
          label="提现金额"
          clearable
          placeholder="输入金额"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>
<script>
import { getMonthFinanceList } from "../../utils/api";
import FinanceItem from "@/components/FinanceItem.vue";
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
  components: {FinanceItem},
  data() {
    return {
      list: "",
      shopToken: "",
      searchMonth: "2020年11月",
      txPrice: "",
      showTX: false,
      nowPrice:''
    };
  },
  created() {
    let shopToken = app.storage.get("shopToken");
    this.shopToken = shopToken;
    console.log("shopToken:", this.shopToken);
    this.getMonthFinanceList();
  },
  mounted() {

  },
  watch: {},
  methods: {
    async getMonthFinanceList() {
      let params = {
        searchMonth: 202012,
        usertoken: this.shopToken,
      };
      let res = await getMonthFinanceList(params);
      // console.log(res.data.balanceDayList);
      this.list = res.data.balanceDayList
    },
    onClickLeft() {
      this.$router.back();
    },
    txBtnTap() {
      this.showTX = true;
    },
    onTX(values) {
      console.log(values);
    },
  },
};
</script>
<style lang="scss">
.container-finance {
  .data-wrapper button {
    width: 12.5rem;
    height: 3.125rem;
    margin: 0.625rem;
  }
  .pop-layer {
    min-height: 200px;
    box-sizing: border-box;
    padding: 30px;
  }
  .date-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    .title-box{
      display: flex;
      align-items: center;
    }
  }
}
</style>
