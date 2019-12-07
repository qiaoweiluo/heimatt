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
        <van-grid-item  :text="item.name" v-for="(item, index) in otherChannels" :key='index' />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
// 导入频道操作的接口
import { apiGetAllChannels, apiResetChannels } from '../api/channels'
export default {
    // 面板的显示与隐藏  我的频道列表
  props: ["value","channelList"],
  data() {
      return {
          // 所有的频道数据
            allChannels: [],
      }
  },
  methods: {
      // 得到所有的频道数据
        async getAllChannels() {
            try {
                let res = await apiGetAllChannels()
                this.allChannels = res.data.data.channels
                console.log(this.allChannels)
            } catch (error) {
                console.log('error')
            }
        },
  },
  computed: {
        // 频道推荐的数据源
        otherChannels: function() {
            // 返回 allChannels 中 channelList 不存在的元素
            // 1）得到 channelList 中所有元素的 id 的集合
            let idsArr = this.channelList.map(item => {
                return item.id
            })
            // 2)取出数据
            let resArr = this.allChannels.filter(item => {
                // 返回所有 item.id 不在 idsArr 中的元素
                return idsArr.indexOf(item.id) === -1
            })
            // 返回新的数组
            return resArr
        }
    },
  created() {
        // 得到所有的频道数据
        this.getAllChannels()
    }
};
</script>

<style>
</style>