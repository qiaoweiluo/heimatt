// 负责处理所有的与频道相关的网络请求

import http from "../utils/http";
// 得到频道数据
function apiGetChannels () {
    return http ({
        url: '/user/channels'
    })
}

// 按需导出
export { apiGetChannels}