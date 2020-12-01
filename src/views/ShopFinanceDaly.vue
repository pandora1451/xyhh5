<template>
  <div class="container-finance-daly">
    <van-nav-bar
      title="CWYB"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="data-wrapper">
        <FinanceItem 
          v-for="item in list"
          :key="item.id"
          :date = "item.settleDay"
          :incomeOn = "item.incomeOn"
          :paymentOff = "item.paymentOff"
        />
    </div>
  </div>
</template>
<script>
// import { getDayFinanceList } from "../../utils/api";
import FinanceItem from "@/components/FinanceItem.vue";
// import { app } from "../../utils/app";
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
      list:''
    };
  },
  created() {

  },
  mounted() {

  },
  watch: {},
  methods: {
      onClickLeft() {
      this.$router.back();
    }
  },
};
</script>
<style lang="scss">

</style>
