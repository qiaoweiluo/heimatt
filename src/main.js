// 导入vue
import Vue from 'vue'
// 导入App.vue
import App from './App.vue'
// 导入路由
import router from './router'
// 导入仓库
import store from './store'

// 设置当前为开发环境
Vue.config.productionTip = false

new Vue({
  router, // 挂载路由
  store,  // 挂载仓库
  render: h => h(App)  // 渲染根组件
}).$mount('#app')  // 将内容渲染视图容器中
