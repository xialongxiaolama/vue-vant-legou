<template>
  <div class="index">
    <form action="/">
      <van-search
        show-action
        v-model.trim="value"
        @input="onSearch(value)"
        placeholder="商品搜索"
        @cancel="onCancel"
      />
    </form>
    <!-- 默认显示搜索记录 -->
    <div class="box" v-if="isShow == 'default'">
      <div class="card">
        <div class="title">
          <p>历史记录</p>
          <p class="box" @click="clearhistory"></p>
        </div>
        <ul>
          <li
            v-for="item in historyData"
            @click="jump(item.keyword)"
            :key="item.id"
          >
            {{ item.keyword }}
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="title">
          <p>热门搜索</p>
        </div>
        <ul>
          <li
            v-for="item in hotKeywordList"
            :key="item.id"
            :class="item.keyword == defaultKeyword ? 'active' : ''"
            @click="jump(item.keyword)"
          >
            <!-- 点击搜索记录跳转到 商品页表
        传值方式:1.通过点击将值存到本地数据,在新页面读取本地数据 2.通过路由传值跳转
         -->
            {{ item.keyword }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 是否显示搜索结果 -->
    <ul class="text" v-else-if="isShow == 'search'">
      <li v-for="item in dataList" :key="item.id" @click="jump(item.name)">
        {{ item.name }}
      </li>
    </ul>
    <!-- 显示商品列表 -->
    <div class="goods" v-else>
      <goodlist :keyword="keyword"></goodlist>
    </div>
  </div>
</template>

<script>
import goodlist from "../goodlist/index";
import { Toast } from "vant";
import {
  helperaction,
  addhistoryaction,
  clearhistoryAction,
  indexaction,
} from "../../../api/home/search";
export default {
  data() {
    return {
      value: "",
      dataList: [],
      detail: {},
      isShow: "default",
      defaultKeyword: "",
      hotKeywordList: [],
      historyData: [],
      keyword: "",
    };
  },
  components: {
    goodlist,
  },
  created() {
    this.init();
  },
  methods: {
    //   初始化记录
    init() {
      var openId = localStorage.getItem("openId");
      indexaction({
        openId: "66",
      }).then((res) => {
        this.defaultKeyword = res.data.defaultKeyword.keyword;
        this.historyData = res.data.historyData;
        this.hotKeywordList = res.data.hotKeywordList;
      });
    },
    // 清楚历史记录
    clearhistory() {
      clearhistoryAction({ openId: localStorage.getItem("openId") }).then(
        (res) => {
          Toast("清除成功!");
          //   调用初始化数据
          this.init();
        }
      );
    },
    //搜索事件
    onSearch(val) {
      helperaction({
        keyword: val,
        order: "",
      }).then((res) => {
        this.dataList = res.data.keywords;
      });
      if (val == "") {
        this.isShow = "default";
      } else {
        this.isShow = "search";
      }
      this.init();
    },

    //取消事件
    onCancel() {
      this.$router.go(-1);
    },
    // 获取详情信息  把关键词保存在本地,然后在套用的组件中得到关键词,对数据进行搜索
    jump(val) {
      this.isShow = "goods";
      this.keyword = val;
      //把搜索数据保存
      addhistoryaction({
        keyword: val,
        openId: localStorage.getItem("openId"),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  background-color: #eee;
  .text {
    padding-left: 20px;
    background-color: #fff;
    li {
      font-size: 12px;
      line-height: 28px;
      height: 28px;
      color: #000;
      text-align: left;
    }
  }
  .card {
    margin-top: 10px;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      align-content: center;
      justify-content: space-between;
      padding-left: 20px;
      margin: 15px auto;
      p {
        margin: 0;
        line-height: 27px;
      }
      .box {
        width: 27px;
        height: 27px;
        background: url("http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/del1-93f0a4add4.png")
          no-repeat;
        background-size: 100% 100%;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding-left: 20px;
      li {
        padding: 5px 10px;
        border: 1px solid #999;
        margin: 0 10px 15px 0;
        box-sizing: border;
      }
      .active {
        border: 1px solid #bd282d;
        color: #bd282d;
      }
    }
  }
}
</style>>
