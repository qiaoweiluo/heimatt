<template>
  <div class="login">
    <van-nav-bar class="mynavbar">
      <template slot="title">
        <div class="mywords">登录</div>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-field v-model="user.mobile" clearable placeholder="请输入手机号">
        <template slot="left-icon">
          <i class="iconfont icon-phone"></i>
        </template>
      </van-field>

      <van-field v-model="user.code" placeholder="请输入验证码">
        <template slot="left-icon">
          <i class="iconfont icon-cc-lock"></i>
        </template>
        <van-button class="mycodebtn" slot="button" size="small">获取验证码</van-button>
      </van-field>
      <div class="myloginbtn">
        <van-button class="mybtn" type="info" size="large">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        mobile: "",
        code: ""
      }
    };
  }
};
</script>
 
<style lang="less" scoped>
.login {
  .mynavbar {
    background-color: #3296fa;
    // 没效果
    // 方法一 : 给默认类型修改样式覆盖
    // 方法二: 使用插槽修改(建议)
    .mywords {
      color: aliceblue;
    }
  }
  .mycodebtn {
    background: #ededed;
    border-radius: 20px;
  }
  .myloginbtn {
    margin: 40px 20px;
    .mybtn {
      background-color: #6DB4FB;
      border-radius: 10px;
    }
  }
}
</style>