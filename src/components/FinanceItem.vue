<template>
  <div class="item-finacnce" @click="goToDaly">
    <div class="date">{{date}}</div>
    <div class="income">收入：{{ incomeOff }}</div>
    <div class="pay">支出：{{ paymentOff }}</div>
    <van-icon name="arrow" color="#666" />
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);

export default {
  name: "FinaceItem",
  props:{
      date:String,
      incomeOff:Number,
      paymentOff:Number
  },
  computed: {
  },
 mounted() {
    //  console.log('111111',this.date)
    //  console.log(new Date(this.date).getFullYear())
  },
  methods: {
    goToDaly(){
      this.$router.push({path:'/ShopFinanceDaly',query: {date:this.date}})
    }
  },
};
</script>

<style lang="scss">
.item-finacnce {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  min-height: 40px;
  align-items: center;
  border-top: 1px solid #555555;
  text-align: left;
  .date{
    min-width: 100px;
  }
  .income{
    min-width: 100px;
  }
  .pay{
    min-width: 100px;
  }
}
</style>
