// 负责处理所有的与频道相关的网络请求

import http from "../utils/http";
// 得到频道数据
function apiGetChannels () {
    return http ({
        url: '/user/channels'
        // 默认就是get 不用设置
    })
}

// 得到所有的频道数据
function apiGetAllChannels() {
    return http({
      url: "/channels"
    });
  }

  // 重置频道数据
function apiResetChannels(channels) {
    return http({
      url: "/user/channels",
      method: "PUT",
      data: {
        channels: channels
      }
    });
  }
  

// 按需导出
export { apiGetChannels, apiGetAllChannels, apiResetChannels}