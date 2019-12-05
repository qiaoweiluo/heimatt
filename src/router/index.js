// 导入了vue
import Vue from 'vue'
// 导入了 vue-router 
import VueRouter from 'vue-router'
// 导入组件
import UserVant from '../views/uservant';
import Login from "../views/login";
import Home from '../views/home/';
import My from '../views/my';
import Layout from '../views/layout';

Vue.use(VueRouter)

// const routes = [

// ]
// const router = new VueRouter({
//   routes
// })
// export default router

// 简写形式
export default new VueRouter({
  routes: [{
      path: '/UserVant', // 请求的路径(路由)
      name: 'uservant', // 给当前 路由 设置一个别名
      component: UserVant // 当前路由对应的组件
    },
    // 登录路由
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // tabBar 切换
    {
      path: '/layout',
      component: Layout,
      // 嵌套路由
      children: [
        // home路由
        {
          path: '/home',
          component: Home
        },
        // my路由
        {
          path: '/my',
          component: My
        },
      ]
    }
  ]
})