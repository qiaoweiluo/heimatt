<template>
  <div class="home">
    <!-- 完后顶部导航栏 -->
    <van-nav-bar class="mynavbar" fixed>
      <template slot="title">
        <div class="mywords">首页</div>
      </template>
    </van-nav-bar>
    <!-- 频道区域 -->
    <van-tabs>
      <van-tab v-for="(item, index) in channelList" :key="index" :title="item.name">
        <!-- loading 刷新组件的加载状态 -->
        <!-- refresh 下拉刷新时会触发的事件 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- vant 的 list 用来展示数据 -->
          <!-- loading list 的加载状态 -->
          <!-- finished：list 数据是否已经全部加载完毕 -->
          <!-- load：加载数据的方法 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
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
import { apiGetChannels } from '../../api/channels';
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
      channelList: [],   // 频道数据源
    };
  },
  methods: {
    // 上拉刷新
    onLoad() {},
    // 下拉刷新
    onRefresh() {},
    async getChannels() {
      // 发送请求到服务器
      let res = await apiGetChannels()
      // 频道数据保存
      this.channelList = res.data.data.channels;
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