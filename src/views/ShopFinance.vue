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
        <div class="title">当前余额:{{remainAmount}}</div>
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
          :date = "item.settleDayStr"
          :incomeOff = "item.incomeOff"
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
import { getMonthFinanceList ,indexData,withDraw} from "../../utils/api";
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
      token:'',
      shopToken: "",
      searchMonth: "",
      txPrice: "",
      showTX: false,
      nowPrice:'',
      remainAmount:''
    };
  },
  created() {
    let token = app.storage.get("token");
    this.token = token
    let shopToken = app.storage.get("shopToken");
    this.shopToken = shopToken;
    console.log("shopToken:", this.shopToken);
    this.getMonthFinanceList();
    this.searchMonth = this.getNowMonth(0)
  },
  mounted() {
    this.indexData()
  },
  watch: {},
  methods: {
    async getMonthFinanceList() {
      let nSearchMonth = this.getNowMonth()
      let params = {
        searchMonth: nSearchMonth,
        usertoken: this.shopToken,
      };
      let res = await getMonthFinanceList(params);
      // console.log(res.data.balanceDayList);
      this.list = res.data.balanceDayList
    },
    async indexData(){
      let res = await indexData({
        usertoken: this.shopToken,
      });
      this.remainAmount = res.data.remainAmount;
    },
    onClickLeft() {
      this.$router.back();
    },
    txBtnTap() {
      this.showTX = true;
    },
    async onTX(values) {
      console.log(values);
      let val = values.txPrice
      let params = {
        fee:val,
        token:this.token,
        usertoken:this.shopToken
      }
      let res = await withDraw(params)
      console.log(res)
    },
    getNowMonth(type){
      let d= new Date()
      let year= d.getFullYear()
      let month= d.getMonth()<9?`0${d.getMonth()+1}`:d.getMonth()+1
      if (type==0) {
        return `${year}年${month}月`
      }else{
        return `${year}${month}`
      }
    }
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
