<template>
  <div class="goods">
    <img
      src="http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png"
      alt=""
    />
    <div class="nav">
      <p @click="complex" :class="current == 'default' ? 'active' : ''">综合</p>
      <div class="sort" @click="sort()">
        <span :class="current == 'price' ? 'active' : ''"> 价格 </span>
        <div>
          <van-icon
            name="arrow-up"
            size="6px"
            :color="current == 'price' ? '#BD282D' : ''"
          /><van-icon
            name="arrow-down"
            size="6px"
            :color="current == 'asc' ? '#BD282D' : ''"
          />
        </div>
      </div>
      <p :class="current == 'sort' ? 'active' : ''" @click="classfy">分类</p>
    </div>
    <ul class="info">
      <li v-for="item in goodList" :key="item.id" @click="goBuy(item.id)">
        <img :src="item.list_pic_url" alt="" />
        <div>
          <h4>{{ item.name }}</h4>
          <span>￥{{ item.retail_price }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { goodlist } from "../../../api/home/goodlist/index";
import { helperaction } from "../../../api/home/search";
export default {
  data() {
    return {
      goodList: [],
      current: "default",
      category: {},
    };
  },
  props: ["keyword"],
  methods: {
    // 初始化加载页面
    init() {
      //查询分类id
      this.category = this.$route.query;
      this.category.order =
        this.current == "default"
          ? ""
          : this.current == "sort"
          ? ""
          : this.current == "price"
          ? "asc"
          : "desc";
      if (!this.keyword) {
        // 查询参数
        goodlist(this.category).then((res) => {
          this.goodList = res.data.data;
        });
      } else {
        helperaction({
          keyword: this.keyword,
          order:
            this.current == "default"
              ? ""
              : this.current == "sort"
              ? ""
              : this.current == "price"
              ? "asc"
              : "desc",
        }).then((res) => {
          this.goodList = res.data.keywords;
        });
      }
    },
    // 点击综合排序
    complex() {
      this.current = "default";
      this.init();
    },
    //点击价格 排序
    sort() {
      if (this.current == "price") {
        this.current = "asc";
        this.init();
      } else {
        this.current = "price";
        this.init();
      }
    },
    //点击分类
    classfy() {
      this.current = "sort";
      this.init();
    },
    // 跳转到购买页面
    goBuy(id) {
      this.$router.push({ name: "buy", query: { id } });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.goods {
  background-color: #eee;
  img {
    width: 100%;
  }
  .nav {
    display: flex;
    justify-content: space-around;
    height: 40px;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    .sort {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        margin-left: 5px;
        display: flex;
        flex-direction: column;
      }
    }
    .active {
      color: #bd282d;
    }
  }
  .info {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;
    li {
      padding-top: 10px;
      width: 50%;
      margin-bottom: 3px;
      border-top: 2px solid #eee;
      border-right: 2px solid #eee;
      box-sizing: border-box;
    }
    img {
      width: 150px;
      height: 150px;
    }
    div {
      h4 {
        margin: 7px auto;
        line-height: 16px;
        font-size: 12px;
      }
      span {
        display: block;
        margin: 15px auto;
        font-size: 15px;
        line-height: 20px;
        color: #b4282d;
      }
    }
  }
}
</style>