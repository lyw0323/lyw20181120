import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载

// 一级路由
const Home = () => import('@/views/Home')
const login = () => import('@/views/login/login')
const index = () => import('@/views/index')

// 二级路由 旧件，配件
const Order = () => import('@/views/index/order')
const autoparts = () => import('@/views/autoparts/autoparts')

// 三级路由 旧件详情，新增旧件
const orderDetails = () => import('@/views/index/order/orderDetails')
const addAllOrder = () => import('@/views/index/order/addAllOrder')
// 三级路由旧物详情
const autopartsDetails = () => import('@/views/autoparts/Details/autopartsDetails')

// 空白页面 做刷新使用
const emptyPage = () => import('@/views/index/emptyPage')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: Home,
      redirect:'Home'
    },
    {
      name: 'Home',
      path: '/Home',
      component: Home,
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'index',
      path: '/index',
      component: index,
      redirect:'Order',
      children: [
        {name: 'Order',           path: '/order',           component: Order},
        {name: 'addAllOrder',     path: '/addAllOrder',     component: addAllOrder},
        {name: 'orderDetails',    path: '/orderDetails',    component: orderDetails},
        {name: 'autoparts',       path: '/autoparts',       component: autoparts},
        {name: 'autopartsDetails',path: '/autopartsDetails',component: autopartsDetails},
        {name: 'emptyPage',       path: '/emptyPage',       component: emptyPage},
      ]
    },
    {path:'*',redirect:'/'}
  ]
})

export default router
