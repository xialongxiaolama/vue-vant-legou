import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home"),
  },
  {
    path: "/home/city",
    name: "city",
    component: () => import("../views/home/city"),
  },
  {
    path: "/home/search",
    name: "search",
    component: () => import("../views/home/search"),
  },
  {
    path: "/home/brand",
    name: "brand",
    component: () => import("../views/home/brand"),
  },
  // 新品上市 热门页
  {
    path: "/home/goodlist",
    name: "goodlist",
    component: () => import("../views/home/goodlist"),
  },
  {
    path: "/topic",
    name: "topic",
    component: () => import("../views/topic"),
  },
  {
    path: "/topic/detail",
    name: "tdetail",
    component: () => import("../views/topic/detaill"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/cart"),
  },
  // 购买页
  {
    path: "/cart/buy",
    name: "buy",
    component: () => import("../views/cart/buy"),
  },
  {
    path: "/cart/order",
    name: "order",
    component: () => import("../views/cart/order"),
  },

  {
    path: "/category",
    name: "category",
    component: () => import("../views/category"),
  },
  {
    path: "/category/detail",
    name: "cdetail",
    component: () => import("../views/category/detail"),
  },
  {
    path: "/my",
    name: "my",
    component: () => import("../views/my"),
  },
  {
    path: "/my/address",
    name: "address",
    component: () => import("../views/my/address"),
  },
  {
    path: "/my/edit",
    name: "edit",
    component: () => import("../views/my/editAddress"),
  },
  {
    path: "/my/collect",
    name: "collect",
    component: () => import("../views/my/collect"),
  },
  {
    path: "/my/feedback",
    name: "feedback",
    component: () => import("../views/my/feedback"),
  },
];

const router = new VueRouter({
  // mode: "history", 打开历史模式打包空白
  base: process.env.BASE_URL,
  routes,
});
//回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
export default router;
