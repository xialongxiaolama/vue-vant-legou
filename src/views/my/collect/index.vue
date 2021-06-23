<template>
  <div class="collect">
    <h2 class="title">我的收藏</h2>
    <div class="list">
      <div
        v-for="cItem in collectList"
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
    </div>
  </div>
</template>

<script>
import { listAction } from "../../../api/my";
export default {
  data() {
    return {
      collectList: [],
    };
  },
  methods: {
    init() {
      listAction({
        openId: localStorage.getItem("openId"),
      }).then((res) => {
        this.collectList = res.data.collectGoodsList;
      });
    },
    //跳转购买页
    goBuy(id) {
      this.$router.push({ path: "/cart/buy", query: { id: id } });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.collect {
  height: 100%;
  .title {
    padding: 10px;
    background-color: #fff;
    margin: 0;
  }
  .list {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 12px;
    div {
      width: 49%;
      background-color: #fff;
      overflow: hidden;
      margin-bottom: 5px;
      img {
        width: 150px;
        height: 150px;
      }

      div {
        text-align: left;
        width: 100%;
        padding: 2px 10px 12px 16px;
        h4 {
          padding-bottom: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          color: #8a8a8a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          text-indent: 0;
          color: #9c3232;
        }
      }
    }
  }
}
</style>