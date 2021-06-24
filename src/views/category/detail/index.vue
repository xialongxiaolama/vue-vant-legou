<template>
  <div class="index">
    <van-tabs
      @click="onClick"
      v-model="index"
      animated
      sticky
      offset-top="46px"
    >
      <van-tab v-for="item in navBar" :title="item.name" :key="item.id">
        <div class="card">
          <h3>{{ item.name }}</h3>
          <p>{{ item.front_desc }}</p>
        </div>
        <div class="list">
          <div
            class="item"
            v-for="item in goodsList"
            :key="item.id"
            @click="goBuy(item.id)"
          >
            <img :src="item.list_pic_url" alt="" />
            <p>{{ item.name }}</p>
            <span>￥{{ item.retail_price }}</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { categoryNav, goodsList } from '../../../api/category/detail'
export default {
  data() {
    return {
      navBar: [],
      goodsList: [],
      index: '' //当前分栏的索引
    }
  },
  methods: {
    //进入页面初始化
    init() {
      const id = this.$route.query.id
      // console.log(id);
      //相应位置标签处于激活状态
      //获得数据
      categoryNav({ id }).then((res) => {
        // 导航栏数据
        this.navBar = res.data.navData
        // console.log(this.navBar);

        // 通过id 获取跳转过来的的导航栏索引
        const index = this.navBar.findIndex((res) => res.id == id)
        this.index = index

        goodsList({ categoryId: id }).then((data) => {
          this.goodsList = data.data.data
        })
      })
    },
    //点击切换类型
    onClick(index) {
      // 通过点击标签的下标 获取数组中 该下标对应的种类id
      //   通过id 获取类型的商品列表
      const id = this.navBar[index].id
      goodsList({ categoryId: id }).then((data) => {
        this.goodsList = data.data.data
      })
    },
    // 跳转到购买页面
    goBuy(id) {
      this.$router.push({ name: 'buy', query: { id } })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.index {
  background-color: #eee;
  .card {
    margin-top: 10px;
    margin-bottom: 2px;
    padding: 20px;
    background-color: #fff;
    p {
      color: #999;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 49.5%;
      background-color: #fff;
      margin-bottom: 3px;
      img {
        width: 150px;
        height: 150px;
      }
      p {
        font-size: 12px;
        margin: 0 auto 10px;
      }
      span {
        color: #ab2b2b;
        font-size: 15px;
      }
    }
  }
}
</style>