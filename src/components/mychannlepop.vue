<template>
  <div>
    <!-- 弹出层 -->
    <!-- 子组件不能修改这个值 -->
    <!-- <van-popup :value="value" @input="value=$event" position="bottom" :style="{ height: '90%' }">我</van-popup> -->
    <van-popup :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '90%' }">
        <!-- 我的频道 -->
        <van-cell title="我的频道">
            <template slot="default">
                <van-button plain type='danger' size='mini'>编辑</van-button>
            </template>

        </van-cell>
        <!-- 推荐频道 -->
    </van-popup>
    
  </div>
</template>

<script>
export default {
   props:['value']
};
</script>

<style>
</style>