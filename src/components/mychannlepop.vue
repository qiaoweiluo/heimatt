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
          <van-button
            plain
            round
            type="danger"
            size="mini"
            v-if="sonIcon===false"
            @click="sonIcon = true"
          >编辑</van-button>
          <van-button
            plain
            round
            type="danger"
            size="mini"
            v-if="sonIcon===true"
            @click="sonIcon = false"
          >完成</van-button>
        </template>
      </van-cell>
      <!-- 我的频道的列表 -->
      <van-grid>
        <van-grid-item
          class="fatheritem"
          :text="item.name"
          v-for="(item, index) in channelList"
          :key="index"
        >
          <template slot="text">
            <!-- 通过对象的方式动态绑定样式 -->
            <!-- 第二种方式： :class="{'类名1':bool,'类名2':bool} -->
            <!-- 应用场景：切换类名来切换样式 -->
            <div @click="changeChannel(index)" :class="{active: index === activeChannels}">
              {{ item.name }}
            </div>
            <van-icon name="clear" v-if="sonIcon && index !== 0" class="sonicon" @click.stop="delchannel(index)" />
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 频道推荐 -->
      <van-cell title="频道推荐"></van-cell>
      <!-- 频道推荐的列表 -->
      <van-grid>
        <van-grid-item
          @click="addChannel(item)"
          :text="item.name"
          v-for="(item, index) in otherChannels"
          :key="index"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
// 导入频道操作的接口
import { apiGetAllChannels, apiResetChannels, apiGetChannels } from "../api/channels";
// 操作 local 的接口
import { setLocal } from "../utils/mylocal";
export default {
  // 面板的显示与隐藏  我的频道列表 当前选中的频道的下标
  props: ["value", "channelList", "activeChannels"],
  data() {
    return {
      // 所有的频道数据
      allChannels: [],
      // 图标默认隐藏
      sonIcon: false
    };
  },
  methods: {
    // 得到所有的频道数据
    async getAllChannels() {
      try {
        let res = await apiGetAllChannels();
        this.allChannels = res.data.data.channels;
        console.log(this.allChannels);
      } catch (error) {
        console.log("error");
      }
    },
    // 添加频道
    async addChannel(item) {
      // 给 item 添加一个些额外属性
      this.$set(item, "loading", false);
      this.$set(item, "finished", false);
      this.$set(item, "articleList", []);
      this.$set(item, "isLoading", false);
      this.$set(item, "timestamp", null);
      // 修改 show 属性时不能修改 修改 channelsList 时可以修改
      // 原因： show 是一个简单数据类型  channelsList  是一个复杂数据类型
      // 将 item 添加到 channelList 中
      this.channelList.push(item);
      // 判断用户是否登录
      let token = this.$store.state.user.token;
      if (token) {
        // 说明已经登录
        // 将新的频道数据生成一个 channels 数组
        // 从数组中去掉第一个元素
        let channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          };
        });
        // 将新的频道数据 channels 提交到服务器
        let res = await apiResetChannels(channels);
        console.log(res);
      } else {
        // 说明未登录
        // 将频道数据保存到本地
        setLocal("channels", this.channelList);
      }
    },
    // 删除频道 
    async delchannel(index) {
      // index 当前点击频道的下标
      // 将当前点击的频道数据从我的频道中删除
      this.channelList.splice(index, 1)
      let token = this.$store.state.user.token
      // 判断用户是否登录
      if(token) {
        // 已经登录
        // 根据新的频道数据 生成channels
        let channels = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 提交到服务器
        await apiResetChannels(channels)
      } else {
        // 未登录存本地
        setLocal('channels', this.channelList)
      }
    },
    // 修改频道
    changeChannel(index) {
      // index要切换的下标 传入父组件 home
      this.$emit("update:activeChannels", index)
    }
  },
  // 计算属性：
  //     1）将计算的结果进行缓存
  //     2）当计算属性的依赖项发生改变时会重新执行方法，重新生成数据，将数据重新缓存
  computed: {
    // 频道推荐的数据源
    otherChannels: function() {
      // 返回 allChannels 中 channelList 不存在的元素
      // 1）得到 channelList 中所有元素的 id 的集合
      let idsArr = this.channelList.map(item => {
        return item.id;
      });
      // 2)取出数据
      let resArr = this.allChannels.filter(item => {
        // 返回所有 item.id 不在 idsArr 中的元素
        return idsArr.indexOf(item.id) === -1;
      });
      // 返回新的数组
      return resArr;
    }
  },
  created() {
    // 得到所有的频道数据
    this.getAllChannels();
  }
};
</script>

<style lang='less' scoped>
.fatheritem {
  position: relative;
  .sonicon {
    position: absolute;
    top: 0px;
    right: 0px;
    color: #ccc;
  }
}
.active {
  color: red;
}
</style>