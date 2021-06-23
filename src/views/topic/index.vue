<template>
  <van-list
    class="list"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad(page)"
  >
    <div v-for="item in list" :key="item.id" :title="item">
      <router-link :to="{ name: 'tdetail', query: { id: item.id } }">
        <img :src="item.scene_pic_url" alt="" />
        <div class="title">{{ item.title }}</div>
        <p>{{ item.subtitle }}</p>
        <span>{{ item.price_info }}元起</span></router-link
      >
    </div>
  </van-list>
</template>

<script>
import { listaction } from "../../api/topic/index.js";
export default {
  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad(page) {
      // 请求数据
      listaction({
        page,
      }).then((res) => {
        //页数+1 继续加载
        this.page += 1;
        // console.log(res.data);
        this.list = this.list.concat(res.data.data);
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (res.data.page == res.data.total) {
          this.finished = true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  background-color: #eee;
  margin-bottom: 50px;
  div {
    background-color: #fff;
    margin-bottom: 8px;
    img {
      width: 100%;
      height: 200px;
    }
    .title {
      font-size: 16px;
      margin: 15px auto;
      color: #333;
    }
    p {
      font-size: 12px;
      margin: 10px auto;
      color: #999;
    }
    span {
      color: #b4282d;
      font-size: 13px;
      display: block;
      padding-bottom: 20px;
    }
  }
}
</style>