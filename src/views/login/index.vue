<template>
  <div class="login">
    <van-nav-bar class="mynavbar">
      <template slot="title">
        <div class="mywords">登录</div>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <!-- 手机号输入 -->
      <van-field
        v-model="user.mobile"
        clearable
        placeholder="请输入手机号"
        :error-message="yanzheng.mobile"
      >
        <template slot="left-icon">
          <i class="iconfont icon-phone"></i>
        </template>
      </van-field>
      <!-- 验证码输入 -->
      <van-field v-model="user.code" placeholder="请输入验证码" :error-message="yanzheng.code">
        <template slot="left-icon">
          <i class="iconfont icon-cc-lock"></i>
        </template>
        <van-button class="mycodebtn" slot="button" size="small">获取验证码</van-button>
      </van-field>
      <!-- 登录按钮 -->
      <div class="myloginbtn">
        <van-button class="mybtn" @click="login" size="large">登录</van-button>
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
      },

      yanzheng: {
        // 验证手机号格式错误提示信息
        mobile: "",
        // 验证码格式错误提示信息
        code: ""
      }
    };
  },
  methods: {
    login() {
      if (this.checking()) {
        console.log('验证通过');
      }
    },
    checking() {
      // 简单的格式验证
      // 菜单按钮的假设思想取代return来判断是否通过
      let mobileF = true;
      let codeF = true;
      if (this.user.mobile.trim().length !== 11) {
        this.yanzheng.mobile = "手机号不合法";
        // return;
        mobileF = false;
      } else {
        this.yanzheng.mobile = "";
      }
      if (this.user.code.trim().length !== 6) {
        this.yanzheng.code = "验证码格式错误";
        // return;
        codeF = false;
      } else {
        this.yanzheng.code = "";
      }
      // 判断是否向下执行
      return mobileF && codeF
    }
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
      background-color: #6db4fb;
      border-radius: 10px;
      color: #fff;
    }
  }
}
</style>