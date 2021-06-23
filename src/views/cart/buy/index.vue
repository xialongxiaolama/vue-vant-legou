<template>
  <div class="buy">
    <!-- //轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" alt="" />
      </van-swipe-item>
    </van-swipe>

    <!-- tip标签 -->
    <div class="tip">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>

    <!-- 购买信息 -->
    <div class="info">
      <div class="price">
        <div class="title">{{ info.name }}</div>
        <p>{{ info.goods_brief }}</p>
        <span>￥{{ info.retail_price }}</span>
      </div>
      <div class="choice">请选择规格参数 <span @click="showCard">＞</span></div>
    </div>

    <!-- 商品参数 -->
    <div class="attribute">
      <div class="title">商品参数</div>
      <ul class="list">
        <li class="item" v-for="item in attribute" :key="item.id">
          <div>{{ item.name }}</div>
          <p>{{ item.value }}</p>
        </li>
      </ul>
    </div>
    <!-- 描述图片 -->
    <div v-html="goods_desc" class="desc"></div>
    <!-- 常见问题 -->
    <div class="question">
      <div class="title">
        <div></div>
        <p>常见问题</p>
        <div></div>
      </div>
      <div class="issue">
        <div v-for="item in issue" :key="item.id">
          <div class="question"><span>·</span> {{ item.question }}</div>
          <div class="answer">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="productList">
      <div class="title">
        <div></div>
        <p>大家都在看</p>
        <div></div>
      </div>
      <ul class="list">
        <li v-for="item in productList" :key="item.id" @click="goBuy(item.id)">
          <img :src="item.list_pic_url" alt="" />
          <div>
            <p>{{ item.name }}</p>
            <span>￥{{ item.retail_price }}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 加入购物车 -->
    <div class="footer">
      <div class="collect item" @click="addCollect">
        <van-icon
          name="star-o"
          size="26px"
          :color="this.collected ? '#FFBA15' : '#eee'"
        />
      </div>
      <div class="cart item" @click="goCart">
        <van-icon
          name="cart-o"
          color="#b4282d"
          size="26px"
          :badge="goods.length"
        />
      </div>
      <div class="pay item" @click="goOrder">立即购买</div>
      <div class="addCart item" @click="showCard">加入购物车</div>
    </div>

    <!-- 购买卡片 -->
    <van-action-sheet v-model="show" title="选择参数">
      <div class="main">
        <div class="top">
          <div class="logo">
            <img :src="info.primary_pic_url" alt="" />
          </div>
          <div class="info">
            <p class="price">价格￥{{ info.retail_price }}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <p>数量</p>
        <div class="num">
          <button @click="reduce">-</button>
          <button class="small">{{ num }}</button>
          <button @click="add">+</button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Toast } from "vant";
