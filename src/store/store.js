import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import variables from '@/style/element-variables.scss'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 1,
    themeColor: variables.theme, // 主题颜色
    systemLanguage: 'zhCN', // 系统语言
    routerPermission: {},
  },
  mutations: { // 只更改state数据，由$store.commit('ADD_COUNT')调用
    ADD_COUNT(state, n) {
      state.count += n
    },
    CHANGE_THEME_COLOR(state, color) {
      state.themeColor = color
    },
    CHANGE_SYSTEM_LANGUAGE(state, language) {
      state.systemLanguage = language
    },
    SET_ROUTER_PERMISSION(state, router) { // 路由权限
      state.routerPermission = router
    }
  },
  actions: { // 异步操作数据，由$store.dispatch('addCount')调用
    addCount({ commit }, n) {
      commit('ADD_COUNT', n)
    },
    getRouterPermission({ commit }) {
      let router = {
        FILES: false,
        DOWNLOAD: true,
      }
      commit('SET_ROUTER_PERMISSION', router)
    }
  },
  getters: { // 类似于计算属性，缓存数据
    boubleCount(state) {
      return state.count * 2
    }
  },
  modules: { // 单独定义模块
    user
  }
})

export default store
