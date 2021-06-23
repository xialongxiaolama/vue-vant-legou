import axios from "axios";
//为所有数据请求做劫持,显示加载提示
import { Toast } from "vant";
const instance = axios.create({
  baseURL: "http://shop.bufantec.com/bufan",
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
    if (config.method.toLowerCase() == "get") {
      //在数据发送前拦截 , 把get 里的params数据手动换为 data数据
      config.params = config.data;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 数据请求成功后清除加载框
    Toast.clear();
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default instance;
