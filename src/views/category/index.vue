<template>
  <div class="category">
    <!-- 导航栏 -->
    <router-link to="/home/search">
      <div class="navbar">
        <van-search
          v-model="number"
          input-align="center"
          class="search"
          search-content-background-color="#ededed"
          size="12px"
        />
      </div>
    </router-link>
    <!-- 内容部分 -->
    <div class="content">
      <!-- 侧边栏 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in navlist"
          :key="item.id"
          :title="item.name"
          class="sideBar"
        />
      </van-sidebar>
      <div class="main">
        <img :src="sublist.banner_url" alt="" />
        <div class="sort">
          <div class="title">--{{ sublist.name }}分类--</div>
          <ul>
            <li v-for="item in sublist.subList" :key="item.id">
              <router-link :to="{ name: 'cdetail', query: { id: item.id } }">
                <img :src="item.wap_banner_url" alt="" />
                <p>{{ item.name }}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { indexaction, currentaction } from "../../api/category/index";
export default {
  name: "category",
  data() {
    return {
      num: 1,
      activeKey: 0,
      navlist: [],
      sublist: [],
    };
  },
  computed: {
    number() {
      return `商品搜索,共有${this.num}件商品`;
    },
  },
  methods: {
    // 初始化数据
    init() {
      indexaction().then((res) => {
        this.navlist = res.data.categoryList;
        currentaction({ id: res.data.categoryList[0].id }).then((res) => {
          this.sublist = res.data.data.currentOne;
        });
      });
    },
    //监听当前类型
    onChange(index) {
      currentaction({
        id: this.navlist[index].id,
      }).then((res) => {
        this.sublist = res.data.data.currentOne;
      });
    },
  },

  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
.category {
  height: 100%;
  background-color: #fff;
}
.navbar {
  border-bottom: 1px solid #eee;
  ::v-deep .van-cell {
    display: flex;
    justify-content: center;
    .van-cell__value {
      width: 140px;
    }
  }
}
::v-deep .sideBar {
  padding: 10px;
  background-color: #fff;
}
::v-deep .van-sidebar-item--select,
.van-sidebar-item--select:active {
  font-size: 18px;
  color: #ab2b2b;
}
::v-deep .van-sidebar-item--select:before {
  width: 2px;
  height: 100%;
  background-color: #ab2b2b;
}
// 内容部分
.content {
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  padding-top: 0;
  .main {
    width: 260px;
    margin-right: 15px;
    img {
      margin-top: 10px;
      width: 100%;
      height: 110px;
    }
    .sort {
      .title {
        padding: 20px 0;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        li {
          width: 33%;
          img {
            margin-top: 0;
            width: 72px;
            height: 72px;
          }
          p {
            color: #000;
            padding: 0;
            margin: 0;
          }
        }
      }
    }
  }
}
</style>