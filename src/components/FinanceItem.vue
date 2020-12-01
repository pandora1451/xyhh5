<template>
  <div class="item-finacnce">
    <div class="date">{{evenDate}}</div>
    <div class="income">收入：{{ incomeOn }}</div>
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
      incomeOn:Number,
      paymentOff:Number
  },
  computed: {
    evenDate: function () {
      let result = 1;
      let year = new Date(this.date).getFullYear();
      let mounth = new Date(this.date).getMonth() + 1;
      let day = new Date(this.date).getDate();
      result = `${year}-${mounth}-${day}`;
      return result;
    },
  },
 mounted() {
    //  console.log('111111',this.date)
    //  console.log(new Date(this.date).getFullYear())
  },
  methods: {

  },
};
</script>

<style>
.item-finacnce {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  min-height: 40px;
  align-items: center;
  border-top: 1px solid #555555;
}
</style>
