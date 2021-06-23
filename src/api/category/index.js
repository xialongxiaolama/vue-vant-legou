import axios from "../index";

// 查询分类
function indexaction(data) {
  return axios({
    url: "category/indexaction",
    data,
    method: "get",
  });
}
//通过id查询 商品
function currentaction(data) {
  return axios({
    url: "category/currentaction",
    data,
  });
}
export { indexaction, currentaction };
