import axios from "axios";
import config from "@/config";
import store from "@/store";

const {env, timeout} = config;
// 创建 axios 实例
const ax = axios.create({
  // baseUrl: "http://chendong00.top:8890",
  // 是否跨站点访问控制请求使用凭证(Cookie)
  withCredentials: true,
  // 修改请求的数据再发送到服务器
  // transformRequest: [
  //   data => qs.stringify(data) // 序列化请求的数据
  // ],
  // 修改请求的数据再发送到服务器
  // transformRequest: [
  //   data => JSON.stringify(data) // 序列化请求的数据
  // ],
  // 修改请求头信息
  // headers: {
  //   'Content-Type': 'application/json'
  // },
  timeout: timeout // 配置请求超时
});

// 添加 axios 实例响应拦截器
ax.interceptors.response.use(
  response => {
    console.log(response,"这个是啥")
    const {data} = response;
    // console.log(data,this.$route,"这个是啥")
    // const {code, msg} = data['error'];
    const {code} = data;
    // const AUTH_TOKEN = data['data']['auth_token'] // 获取用户 AUTH_TOKEN
    // if (AUTH_TOKEN) {
    //   setAuthToken(AUTH_TOKEN) // 配置默认参数
    // }
    // 用户 TOKEN 失效
    if (code === 3000) {
      store.commit("MENU_RESET"); // 重置菜单
    }
    // 判断开发环境
    if (env === "development" || env === "test") {
      // if (code === 0) {
      if (code === 200) {
        console.log(data); // 控制台输出响应数据
        return data; // 响应正确的数据
      }
      // store.commit("RES_ERROR", response); // 响应错误数据
    } else {
      if (code === 200) {
        return data; // 响应正确的数据
      }
      // Message.error(msg); // 提示错误信息
    }
  },
  error => {
    const {response, config} = error;
    if (response) {
      store.commit("RES_ERROR", response); // 响应错误数据
    } else {
      // Message.error({
      //   content: message
      // });
    }
    console.log(config);
  }
);

// 配置默认参数
const setAuthToken = AUTH_TOKEN => {
  // 配置用户 AUTH_TOKEN
  ax.defaults.headers.common["Authorization"] = AUTH_TOKEN;
};

// 刷新重新配置默认参数
const userInfo = sessionStorage.getItem("userInfo");
if (userInfo) {
  setAuthToken(JSON.parse(userInfo)["auth_token"]); // 配置默认参数
}

export default ax;
