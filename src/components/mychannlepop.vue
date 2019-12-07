<template>
  <div>
    <!-- 弹出层 -->
    <!-- v-model: 用来控制面板的显示和隐藏 -->
    <!-- position: 面板弹出的位置 -->
    <!-- 子组件不能修改这个值 -->
    <!-- <van-popup :value="value" @input="value=$event" position="bottom" :style="{ height: '90%' }">我</van-popup> -->
    <van-popup :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '90%' }">我</van-popup>
  </div>
</template>

<script>
export default {
   props:['value']
};
</script>

<style>
</style>