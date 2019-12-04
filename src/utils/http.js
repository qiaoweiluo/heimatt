// 用来封装axios
// 导入axios
import axios from "axios";

// 以前设置基地址
// axios.defaults.baseURL = ""
// 以前设置拦截器
// axios.interceptors.request.use()

// 创建一个新的axios对象
// 这个实例用来单独请求黑马头条的服务器
let insterce = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/app/v1_0"
});
// 设置拦截器
// 请求拦截器
insterce.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
insterce.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

//   暴露axios实例
export default insterce;