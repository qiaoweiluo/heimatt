<template>
  <div>
    <h2>使用vant中的组件</h2>
    <h3>01 使用vant中的按钮</h3>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <h3>02 图标组件</h3>
    <van-icon name="like" />
    <van-icon name="plus" />
    <h3>03 使用vant中的cell</h3>
    <van-cell-group>
      <!-- vant-cell-group 单元格的组的标签 -->
      <van-cell title="单元格" value="内容" />
      <!-- title: 左侧的内容 -->
      <!-- value: 右侧的内容 -->
      <!-- label: 描述信息  -->
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <h3>03 插槽</h3>
    <van-cell-group>
      <!-- 通过icon属性在标题左侧展示图标 -->
      <van-cell icon="like" title="左侧的内容" value="右侧的内容" label="描述信息" />
      <!-- 使用插槽 -->
      <!-- 第一步 把单标签变成双标签 -->
      <van-cell>
        <template slot="title">
          <!-- 上面的title 可以删掉了 会覆盖掉 -->
          我是左侧的内容
          <van-icon name="like" />
        </template>
        <template slot="default">
          <!-- 注意 此时的slot的值不是value  -->
          我是右侧的内容
        </template>
        <template slot="label">我是下方的内容</template>
      </van-cell>
    </van-cell-group>
    <h3>04 错误提示</h3>
    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" :error-message="errmsg" />
    </van-cell-group>
    <h3></h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      // 手机号格式错误提示信息
      errmsg: ""
    }
  },
};
</script>

<style>
</style>