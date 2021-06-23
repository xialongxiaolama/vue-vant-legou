<template>
  <div class="detail">
    <div v-html="imgList" class="pic"></div>
    <div class="recommendList">
      <div class="title">专题推荐</div>
      <div class="item" v-for="item in recommendList" :key="item.id">
        <img :src="item.scene_pic_url" alt="" />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { detailaction } from "../../../api/topic/index";
export default {
  data() {
    return {
      imgList: "",
      recommendList: [],
    };
  },
  methods: {
    init() {
      const id = this.$route.query.id;
      // console.log(this.$route.query.id);

      //获取详情数据
      detailaction({ id: id }).then((res) => {
        console.log(res);
        this.imgList = res.data.data.content;
        this.recommendList = res.data.recommendList;
      });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.detail {
  background-color: #eee;
  .pic {
    width: 100%;
    // v-html添加的标签需要深度遍历才能添加类名
    ::v-deep img {
      margin: -2px;
      width: 100%;
    }
  }
  .recommendList {
    width: 345px;
    margin: 0 auto;
    .title {
      padding: 15px;
      font-size: 15px;
      margin: 15px auto;
      color: #999;
    }
    .item {
      background-color: #fff;
      padding: 15px;
      margin-bottom: 15px;
      img {
        width: 100%;
        height: 140px;
        box-sizing: border-box;
      }
      p {
        // padding-top: 15px;
        font-size: 14px;
        text-align: left;
        padding: 15px 0 0 0;
      }
    }
  }
}
</style>