// 处理所有与文章相关的网络请求
// 导入 http
import http from "../utils/http";

// 根据 id 得到频道下面的文章数据
function apiGetChannelsArticel({ channelid, timestamp }) {
  return http({
    // 如果 axios 设置了 baseUrl ，将来只要将请求的地址写全就可以将 baseUrl 覆盖掉
    url: "http://ttapi.research.itcast.cn/app/v1_1/articles",
    params: {
      channel_id: channelid,
      timestamp: timestamp,
      with_top: 0
    }
  });
}

// 按需导出
export { apiGetChannelsArticel };
