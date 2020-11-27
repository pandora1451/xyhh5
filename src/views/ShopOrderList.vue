<template>
  <div class="container">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="date-box">
		<div class="title">日期</div>
		<div class="days">{{searchDay}}</div>
		<div class="button-box">
			<button @click="show = true">选日期</button>
		</div>
	</div>
    <div class="data-wrapper">
		列表
	</div>
	<!-- <van-calendar v-model="show" @confirm="onConfirm" :min-date="minDate"/> -->
	<div v-if="show" class="pick-box">
		<van-datetime-picker
		v-model="currentDate"
		type="date"
		:title="searchDay"
		:min-date="minDate"
		:max-date="maxDate"
		@confirm="onConfirm"
		@cancel="onCancel"
		@change="onChange"
	/>
	</div>
  </div>
</template>
<script>
import { indexData, getOrderList } from "../../utils/api";
import { app } from "../../utils/app";
import { NavBar,DatetimePicker } from "vant";	
import Vue from "vue";
import Vuex from "vuex";

Vue.use(DatetimePicker);
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
	  show:'',
	  minDate: new Date(2020, 0, 1),
	  maxDate: new Date(2030,0,1),
	  currentDate: new Date(),
	  searchDay:''
    };
  },
  created() {
    let shopToken = app.storage.get("shopToken");
    this.shopToken = shopToken;
    console.log("shopToken:", this.shopToken);
	this.searchDay =this.timeToDay(new Date()) 
	this.getOrderList();
  },
  mounted() {},
  watch: {},
  methods: {
    async getOrderList() {
      let params = {
        limit: 20,
        offset: 0,
        searchDay: this.searchDay,
        usertoken: this.shopToken,
      };
      let res = await getOrderList(params);
      console.log(res);
	},
	onClickLeft(){
		this.$router.back();
	},
	//日期选择确认
	onConfirm(value){
		console.log(value)
		this.searchDay = this.timeToDay(value)
		this.getOrderList()
		this.show = false
	},
	onClickRight(){
		console.log(1234)
	},
	onCancel(){
		this.show = false
	},
	onChange(picker){
		let value = picker.getValues()
		this.searchDay = `${value[0]}-${value[1]}-${value[2]}`
	},
	timeToDay(value){
		let year = value.getFullYear()
		let month = value.getMonth()>8?value.getMonth()+1:`0${value.getMonth()+1}`
		let date = value.getDate()
		let result = `${year}-${month}-${date}`
		return result
	}
  },
};
</script>
<style>
.date-box{
	display: flex;
	justify-content: space-between;
	padding: 0 1rem;
	align-items: center;
}
.date-box .title{
	min-width: 4rem;
}
.date-box .days{
	min-width: 4rem;
}
.date-box .button-box{
	min-width: 4rem;
}
.data-wrapper button {
  width: 12.5rem;
  height: 3.125rem;
  margin: 0.625rem;
}
.pick-box{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 2;
}
</style>
