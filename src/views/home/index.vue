<template>
  <div class="index">
    <!-- 头部栏 -->
    <div class="topbar">
      <router-link to="/home/city" class="location">{{ city }}</router-link>
      <router-link to="/home/search" class=""
        ><van-search placeholder="搜索商品" class="search" />
      </router-link>
    </div>

    <!-- 轮播图实现 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="black">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.image_url" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 分类  -->
    <div class="channel">
      <div v-for="item in channel" :key="item.id">
        <router-link :to="{ name: 'cdetail', query: { id: item.id } }">
          <img :src="item.icon_url" alt="" />
          <p>{{ item.name }}</p>
        </router-link>
      </div>
    </div>

    <!-- 工厂直供 -->
    <div class="brand">
      <h4 class="title">品牌制造商直供</h4>
      <ul class="main">
        <li
          v-for="item in brand"
          :key="item.id"
          @click="getBrandDetail(item.id)"
        >
          <img :src="item.new_pic_url" alt="" />
          <div class="info">
            <p>{{ item.name }}</p>
            <p>{{ item.floor_price }}元起</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 新品上市 -->
    <div class="newgoods">
      <div class="newgoods-top" @click="goGoodList({ isNew: 1 })">
        <div class="top">
          <h4>新品首发</h4>
          <p>查看全部</p>
        </div>
      </div>
      <ul class="newgoods-content">
        <li v-for="item in newGoods" :key="item.id" @click="goBuy(item.id)">
          <img :src="item.list_pic_url" alt="" />
          <div>
            <h4>{{ item.name }}</h4>
            <p>{{ item.goods_brief }}</p>
            <span>￥{{ item.retail_price }}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 人气上市 -->
    <div class="newgoods hotgoods">
      <div class="newgoods-top" @click="goGoodList({ isHot: 1 })">
        <div class="top">
          <h4>人气上市</h4>
          <p>查看全部</p>
        </div>
      </div>
      <ul class="newgoods-content">
        <li v-for="item in hotGoods" :key="item.id" @click="goBuy(item.id)">
          <img :src="item.list_pic_url" alt="" />
          <div>
            <h4>{{ item.name }}</h4>
            <p>{{ item.goods_brief }}</p>
            <span>￥{{ item.retail_price }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 专题精选 -->
    <div class="topicList">
      <div class="title">专题精选 <van-icon name="good-job-o" /></div>
      <ul>
        <li
          v-for="item in topicList"
          :key="item.id"
          @click="goTopicDetail(item.id)"
        >
          <img :src="item.item_pic_url" alt="" />
          <div class="info">
            <div>
              <h3>
                {{ item.title }}
              </h3>
              <p>{{ item.subtitle }}</p>
            </div>
            <p>{{ item.price_info }}元起</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 商品分类 -->
    <div class="newCategoryList">
      <div v-for="item in newCategoryList" :key="item.id" class="kind">
        <p>{{ item.name }}好物</p>
        <div class="list">
          <div
            v-for="cItem in item.goodsList"
            :key="cItem.id"
            @click="goBuy(cItem.id)"
          >
            <img :src="cItem.list_pic_url" alt="" />
            <div>
              <h4>{{ cItem.name }}</h4>
              <p>{{ cItem.goods_brief }}</p>
              <span>￥{{ cItem.retail_price }}</span>
            </div>
          </div>
          <div>
            <div class="more">
              <router-link :to="{ name: 'cdetail', query: { id: item.id } }">
                <h3>{{ item.name }}好物</h3>
                <van-icon name="good-job-o" size="32px " color="#9c3232" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { index } from "../../api/home/index";

export default {
  data() {
    return {
      city: "",
      data: {},
      banner: [],
      channel: [],
      brand: [],
      hotGoods: [],
      newGoods: [],
      goodList: [],
      topicList: [],
      newCategoryList: [],
    };
  },
  methods: {
    // 跳转热门\新品商品列表
    goGoodList(val) {
      //编程式路由 路由跳转传值
      this.$router.push({ path: "/home/goodlist", query: val });
    },
    //跳转购买页
    goBuy(id) {
      this.$router.push({ path: "/cart/buy", query: { id: id } });
    },
    //跳转工厂直销详情
    getBrandDetail(id) {
      this.$router.push({ name: "brand", query: { id: id } });
    },
    //跳转专题商品详情
    goTopicDetail(id) {
      this.$router.push({ name: "tdetail", query: { id: id } });
    },
  },
  created() {
    //请求首页数据
    index().then((res) => {
      this.data = res.data;
      this.banner = res.data.banner;
      this.channel = res.data.channel;
      this.brand = res.data.brandList;
      this.newGoods = res.data.newGoods;
      this.hotGoods = res.data.hotGoods;
      this.topicList = res.data.topicList;
      this.newCategoryList = res.data.newCategoryList;
    });

    //获取城市地理位置
    var _this = this;
    var info = this.$store.state.cityInfo;
    //如果地址信息存在
    if (!info.name) {
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            //更新公共数据 当前位置信息
            _this.city = result.city;
          }
        });
      });
    } else {
      this.city = info.name;
    }
  },
};
</script>

<style  lang="scss" scoped>
@import "./scss/index";
</style>