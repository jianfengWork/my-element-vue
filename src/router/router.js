import Vue from 'vue'
import NProgress from 'nprogress' // 进度条
import "nprogress/nprogress.css"
import Router from 'vue-router'

Vue.use(Router)
// 解决路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

import Layout from '@/view/layout/Layout'

// component: { render: h => h('router-view') }, // 视图占位
const router = new Router({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history', // hash 模式会带#
  history: true,
  base: process.env.NODE_ENV === 'production' ? '/my-element-vue/' : '',
  routes: [ // 配置路由
    { path: '/', redirect: '/dashboard/index', hide: true },
    { path: '/layout', component: () => import('@/view/layout/Layout'), hide: true },
    { path: '*', name: '404', hide: true, component: () => import('@/view/layout/404') },
    {
      path: '/login',
      name: 'Login',
      hide: true, // 自定义标志位，不渲染该菜单
      meta: {icon: '', title: ''}, // 图标，标题
      component: () => import('../view/layout/Login')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Layout,
      redirect: '/dashboard/index',
      meta: {
        title: 'Dashboard',
        icon: 'el-icon-menu'
      },
      children: [{
        path: '/dashboard/index',
        name: 'Index',
        component: () => import('../view/dashboard/Index'),
        meta: {
          title: '首页',
        }
      }, {
        path: '/dashboard/analysis',
        name: 'Analysis',
        hide: false,
        component: () => import('../view/dashboard/Analysis'),
        meta: {
          title: 'Analysis',
        }
      }, {
        path: '/dashboard/chinamap',
        name: 'Chinamap',
        hide: false,
        component: () => import('../view/dashboard/ChinaMap'),
        meta: {
          title: 'ChinaMap',
        }
      }, {
        path: '/dashboard/canvas',
        name: 'Canvas',
        hide: false,
        component: () => import('../view/dashboard/Canvas'),
        meta: {
          title: 'Canvas',
        }
      }]
    },
    {
      path: '/methods',
      name: 'Methods',
      component: Layout,
      redirect: '/methods/solt',
      meta: {
        title: 'Methods',
        icon: 'el-icon-guide'
      },
      children: [{
        path: '/methods/solt',
        name: 'Solt',
        component: () => import('@/view/methods/Solt'),
        meta: {
          title: '作用域插槽',
        }
      }, {
        path: '/methods/command',
        name: 'Command',
        hide: false,
        component: () => import('@/view/methods/Command'),
        meta: {
          title: '自定义指令',
        }
      }]
    },
    {
      path: '/tools',
      name: 'Tools',
      component: Layout,
      redirect: '/tools/command',
      meta: {
        title: 'Tools',
        icon: 'el-icon-brush',
      },
      children: [{
        path: '/tools/vuex',
        name: 'Vuex',
        component: () => import('@/view/tools/Vuex'),
        meta: {
          title: 'VUEX'
        }
      }, {
        path: '/tools/axios',
        name: 'Axios',
        component: () => import('@/view/tools/Axios'),
        meta: {
          title: 'Axios'
        }
      }, {
        path: '/tools/svg',
        name: 'Svg',
        component: () => import('../view/tools/SvgIcon'),
        meta: {
          title: 'SVG&ICON'
        }
      }, {
        path: '/tools/image',
        name: 'Image',
        component: () => import('../view/tools/Image'),
        meta: {
          title: 'Image'
        }
      }, {
        path: '/tools/graphic',
        name: 'Graphic',
        component: () => import('@/view/tools/Graphic'),
        meta: {
          title: '验证码'
        }
      }, {
        path: '/tools/countup',
        name: 'CountUp',
        component: () => import('@/view/tools/CountUp'),
        meta: {
          title: 'CountUp'
        }
      }]
    },
    {
      path: '/files',
      name: 'Files',
      sign: 'FILES', // 区分权限名称
      component: Layout,
      redirect: '/files/download',
      meta: {
        title: 'Files',
        icon: 'el-icon-folder'
      },
      children: [{
        path: '/files/download',
        name: 'DOWNLOAD',
        sign: 'DOWNLOAD',
        component: () => import('../view/files/Download'),
        meta: {
          title: 'DOWNLOAD',
        }
      }, {
        path: '/files/upload',
        name: 'Upload',
        component: () => import('../view/files/Upload'),
        meta: {
          title: 'UPLOAD',
        }
      }]
    },
    {
      path: '/front',
      name: 'Front',
      component: Layout,
      redirect: '/front/goods',
      meta: {
        title: '前端',
        icon: 'el-icon-monitor'
      },
      children: [{
        path: '/front/goods',
        name: 'Goods',
        component: () => import('@/view/front/Goods'),
        meta: {
          title: '滑动商品',
        }
      }, {
        path: '/front/cart',
        name: 'Cart',
        component: resolve => require(['@/view/front/Cart'], resolve), // 路由懒加载
        meta: {
          title: '购物车',
        }
      }, {
        path: '/front/floor',
        name: 'Floor',
        component: () => import('@/view/front/Floor'),
        meta: {
          title: '楼层',
        }
      }, {
        path: '/front/drag',
        name: 'Drag',
        component: () => import('@/view/front/DragList'),
        meta: {
          title: '拖拽列表',
        }
      }, {
        path: '/front/cloud',
        name: 'Cloud',
        component: () => import('@/view/front/WordCloud'),
        meta: {
          title: '词云',
        }
      }, {
        path: '/front/recorder',
        name: 'Recorder',
        component: () => import('@/view/front/Recorder'),
        meta: {
          title: '录音',
        }
      }, {
        path: '/front/clamp',
        name: 'Clamp',
        component: () => import('@/view/front/Clamp'),
        meta: {
          title: '多行文本截断',
        }
      }]
    },
    {
      path: '/tinymce',
      name: 'Tinymce',
      component: Layout,
      redirect: '/tinymce/rich',
      meta: {
        title: '富文本编辑器',
        icon: 'el-icon-document'
      },
      children: [
        {
          path: '/tinymce/rich',
          name: 'Rich',
          component: () => import('../view/tinymce/RichTinymce'),
          meta: {
            title: '富文本编辑器',
          }
        },
        // {
        //   path: '/tinymce/simple',
        //   name: 'Simple',
        //   component: () => import('../view/tinymce/SimpleTinymce'),
        //   meta: {
        //     title: '简单化富文本编辑器',
        //   }
        // }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => { // 路由首位，to > 将要到达的路由，from > 当前路由，next > 执行回调
  if (to.path !== from.path) { // 改变参数不触发进度条
    NProgress.start()
  }
  next()
})

router.afterEach(() => { // 关闭进度条
  NProgress.done()
})

export default router
