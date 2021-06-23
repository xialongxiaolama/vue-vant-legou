import axios from "../index";

//专题商品列表
function listaction(data) {
  return axios({
    url: "topic/listaction",
    data,
  });
}
//专题商品详情
function detailaction(data) {
  return axios({
    url: "topic/detailaction",
    data,
  });
}
export { listaction, detailaction };
