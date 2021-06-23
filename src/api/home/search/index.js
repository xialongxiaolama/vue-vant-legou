import axios from "../../index";

// 清除搜索记录
function clearhistoryAction(data) {
  return axios({
    url: "search/clearhistoryAction",
    method: "post",
    data,
  });
}
// 添加搜索记录
function addhistoryaction(data) {
  return axios({
    url: "search/addhistoryaction",
    method: "post",
    data,
  });
}
//获得搜索数据
function helperaction(data) {
  return axios({
    url: "search/helperaction",
    data,
  });
}
// 获取历史数据
function indexaction(data) {
  return axios({
    url: "search/indexaction",
    data,
  });
}
export { clearhistoryAction, addhistoryaction, helperaction, indexaction };
