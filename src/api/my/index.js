import axios from "../index";

//获取地址列表
function getListAction(data) {
  return axios({
    url: "address/getListAction",
    data,
  });
}
// 获取地址详细信息
function detailAction(data) {
  return axios({
    url: "address/detailAction",
    data,
  });
}
//新增或修改地址
function saveAction(data) {
  return axios({
    url: "address/saveAction",
    method: "POST",
    data,
  });
}
//删除地址
function deleteAction(data) {
  return axios({
    url: "address/deleteAction",
    data,
  });
}
//提交意见反馈
function submitAction(data) {
  return axios({
    url: "feedback/submitAction",
    method: "POST",
    data,
  });
}
// 我的收藏
function listAction(data) {
  return axios({
    url: "collect/listAction",
    data,
  });
}
//添加收藏
function addCollect(data) {
  return axios({
    url: "collect/addcollect",
    method: "POST",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded",
    // },
    data,
  });
}
export {
  getListAction,
  detailAction,
  saveAction,
  deleteAction,
  submitAction,
  listAction,
  addCollect,
};
