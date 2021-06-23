import axios from "../index";

// 购物车列表
function cartList(data) {
  return axios({
    url: "cart/cartList",
    data,
  });
}
//删除商品
function deleteAction(data) {
  return axios({
    url: "cart/deleteAction",
    data,
  });
}
//添加商品 请求头格式更改
function addCart(data) {
  return axios({
    url: "cart/addCart",
    method: "POST",
    data,
  });
}
// 商品详情
function detailaction(data) {
  return axios({
    url: "goods/detailaction",
    data,
  });
}
//获取订单页面数据
function detailAction(data) {
  return axios({
    url: "order/detailAction",
    data,
  });
}
export { detailaction, cartList, deleteAction, addCart, detailAction };
