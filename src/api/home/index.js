import axios from "../index";
// 获取首页商品列表
function index(data) {
  return axios({
    url: "index/index",
    data,
  });
}
//获取工厂直销商品详情
function detailaction(data) {
  return axios({
    url: "brand/detailaction",
    data,
  });
}
export { index, detailaction };
