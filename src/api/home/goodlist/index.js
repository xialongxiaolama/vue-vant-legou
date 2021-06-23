import axios from "../../index";
//获得分类商品列表
function goodlist(data) {
  return axios({
    url: "goods/goodsList",
    data,
  });
}
export { goodlist };
