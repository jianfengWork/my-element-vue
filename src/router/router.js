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
  mode: 'hash', // require service support
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    }
  },
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
      path: '/nav',
      name: 'routerNav',
      hide: true,
      meta: {icon: '', title: ''},
      component: () => import('@/RouetrNav')
    },
    {
      path: '/monaco',
      name: 'monacoEditor',
      hide: true,
      meta: {icon: '', title: ''},
      component: () => import('@/view/monaco/MonacoEditor')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Layout,
      redirect: '/dashboard/index',
      meta: { title: 'Dashboard', icon: 'el-icon-menu' },
      children: [{
        path: '/dashboard/index', // 绝对路径 || index 相对路径 (此处使用绝对路径是 path 高亮路由，可用 name 代替)
        name: 'Index',
        components: { // 命名视图
          header: () => import('@/view/methods/Solt'),
          default: () => import('../view/dashboard/Index')
        },
        meta: { title: '首页', }
      }, {
        path: '/dashboard/analysis',
        name: 'Analysis',
        hide: false,
        component: () => import('../view/dashboard/Analysis'),
        meta: { title: 'Analysis', }
      }, {
        path: '/dashboard/chinamap',
        name: 'Chinamap',
        hide: false,
        component: () => import('../view/dashboard/ChinaMap'),
        meta: { title: 'ChinaMap', }
      }, {
        path: '/dashboard/AHmap',
        name: 'AHmap',
        hide: false,
        component: () => import('../view/dashboard/AHmap'),
        meta: { title: '安徽地图', }
      }, {
        path: '/dashboard/canvas',
        name: 'Canvas',
        hide: false,
        component: () => import('../view/dashboard/Canvas'),
        meta: { title: 'Canvas', }
      }, {
        path: '/dashboard/cropper',
        name: 'Cropper',
        hide: false,
        component: () => import('../view/dashboard/Cropper'),
        meta: { title: 'Cropper', }
      }]
    },
    {
      path: '/tools',
      name: 'Tools',
      component: Layout,
      redirect: '/tools/command',
      meta: { title: 'Tools', icon: 'el-icon-brush', },
      children: [{
        path: '/tools/bpmn',
        name: 'bpmn',
        component: () => import('@/view/tools/bpmn/BPMN'),
        meta: { title: 'BPMN' }
      }, {
        path: '/tools/bmap',
        name: 'bmap',
        component: () => import('@/view/tools/bmap/BMap'),
        meta: { title: 'BMap' }
      }, {
        path: '/tools/print',
        name: 'vuePrint',
        component: () => import('@/view/tools/VuePrint'),
        meta: { title: 'VuePrint' }
      }, {
        path: '/tools/g6',
        name: 'G6',
        component: () => import('@/view/tools/G6'),
        meta: { title: 'G6' }
      }, {
        path: '/tools/vuex',
        name: 'Vuex',
        component: () => import('@/view/tools/Vuex'),
        meta: { title: 'VUEX' }
      }, {
        path: '/tools/axios',
        name: 'Axios',
        component: () => import('@/view/tools/Axios'),
        meta: { title: 'Axios' }
      }, {
        path: '/tools/svg',
        name: 'Svg',
        component: () => import('../view/tools/SvgIcon'),
        meta: { title: 'SVG / ICON' }
      }, {
        path: '/tools/image',
        name: 'Image',
        component: () => import('../view/tools/Image'),
        meta: { title: 'Image' }
      }, {
        path: '/tools/graphic',
        name: 'Graphic',
        component: () => import('@/view/tools/Graphic'),
        meta: { title: '验证码' }
      }, {
        path: '/tools/countup',
        name: 'CountUp',
        component: () => import('@/view/tools/CountUp'),
        meta: { title: 'CountUp / 时分秒' }
      }, {
        path: '/tools/transition',
        name: 'Transition',
        component: () => import('@/view/tools/Transition'),
        meta: { title: 'Transition' }
      }, {
        path: '/tools/vueqr',
        name: 'VueQr',
        component: () => import('@/view/tools/VueQr'),
        meta: { title: 'VueQr' }
      }, {
        path: '/tools/spreadsheet',
        name: 'Spreadsheet',
        component: () => import('@/view/tools/Spreadsheet/OnlineExcel'),
        meta: { title: 'x-data-spreadsheet' }
      }, {
        path: '/tools/docx',
        name: 'DocxPreview',
        component: () => import('@/view/tools/DocxPreview'),
        meta: { title: 'docx-preview' }
      }]
    },
    {
      path: '/front',
      name: 'Front',
      component: Layout,
      redirect: '/front/goods',
      meta: { title: '前端', icon: 'el-icon-monitor' },
      children: [{
        path: '/front/magnifier',
        name: 'Magnifier',
        component: () => import('@/view/front/magnifierMG/Magnifier'),
        meta: { title: '放大镜' }
      }, {
        path: '/front/audio',
        name: 'Audio',
        component: () => import('@/view/front/audioMG/Audio'),
        meta: { title: 'Audio' }
      }, {
        path: '/front/video',
        name: 'Video',
        component: () => import('@/view/front/videoMG/Video'),
        meta: { title: 'Video' }
      }, {
        path: '/front/goods',
        name: 'Goods',
        component: () => import('@/view/front/Goods'),
        meta: { title: '滑动商品 / 滚动条', }
      }, {
        path: '/front/cart',
        name: 'Cart',
        component: resolve => require(['@/view/front/Cart'], resolve), // 路由懒加载
        meta: { title: '购物车', }
      }, {
        path: '/front/floor',
        name: 'Floor',
        component: () => import('@/view/front/Floor'),
        meta: { title: '楼层', }
      }, {
        path: '/front/drag',
        name: 'Drag',
        component: () => import('@/view/front/DragList'),
        meta: { title: '拖拽列表 / 导航动画', }
      }, {
        path: '/front/mouse',
        name: 'Mouse',
        component: () => import('@/view/front/MouseDrag'),
        meta: {title: '鼠标三剑客',
        }
      }, {
        path: '/front/cloud',
        name: 'Cloud',
        component: () => import('@/view/front/WordCloud'),
        meta: {title: '词云 / 手风琴', }
      }, {
        path: '/front/recorder',
        name: 'Recorder',
        component: () => import('@/view/front/Recorder'),
        meta: {title: '录音', }
      }, {
        path: '/front/clamp',
        name: 'Clamp',
        component: () => import('@/view/front/Clamp'),
        meta: {title: '文本截断 / 原生拖拽', }
      }, {
        path: '/water/flow',
        name: 'waterFlow',
        component: () => import('@/view/front/waterFlow/WaterFlow'),
        meta: {title: '瀑布流', }
      }, {
        path: '/front/stellar',
        name: 'stellar',
        component: () => import('@/view/front/Stellar'),
        meta: {title: '视差滚动', }
      }]
    },
    {
      path: '/gaode',
      name: 'gaoDe',
      component: Layout,
      redirect: '/gaode/weather',
      meta: { title: '高德地图', icon: 'el-icon-position' },
      children: [
        {
          path: '/gaode/weather',
          name: 'Weather',
          component: () => import('@/view/gaode/weather.vue'),
          meta: { title: '获取城市天气', }
        },
        {
          path: '/gaode/search',
          name: 'Search',
          component: () => import('@/view/gaode/search.vue'),
          meta: { title: '周边搜索', }
        },
        {
          path: '/gaode/district',
          name: 'District',
          component: () => import('@/view/gaode/district.vue'),
          meta: { title: '行政区查询', }
        },
        {
          path: '/gaode/geo',
          name: 'GeoJSON',
          component: () => import('@/view/gaode/GeoJSON.vue'),
          meta: { title: 'GeoJSON', }
        },
      ]
    },
    {
      path: '/files',
      name: 'Files',
      sign: 'FILES', // 区分权限名称
      component: Layout,
      redirect: '/files/download',
      meta: { title: 'Files', icon: 'el-icon-folder' },
      children: [{
        path: '/files/download',
        name: 'DOWNLOAD',
        sign: 'DOWNLOAD',
        component: () => import('../view/files/Download'),
        meta: { title: 'DOWNLOAD', }
      }, {
        path: '/files/upload',
        name: 'Upload',
        component: () => import('../view/files/Upload'),
        meta: { title: 'UPLOAD', }
      }]
    },
    {
      path: '/methods',
      name: 'Methods',
      component: Layout,
      redirect: '/methods/solt',
      meta: { title: 'Methods', icon: 'el-icon-guide' },
      children: [{
        path: '/methods/solt',
        name: 'Solt',
        component: () => import('@/view/methods/Solt'),
        meta: { title: '作用域插槽', }
      }, {
        path: '/methods/command',
        name: 'Command',
        hide: false,
        component: () => import('@/view/methods/Command'),
        meta: { title: '自定义指令', }
      }]
    },
    {
      path: '/tinymce',
      name: 'Tinymce',
      component: Layout,
      redirect: '/tinymce/rich',
      meta: { title: '富文本编辑器', icon: 'el-icon-document' },
      children: [
        {
          path: '/tinymce/rich',
          name: 'Rich',
          component: () => import('../view/tinymce/RichTinymce'),
          meta: { title: '富文本编辑器', }
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
    },
    {
      path: '/knowledge',
      name: 'Knowledge',
      component: Layout,
      redirect: '/knowledge/sort',
      meta: { title: '知识库', icon: 'el-icon-medal' },
      children: [
        {
          path: '/knowledge/sort',
          name: 'Sort',
          component: () => import('@/view/knowledge/sortMG/Sort'),
          meta: { title: '排序算法', }
        },
        {
          path: '/knowledge/recursion',
          name: 'Recursion',
          component: () => import('@/view/knowledge/Recursion'),
          meta: { title: '尾递归', }
        },
        {
          path: '/knowledge/videocover',
          name: 'videoCover',
          component: () => import('@/view/knowledge/VideoCover'),
          meta: { title: '获取上传视频封面', }
        },
        {
          path: '/knowledge/bird',
          name: 'Bird',
          component: () => import('@/view/knowledge/birdMG/Bird'),
          meta: { title: '像素鸟', }
        },
      ]
    },
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
