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
        <van-button :loading="isloading" class="mybtn" @click="login" size="large">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
// import axios from "axios";
// 在src文件下 可以用@符号代替../..
// import http from '@/utils/http'
import { apiLogin } from "../../api/user";

export default {
  data() {
    return {
      // 输入框数据
      user: {
        mobile: "13911111111",
        code: "246810"
      },
      // 验证提示信息
      yanzheng: {
        // 验证手机号格式错误提示信息
        mobile: "",
        // 验证码格式错误提示信息
        code: ""
      },
      // 加载效果
      isloading: false
    };
  },
  methods: {
    // 登录按钮的点击事件
    // async 用来修饰异步函数所在的函数
    // await 用来修饰异步函数
    login() {
      if (!this.checking()) {
        // console.log('验证通过');
        return;
        // 这样可以不用在if里面发请求
      }
      this.isloading = true;
      setTimeout(async () => {
        try {
          // 发请求到服务器,请求数据
          let res = await apiLogin(this.user);
          console.log(res);
          // 保存信息到 vuex & localStorage 中
          this.$store.commit("setUser", res.data.data);
          console.log(this.$store.state.user);
          // 跳转首页
          this.$router.push("/home");

          //  .then(res => {
          //     console.log(res)
          //     // 跳转首页
          //     this.$router.push('/hone')
          //   }).catch(error => {
          //     // 注意 错误信息的返回有两种方式(后台)
          //       // 1. 在res返回值中
          //       // 2. 写在catch中(直接返回一个400)
          //     console.log("错误信息");
          //   });
        } catch (error) {
          this.$toast.fail('登录失败');
        }
        this.isloading = false;
      }, 1000);
    },
    // 验证逻辑的封装
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
      return mobileF && codeF;
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