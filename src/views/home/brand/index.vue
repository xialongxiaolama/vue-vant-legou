<template>
  <div class="brand">
    <div class="pic">
      <img :src="info.list_pic_url" alt="" />
      <h3>{{ info.name }}</h3>
    </div>
    <p>{{ info.simple_desc }}</p>
    <div class="p"><p>数据库暂无数据</p></div>
  </div>
</template>

<script>
import { detailaction } from "../../../api/home/index";
export default {
  data() {
    return {
      info: {},
    };
  },
  methods: {
    //   初始化
    init() {
      const id = this.$route.query.id;
      detailaction({ id: id }).then((res) => {
        this.info = res.data.data;
        console.log(this.info);
      });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.brand {
  background-color: #eee;
  height: 600px;
  .pic {
    position: relative;
    img {
      width: 100%;
      height: 145px;
    }
    h3 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -100%);
      font-size: 19px;
      color: #ffff;
      height: 26px;
      line-height: 26px;
      border-bottom: 2px solid #fff;
    }
  }
  p {
    padding: 20px;
    font-size: 15px;
    margin: 0;
    color: #666;
    background-color: #fff;
  }
  .p {
    margin-top: 80px;
    p {
      background-color: #eee;
    }
  }
}
</style>