<template>
  <div class="home">
    <!-- 完后顶部导航栏 -->
    <van-nav-bar class="mynavbar" fixed>
      <template slot="title">
        <div class="mywords">首页</div>
      </template>
    </van-nav-bar>
    <!-- 频道区域 -->
    <van-tabs v-model="activeChannels">
      <van-tab v-for="(item, index) in channelList" :key="index" :title="item.name">
        <!-- loading 刷新组件的加载状态 -->
        <!-- refresh 下拉刷新时会触发的事件 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- vant 的 list 用来展示数据 -->
          <!-- loading list 的加载状态 -->
          <!-- finished：list 数据是否已经全部加载完毕 -->
          <!-- load：加载数据的方法 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell
              v-for="(subitem, subindex) in articleList"
              :key="subindex"
              :title="subitem.title"
            />
            {{ activeChannels }}
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <div class="menuIcon">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
  </div>
</template>

<script>
// 导入频道方法
import { apiGetChannels } from "../../api/channels";
// 导入 localstorage 的操作方法
import { getLocal } from "../../utils/mylocal";
// 导入文的方法
import { apiGetChannelsArticel } from "../../api/article";
export default {
  data() {
    return {
      // 数据源
      list: [],
      loading: false,
      // finished：list 数据是否已经全部加载完毕 一旦设置为true 就不会再继续加载
      finished: false,
      // 下拉刷新的状态 false 刷新结束
      isLoading: false,
      channelList: [], // 频道数据源
      activeChannels: 0, // 当前选中的频道的下标
      articleList: [], // 频道下的文章列表数据
      timestamp: null ,// 请求接口的时间戳 
    };
  },
  methods: {
    // 当 list 被加载时执行
    async onLoad() {
      // 得到当前选中的频道数据
      let currentChannels = this.channelList[this.activeChannels];
      // 得到当前频道的 id
      let channelId = currentChannels.id;
      // 发送请求到服务器得到当前 id 下面的文章数据
      let res = await apiGetChannelsArticel({
        channelid: channelId,
        // timestamp: Date.now()
        timestamp: this.timestamp ? this.timestamp : Date.now()
        // timestamp: this.timestamp || Data.now()
      });
      // console.log(res);
      // 保存数据
      // 覆盖 页面一直刷新 请求回来的十条数据不能撑开页面 list一直处于触底状态
      // this.articleList = res.data.data.results;
      // 追加
      this.articleList = [...this.articleList, ...res.data.data.results];
      // 保存时间戳
      this.timestamp = res.data.data.pre_timest
      // 判断返回的数据results是否为空
      if (res.data.data.results.length == 0) {
        this.finished = true
      }
      // 关闭加载状态
      this.loading = false;
    },
    // 下拉刷新
    onRefresh() {},
    async getChannels() {
      // 得到用户信息
      let user = this.$store.state.user;
      if (user && user.token) {
        // 登录过 直接去服务器取出来频道数据
        let res = await apiGetChannels();
        // 保存频道数据
        this.channelList = res.data.data.channels;
      } else {
        // 没登录过
        // 得到localstorage中频道的数据
        let localchannels = getLocal("channels");
        // 判断 localstorage 中是否存在频道数据
        if (localchannels) {
          // localstorage 存储过频道数据
          // 取出渲染
          this.channelList = localchannels;
        } else {
          // localstorage 中不存在频道数据
          // 去服务器中请求默认数据
          let res = await apiGetChannels();
          // 保存频道数据
          this.channelList = res.data.data.channels;
         
        }
      }
    }
  },
  // 打开页面就要获取频道页面即 DOM元素创建 created钩子
  created() {
    // 获取频道数据
    this.getChannels();
  }
};
</script>

<style lang="less" scoped>
.home {
  margin-top: 90px;
  // home是上面的盒子
  margin-bottom: 50px;
  .mynavbar {
    background-color: #3296fa;
    .mywords {
      color: aliceblue;
    }
  }
  // 由于在当前样式中添加了scoped属性  所以当前样式无法作用到子组件中 使用深度选择器 可以直接让当前样式直接作用于子组件中
  // 频道列表
  /deep/ .van-tabs__wrap.van-tabs__wrap--scrollable.van-hairline--top-bottom {
    position: fixed;
    top: 46px;
    left: 0;
    width: 90%;
    // 不会被下方内容盖住
    z-index: 999;
  }
  // 频道区域图标
  .menuIcon {
    position: fixed;
    right: 0;
    top: 46px;
    width: 10%;
    height: 46px;
    line-height: 46px;
    text-align: center;
  }
}
</style>