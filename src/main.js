// 导入vue
import Vue from 'vue'
// 导入vanta
import Vant from 'vant';
// 导入vant的样式
import 'vant/lib/index.css';
// 导入App.vue
import App from './App.vue'
// 导入路由
import router from './router'
// 导入仓库
import store from './store'
// 导入字体图标
import "./style/myiconfont.css"

// 使用vant
Vue.use(Vant);

// 设置当前为开发环境
Vue.config.productionTip = false

new Vue({
  router, // 挂载路由
  store,  // 挂载仓库
  render: h => h(App)  // 渲染根组件
}).$mount('#app')  // 将内容渲染视图容器中
