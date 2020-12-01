<template>
  <div class="item-finacnce">
    <div class="left">
      <div class="title">
        <div class="type">支付方式{{ payType }}</div>
        <div class="sn">{{ orderSn }}</div>
      </div>
      <div class="content">{{ date }}</div>
    </div>
    <div class="right">￥{{ amount }}</div>
  </div>
</template>

<script>
export default {
  name: "FinaceItemDaly",
  props: {
    payType: null,
    orderSn: String,
    date: String,
    amount: Number,
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
  create(){
      
  },
  mounted() {
    //  console.log('111111',this.date)
    //  console.log(new Date(this.date).getFullYear())
    // let query = this.$route.query.date
    // console.log('555555',query)
  },
  methods: {},
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
