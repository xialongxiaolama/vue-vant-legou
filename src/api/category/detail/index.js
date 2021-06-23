import axios from "../../index";

// 分类商品标签栏
function categoryNav(data) {
  return axios({
    url: "category/categoryNav",
    data,
  });
}
// 分类商品
function goodsList(data) {
  return axios({
    url: "goods/goodsList",
    data,
  });
}
export { categoryNav, goodsList };
