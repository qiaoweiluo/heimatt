<template>
  <div class="home">
    <van-nav-bar class="mynavbar">
      <template slot="title">
        <div class="mywords">首页</div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.home {
  .mynavbar {
    background-color: #3296fa;
    .mywords {
      color: aliceblue;
    }
  }

}
</style>