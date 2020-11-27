<template>
  <div class="order-item-container">
    <div class="top">
      <div class="user-info">
        <div class="name">微信昵称：{{wechatName}}</div>
        <div class="mobile">{{custMobile}}</div>
      </div>
      <div class="pay-info">{{payType}}</div>
    </div>
    <div class="mid">
      <div class="pay-price">金额：{{totalprice}}</div>
      <div class="pay-time">{{payTime}}</div>
    </div>
    <div class="bottom">
      <div class="pay-no">
        订单编号{{ordersn}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderItem",
  props: {
    createDate:String,
    custId:Number,
    custMobile:String,
    deliveryFee:Number,
    id:Number,
    orderType:Number,
    ordersn:String,
    pay:Number,
    payTime:String,
    payType:Number,
    pstatus:Number,
    shopid:Number,
    totalcount:Number,
    totalprice:Number,
    wechatName:String,
    wechatUrl:String
  },
};
</script>

<style lang="scss">
.order-item-container{
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px #dedede;
  .top{
    display:flex;
    justify-content: space-between;
    .user-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 2rem;
      .mobile{
        margin-left: 1rem;
      }
    }
  }
  .mid{
    display: flex;
    justify-content: space-between;
  }
  .bottom{
    display: flex;
    justify-content: space-between;
  }
}
</style>
