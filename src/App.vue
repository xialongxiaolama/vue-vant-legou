<template>
  <div id="app">
    <van-nav-bar
      class="topbar"
      title="不凡"
      left-text="返回"
      fixed
      left-arrow
      @click-left="onClickLeft"
      v-if="!isShow"
    />
    <van-tabbar route v-if="isShow">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/topic" icon="description"
        >专题</van-tabbar-item
      >
      <van-tabbar-item replace to="/category" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="user-circle-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
    <keep-alive include="category">
      <router-view :class="!isShow ? 'content' : ''"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  watch: {
    $route: function (to, from) {
      var arr = ["/home", "/topic", "/my", "/category", "/cart"];
      // 判断跳转路径是是否在arr中
      if (arr.includes(to.path)) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  created() {
    var userInfo = {
      openId: "66",
      nickName: "尼古拉斯凯奇",
      avatarUrl:
        "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132",
    };
    var openId = userInfo.openId;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("openId", openId);
  },
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  background-color: #eee;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
.content {
  padding-top: 46px;
}
#nav {
  padding: 30px;
  a {
    color: #323232;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
