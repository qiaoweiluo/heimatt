// 导入了vue
import Vue from 'vue'
// 道导入了 vuex 
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存用户信息 
    // 有则取值 
    user: JSON.parse(window.localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    setUser: function (state, payload) {
      // 给uesr赋值
      state.user = payload
      // 保存到localstoreage中
      window.localStorage.setItem('userInfo',JSON.stringify(payload));
    }
  },
})
