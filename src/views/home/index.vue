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
      <van-tab v-for="index in 8" :key="index" :title="'标签 ' + index">
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
export default {
  data() {
    return {
      // 数据源
      list: [],
      loading: false,
      // finished：list 数据是否已经全部加载完毕 一旦设置为true 就不会再继续加载
      finished: false,
      // 下拉刷新的状态 false 刷新结束
      isLoading: false
    };
  },
  methods: {
    onLoad() {
      // 打开页面时显示 15 条数据
      console.log("onLoad");
      // 滚动条在一定范围之内 onLoad方法也会触发 页面内容太少
      setTimeout(() => {
        var newlist = [
          1,
          2,
          3,
          4,
          5,
          67,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ];
        // this.list = newlist;
        // 加了也没有效果 因为加载完毕后  没有新的数据 所以一直处于一个触底的状态 所有再次执行onload方法 loading 为true 加载
        //  触底状态 刷新不出新数据的原因是因为 每次都是给空数组赋值 没有新数据 将数据覆盖变成追加
        // push只能元素  展开运算符 即 拓展运算符
        this.list = [...this.list, ...newlist];
        if (this.list.length >= 100) {
          this.finished = true;
        }
        this.loading = false;
      }, 500);
    },
    // 下拉刷新时触发
    onRefresh() {
      // 下拉时  方法会触发  isLoading 变成trur
      setTimeout(() => {
        // 将所有数据清空
        this.list = [];
        this.loading = false;
        this.finished = false;
        // 结束下拉状态
        this.isLoading = false;
        // 清空数据后 滚动条默认触底 直接重新加载  所以不需要另外加载
      },2000);
    }
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