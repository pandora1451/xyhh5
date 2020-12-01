<template>
  <div :class="isCovertMode ? 'container2' : 'container'">
    <van-nav-bar
      title="星店"
      left-text="返回"
      right-text="设置"
      fixed
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-pull-refresh head-height v-model="isLoading" @refresh="onRefresh">
      <div class="pull-container">
        <div class="data-wrapper">
          <div v-if="!isCovertMode" class="title">
            {{ time }}({{ day }})销售金额
          </div>
          <div class="finance">￥{{ todayAmount }}</div>
          <div class="data-group">
            <div class="order data-item" @click="clicked1">
              <div class="count">{{ todayCount }}</div>
              <div class="name">订单数量</div>
            </div>
            <div class="group data-item" @click="clicked2">
              <div class="count">{{ totalMember }}</div>
              <div class="name">团队数量</div>
            </div>
            <div class="balance data-item" @click="clicked3">
              <div class="count">{{ remainAmount }}</div>
              <div class="name">账号余额</div>
            </div>
          </div>
        </div>
        <div
          v-if="!isCovertMode"
          id="myChart"
        ></div>
        <div class="ad"></div>
        <p>刷新次数: {{ count }}</p>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import Vue from "vue";
import Vuex from "vuex";
import { app } from "../../utils/app";
import { indexData } from "../../utils/api";
// import NavBar from '@/components/NavBar'
import { NavBar, PullRefresh } from "vant";

Vue.use(PullRefresh);
Vue.use(NavBar);
Vue.use(Vuex);

// @ is an alias to /src102.42

export default {
  name: "ShopData",
  components: {},
  data() {
    return {
      isCovertMode: this.$isCovertMode,
      saleList: "",
      todayAmount: "",
      todayCount: "",
      totalCount: "",
      totalMember: "",
      remainAmount: "",
      series: {
        name: "销量",
        type: "bar",
        data: [],
      },
      xAxis: {
        data: [],
      },
      time: "",
      day: "",
      count: 0,
      isLoading: false,
    };
  },
  created() {
    console.log("isCovertMode:", this.$isCovertMode);
    this.indexData();

    let times = this.getTime();
    this.time = times;
    console.log(times);
  },
  mounted() {
    console.log("mounted");
    if(!this.isCovertMode){
      setTimeout(()=>{
      // this.myEcharts();
    },1500)
    }
  },
  watch: {},
  methods: {
    async indexData() {
      let shopToken =
        this.$store.state.shopToken || app.storage.get("shopToken");
      if (shopToken) {
        console.log(shopToken);
        let res = await indexData({
          usertoken: shopToken,
        });
        this.saleList = res.data.saleList;
        this.todayAmount = res.data.todayAmount;
        this.todayCount = res.data.todayCount;
        this.totalCount = res.data.totalCount;
        this.totalMember = res.data.totalMember;
        this.remainAmount = res.data.remainAmount;

        let seriesData = [];
        let xAxisData = [];
        res.data.saleList.forEach((res) => {
          seriesData.push(res.count);
          xAxisData.push(res.displayDay);
        });
        this.series.data = seriesData;
        this.xAxis.data = xAxisData;
        // this.myEcharts();
        this.day = this.getDay();
      } else {
        this.$router.push({
          path: "/ShopLogin",
        });
      }
    },
    clicked1() {
      // console.log(this.$store.state.token)
      this.$router.push({
        path: "/ShopOrderList",
      });
    },
    clicked2() {
      // console.log(this.$store.state.userInfo)
      this.$router.push({
        path: "/ShopFriends",
      });
    },
    clicked3() {
      // console.log(this.$store.state.shopInfo)
      this.$router.push({
        path: "/ShopFinance",
      });
    },
    clicked4() {
      // console.log(this.$store.state.userInfo)
      this.$router.push({
        path: "/ShopSet",
      });
    },
    onClickRight() {
      this.$router.push({
        path: "/ShopSet",
      });
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "周销量",
        },
        color:'#ff3366',
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: this.xAxis,
        yAxis: {},
        series: [this.series],
        textStyle:{
          color:'#333333',
          fontSize:18,
          fontWeight:'Bold'
        }
      };
      console.log("option", option);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getTime() {
      var date = new Date();
      var Y = date.getFullYear() + "/";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "/";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return Y + M + D;
    },
    getDay() {
      let dayNo = new Date().getDay();
      let res;
      switch (dayNo) {
        case 1:
          res = "星期一";
          break;
        case 2:
          res = "星期二";
          break;
        case 3:
          res = "星期三";
          break;
        case 4:
          res = "星期四";
          break;
        case 5:
          res = "星期五";
          break;
        case 6:
          res = "星期六";
          break;
        case 7:
          res = "星期日";
          break;
        default:
          break;
      }
      return res;
    },
    onRefresh() {
      this.indexData();
      setTimeout(() => {
        console.log("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss">
$white: #ffffff;
$red1: #ff3366;
$black: #000000;

.data-wrapper{
  color: $black;
  text-align: center;
  .finance{
    height: 2rem;
    line-height: 2rem;
  }
  button {
    width: 12.5rem;
    height: 3.125rem;
    margin: 0.625rem;
  }
}
.data-group {
  display: flex;
  justify-content: space-between;
  padding: 10px;
	.data-item{
		min-width: 30%;
		text-align: center;
		height: 4rem;
		line-height: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .count{
      height: 1rem;
    }
    .name{
      height: 1rem;
    }
	}
}

#app {
  min-height: 100vh;
}
.container2 {
  padding-top: 46px;
}
.ad {
  min-height: 300px;
}
.pull-container {
  min-height: calc(100vh - 46px);
  margin-top: 46px;
  #myChart{
    width: 100%;
    height: 300px;
    box-sizing: border-box;
  }
}
</style>
