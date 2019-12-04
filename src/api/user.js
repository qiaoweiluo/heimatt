// 用来封装所有与用户相关的网络请求
// 导入http
import http from '../utils/http'

// 登录的方法
// 此时传入参数 为了后续看代码时知道传入的
function apiLogin({
    mobile,
    code
}) {
    return http({
        url: "/authorizations",
        method: "post",
        data: {
            mobile,
            code
        },
    });
}

// 按需导出
export {
    apiLogin
}