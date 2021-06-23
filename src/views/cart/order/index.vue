<template>
  <div class="main">
    <div class="address">
      <div class="name">{{ address.name }}</div>
      <div class="info">
        <p>{{ address.mobile }}</p>
        <p class="des">{{ address.address }}</p>
        <span @click="goAddress">＞</span>
      </div>
    </div>
    <!-- 商品优惠 -->
    <div class="orderbox">
      <ul>
        <li>
          <span>商品合计</span><span>￥{{ price }}</span>
        </li>
        <li><span>运费</span><span>免运费</span></li>
        <li><span>优惠券</span><span>暂无</span></li>
      </ul>
    </div>
    <!-- 购买商品 -->
    <div class="orderList">
      <van-swipe-cell v-for="item in orderList" :key="item.id" class="item">
        <van-card
          :num="item.number ? item.number : number"
          :price="item.retail_price"
          :title="item.goods_name ? item.goods_name : item.name"
          class="goods-card"
          :thumb="item.list_pic_url"
        />
      </van-swipe-cell>
    </div>
    <!-- 底部栏 -->
    <div class="order">
      <span>实付:￥{{ price }}</span>
      <div class="button" @click="msg">支付</div>
    </div>
  </div>
</template>

<script>
import { detailAction } from "../../../api/cart/index";
import { Toast } from "vant";
export default {
  data() {
    return {
      orderList: [],
      address: {},
      price: 0,
      number: 0,
    };
  },
  methods: {
    init() {
      //总价
      this.price = this.$route.query.price;
      //数量  只有从购买页面跳转才会使用
      this.number = this.$route.query.number;
      this.orderList = JSON.parse(localStorage.getItem("orderList"));
      //
      detailAction({
        openId: localStorage.getItem("openId"),
        addressId: "",
      }).then((res) => {
        this.address = res.data.address;
      });
    },
    //提示框
    msg() {
      Toast.fail("你没有钱!");
    },
    // 跳转到地址管理
    goAddress() {
      this.$router.push({ name: "address" });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding-bottom: 50px;
}
.address {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 20px;
  text-align: left;
  font-size: 12px;
  color: #000;
  background: url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png")
    repeat-x 0 0;
  background-color: #fff;
  .info {
    width: 70%;
    margin-left: 20px;
    padding: 10px;
    position: relative;
    .des {
      color: #666;
    }
    span {
      position: absolute;
      right: -10%;
      top: 30%;
      font-size: 20px;
      color: #333;
    }
  }
}
.orderbox {
  margin: 10px auto;
  background-color: #fff;
  ul {
    padding: 0 10px;
    li {
      height: 47px;
      line-height: 47px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
    }
  }
}
::v-deep .orderList {
  padding: 10px 10px 0;
  background-color: #fff;
  .van-swipe-cell__wrapper {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    margin-top: 10px;
    // 商品卡片
    .goods-card {
      width: 100%;
      background-color: #fff;
      margin: 0;
      padding: 0;
      text-align: left;
      //图片
      .van-card__thumb {
        width: auto;
        height: auto;
        .van-image__img {
          margin-top: 10px;
          width: 63px;
          height: 63px;
          background-color: #eee;
        }
      }
      // 文字
      .van-card__content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 96px;
        color: #000;
        div {
          padding-top: 5px;
        }
        .van-card__bottom {
          padding-bottom: 10px;
          .van-card__price-integer {
            font-size: 12px;
          }
          .van-card__num {
            position: absolute;
            top: 30%;
            right: 10%;
            color: #000;
          }
        }
      }
    }
  }
}

.order {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: #b4282d;
    padding-left: 20px;
  }
  .button {
    width: 100px;
    height: 50px;
    background-color: #b4282d;
    line-height: 50px;
    font-size: 14x;
    color: #fff;
  }
}
</style>