import { detailaction, addCart, cartList } from "../../../api/cart";
import { addCollect } from "../../../api/my";
export default {
  data() {
    return {
      gallery: [],
      info: {},
      attribute: [],
      goods_desc: "",
      issue: [],
      productList: [],
      id: "",
      collected: "",
      orderList: [],
      // 添加数量
      num: 1,
      show: false,
      // 购物车数量
      goods: [],
    };
  },
  //响应路由会复用原来组件,生命周期钩子函数不会被调用,可以用watch监听变化,做出响应
  watch: {
    $route(to, from) {
      // console.log(to, from);
      this.init();
    },
  },
  methods: {
    // 初始化
    init() {
      this.id = this.$route.query.id;
      const openId = localStorage.getItem("openId");
      detailaction({ id: this.id, openId: openId }).then((res) => {
        this.collected = res.data.collected;
        this.gallery = res.data.gallery;
        this.info = res.data.info;
        this.attribute = res.data.attribute;
        this.goods_desc = res.data.info.goods_desc;
        this.productList = res.data.productList;
        this.issue = res.data.issue;
      });

      // 购物车数量
      cartList({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        this.goods = res.data.data;
        this.number = res.data.data.length;
      });
    },
    // 添加到收藏
    addCollect() {
      addCollect({
        goodsId: this.id,
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        if (!this.collected) {
          Toast.success("收藏成功!");
          this.collected = !this.collected;
        } else {
          Toast.fail("取消收藏!");
          this.collected = !this.collected;
        }
      });
    },
    //跳转到购物车
    goCart() {
      this.$router.push("/cart");
    },
    // 组件复用,生命周期钩子函数不会被调用,需要用watch监听做出响应
    goBuy(id) {
      this.$router.push({ name: "buy", query: { id } });
    },
    //显示购买卡片 加入购物车
    showCard() {
      // 有卡片进行添加,否则打开卡片
      if (this.show) {
        addCart({
          goodsId: this.id,
          number: this.num,
          openId: localStorage.getItem("openId"),
        }).then(
          (res) => {
            Toast.success("添加成功!");
            setTimeout(() => {
              this.init();
            }, 500);
          },
          () => {
            Toast.fail("添加失败!");
          }
        );
      }
      this.show = !this.show;
    },

    //减少
    reduce() {
      if (this.num > 1) {
        this.num--;
      } else {
        this.show = false;
      }
    },
    add() {
      this.num++;
    },
    goOrder() {
      //如果购买卡片存在  跳转到支付页面
      if (this.show) {
        const price = this.info.retail_price * this.num;
        //把当前商品信息存放如数组,保存在本地存储中
        // 下单页面取出数组进行渲染
        this.orderList.push(this.info);
        localStorage.setItem("orderList", JSON.stringify(this.orderList));
        this.$router.push({
          name: "order",
          query: { price, number: this.num },
        });
      }
      this.show = !this.show;
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.buy {
  background-color: #eee;
  .my-swipe {
    height: 375px;
    img {
      width: 100%;
    }
    margin-bottom: 0;
  }
  .tip {
    margin-top: 0;
    display: flex;
    justify-content: space-around;
    color: #666;
    font-size: 12px;
    padding: 15px 0 25px;
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

  // 信息
  .info {
    background-color: #fff;
    .price {
      margin-bottom: 20px;
      .title {
        font-size: 20px;
        padding: 10px;
      }
      p {
        color: #999;
        font-size: 12px;
        padding-bottom: 12px;
      }
      span {
        font-size: 17px;
        color: #b4282d;
      }
    }
    .choice {
      display: flex;
      justify-content: space-between;
      padding: 20px 10px;
      border-top: 1px solid #eee;
    }
  }

  // 商品参数
  .attribute {
    margin: 10px auto;
    background-color: #fff;
    padding: 10px;
    text-align: left;
    .title {
      font-size: 20px;
      padding: 10px 0;
    }
    .list {
      li {
        display: flex;
        justify-content: start;
        background-color: #eee;
        width: 90%;
        margin: 0 auto;
        align-items: center;
        font-size: 12px;
        margin-bottom: 10px;
        div {
          flex-shrink: 0;
          display: block;
          width: 100px;
          color: #999;
        }
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  ::v-deep .desc {
    p {
      margin: 0;
      margin-top: -4px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .question {
    background-color: #fff;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        width: 70px;
        height: 2px;
        background-color: #eee;
      }
      p {
        padding: 0 5px;
      }
    }
    .issue {
      padding: 15px;
      text-align: left;
      .question {
        display: flex;
        align-items: center;
        span {
          font-size: 30px;
          color: #b4282d;
        }
      }
      .answer {
        padding-left: 10px;
        color: #787878;
        line-height: 16px;
      }
    }
  }
  .productList {
    margin-top: 15px;
    .title {
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        width: 70px;
        height: 1px;
        background-color: #eee;
      }
      p {
        padding: 0 5px;
      }
    }
    .list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      text-align: left;
      li {
        width: 49%;
        background-color: #fff;
        margin-bottom: 5px;
        img {
          width: 100%;
        }
        div {
          padding: 0 15px;
          p {
            font-size: 12px;
          }
          span {
            font-size: 12px;
            color: #b4282d;
          }
        }
      }
    }
  }
  .footer {
    z-index: 9999;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #fff;
    .item {
      width: 25%;
      height: 100%;
      line-height: 50px;
      box-sizing: border-box;
      border: 1px solid #eee;
    }
    .collect {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cart {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .addCart {
      color: #fff;
      background-color: #b4282d;
      border: 0;
    }
  }

  // 购物卡片
  ::v-deep .van-popup--bottom.van-popup--round {
    bottom: 50px;
    border-radius: 0;
  }
  .main {
    padding: 0 20px;
    text-align: left;
    .top {
      display: flex;
      img {
        width: 88px;
        height: 88px;
      }
      p {
        padding-left: 10px;
      }
      .price {
        color: #b4282d;
      }
    }
    .num {
      display: flex;
      padding-bottom: 10px;
      button {
        display: block;
        width: 28px;
        height: 28px;
        font-size: 18px;
        margin-right: 3px;
        background-color: #f2f3f5;
        border: none;
      }
      .small {
        font-size: 12px;
      }
    }
  }
}
</style>