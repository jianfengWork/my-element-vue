import Vue from 'vue'
import VueI18n from 'vue-i18n'
import queryString from "query-string" // 解析url参数
import VueHighlightJS from "vue-highlightjs" // 代码高亮
import "highlight.js/styles/github.css"
import ElementUI from 'element-ui'
import './style/element-variables.scss' // 定制主题
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueParticles from 'vue-particles' // 登录背景
import './assets/font/iconfont.css' // icon
import './svg-icons' // svg-icon

// 定义请求方法
import {fetch, post, put, del, fileDownLoad} from './http/http'
Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.prototype.$del = del
Vue.prototype.$fileDownLoad = fileDownLoad

import Drawer from './components/Drawer/drawer' // 抽屉组件
Vue.component(Drawer.name, Drawer) // 组件名，组件
import globalComponent from '@/components/component' // 集成全局组件注册
Vue.use(globalComponent)

Vue.prototype.$bus = new Vue() // 消息总线

Vue.use(VueI18n)
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
})
Vue.use(VueParticles)
Vue.use(VueHighlightJS)
Vue.config.productionTip = false

// 复制
import clipboard from '@/utils/clipboard/clipboard'
Vue.use({
  install(Vue) {
    Vue.prototype.$clipboard = clipboard
  }
})

// 系统语言切换
import enUS from './locale/enUS'
import zhCN from './locale/zhCN'
const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || 'zhCN',
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS },
  }
})
// UI框架语言切换

new Vue({
  i18n,
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// vue inspect > output.js // 输出vue-cli内置配置
