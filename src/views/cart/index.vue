<template>
  <div class="cart">
    <!-- tip标签 -->
    <div class="tip">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>

    <!-- 商品列表 -->
    <div class="cartList">
      <van-swipe-cell v-for="item in cartList" :key="item.id" class="item">
        <van-checkbox
          v-model="item.checked"
          class="radio"
          checked-color="red"
        ></van-checkbox>
        <van-card
          :num="item.number"
          :price="item.retail_price"
          :title="item.goods_name"
          class="goods-card"
          :thumb="item.list_pic_url"
          @click="goBuy(item.goods_id)"
        />
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delGood(item.id)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 下单框 -->
    <div class="order">
      <van-checkbox v-model="isAllChecked" class="radio" checked-color="red"
        >全选</van-checkbox
      >
      <div class="price">
        <span>￥{{ num }}</span>
        <div class="button" @click="goOrder">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartList, deleteAction } from "../../api/cart/index";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  data() {
    return {
      cartList: [],
      orderList: [],
    };
  },
  computed: {
    // 总价
    num() {
      return this.cartList.reduce((total, item) => {
        if (item.checked) {
          return (total += item.number * item.retail_price);
        } else {
          return total;
        }
      }, 0);
    },
    //全选按钮
    isAllChecked: {
      // 全选按钮依赖单选按钮 , 当单选按钮值发生改变 , 监听数据变化
      get() {
        //将选中的商品存储在本地
        this.orderList = this.cartList.filter((item) => item.checked);
        localStorage.setItem("orderList", JSON.stringify(this.orderList));
        if (this.cartList.length == 0) {
          return false;
        } else {
          return this.cartList.every((item) => item.checked);
        }
      },
      set() {
        this.cartList.forEach((item) => (item.checked = !item.checked));
      },
    },
  },
  methods: {
    init() {
      const openId = localStorage.getItem("openId");
      cartList({ openId: openId }).then((res) => {
        res.data.data.forEach((item) => {
          item.checked = false;
        });
        this.cartList = res.data.data;
      });
    },
    //删除商品
    delGood(id) {
      Dialog.confirm({
        title: "删除商品?",
        message: "点击确认移除购物车",
      })
        .then(() => {
          deleteAction({
            id: id,
          }).then((res) => {
            this.init();
          });
        })
        .catch(() => {
          this.init();
          return;
        });
    },
    //点击下单
    goOrder() {
      const flag = this.cartList.some((item) => item.checked);
      // 如果有选中商品 跳转下单页
      if (flag) {
        this.$router.push({
          name: "order",
          query: { list: this.orderList, price: this.num },
        });
      } else {
        Toast("您未选择商品!");
      }
    },
    // 跳转到购买页面
    goBuy(id) {
      this.$router.push({
        name: "buy",
        query: { id, openId: localStorage.getItem("openId") },
      });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.cart {
  padding-bottom: 108px;
  .tip {
    margin-top: 0;
    display: flex;
    justify-content: space-around;
    color: #666;
    font-size: 12px;
    padding: 15px 0;
    div {
      position: relative;
      height: 16px;
      line-height: 16px;
    }
    div::before {
      position: absolute;
      top: 50%;
      left: -10px;
      transform: translateY(-50%);
      content: "";
      width: 5px;
      height: 5px;
      box-sizing: border-box;
      border-radius: 50%;
      display: block;
      border: 1px solid rgb(147, 0, 0);
    }
  }
  //购物列表
  ::v-deep .cartList {
    background-color: #fff;
    padding: 0 10px;
    .van-swipe-cell__wrapper {
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      margin-top: 10px;
      //选择按钮
      .radio {
        padding-right: 10px;
      }
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
            margin-top: 15px;
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
      .delete-button {
        height: 100%;
      }
    }
  }
  .order {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .radio {
      padding-left: 10px;
    }
    .price {
      display: flex;
      align-items: center;
      span {
        color: #b4282d;
        padding-right: 20px;
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
  }
}
</style>