<template>
  <div>
    <!-- 弹出层 -->
    <!-- 子组件不能修改这个值 -->
    <!-- <van-popup :value="value" @input="value=$event" position="bottom" :style="{ height: '90%' }">我</van-popup> -->
    <van-popup
      :value="value"
      @input="$emit('input', $event)"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <!-- 我的频道 -->
      <van-cell title="我的频道">
        <template slot="default">
          <van-button plain type="danger" size="mini">编辑</van-button>
        </template>
      </van-cell>
      <!-- 我的频道的列表 -->
      <van-grid>
        <van-grid-item  :text="item.name" v-for="(item, index) in channelList" :key='index' />
      </van-grid>
      <!-- 频道推荐 -->
      <van-cell title="频道推荐"></van-cell>
      <!-- 频道推荐的列表 -->
      <van-grid>
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
export default {
    // 面板的显示与隐藏  我的频道列表
  props: ["value","channelList"]
};
</script>

<style>
</style>