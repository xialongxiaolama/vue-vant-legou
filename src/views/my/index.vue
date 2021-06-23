<template>
  <div>
    <div class="header">
      <img
        src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png"
        alt=""
      />
      <span>用户</span>
    </div>
    <div class="main">
      <ul class="list">
        <li class="item">我的订单</li>
        <li class="item">优惠券</li>
        <li class="item">我的足迹</li>
        <li class="item" @click="goCollect">我的收藏</li>
        <li class="item" @click="goAddress">地址管理</li>
        <li class="item">联系客服</li>
        <li class="item">客服中心</li>
        <li class="item" @click="goFeedback">意见反馈</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goAddress() {
      this.$router.push("/my/address");
    },
    goFeedback() {
      this.$router.push("/my/feedback");
    },
    goCollect() {
      this.$router.push("my/collect");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 140px;
  background-color: #333;
  display: flex;
  align-items: center;
  img {
    padding: 20px;
    width: 74px;
    height: 74px;
    border-radius: 50%;
  }
  span {
    color: #fff;
    font-size: 14px;
  }
}
.main {
  .list {
    margin-top: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    .item {
      width: 33%;
      height: 70px;
      line-height: 70px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      background-color: #fff;
    }
  }
}
</style>