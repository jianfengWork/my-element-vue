<template>
  <div id="layout">
    <el-container class="container">
      <xf-aside :menu-expland="menuExpland" :nav-color="$store.state.themeColor" />
      <el-container>
        <el-header>
          <i @click="menuExpland = !menuExpland" class="menu-icon target-dom-left" :class="{'el-icon-sunny': !menuExpland , 'el-icon-sunrise': menuExpland}" />
          <span class="language">{{ $t('message')['app.header.desc'] }}</span>
          <el-button type="primary" @click="changeWaterMark">{{ showWaterMark ? '关闭水印' : '打开水印' }}</el-button>
          <el-button type="text" @click="showNoviceGuide">新手指引</el-button>
          <div class="DIB" ref="language">
            <el-select v-model="value" @change="selectLanguage">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </div>
          <screenfull class="right-menu-item" />
          <!-- <router-link :to="`/login?locale=${$store.state.systemLanguage}`"> -->
          <div class="DIB" ref="loginout">
            <el-button type="primary" @click="loginOut" class="target-dom">{{ $t('message')['app.header.login'] }}</el-button>
          </div>
          <!-- </router-link> -->
          <img v-if="avatarUrl" :src="avatarUrl" class="heder_avatar" />
        </el-header>
        <el-main>
          <router-view name="header" />
          <!-- <transition name="router-transform" mode="out-in"> -->
            <keep-alive>
              <router-view v-if="$route.meta.title === '购物车'" />
            </keep-alive>
            <router-view v-if="$route.meta.title !== '购物车'" />
          <!-- </transition> -->
          <i class="el-icon-setting setting" :style="{'background': $store.state.themeColor}" @click="showDrawer" />
        </el-main>
      </el-container>
    </el-container>
    <drawer :visible="showSetting" width="450px" @closeDrawer="() => showSetting = false">
      <div slot="content">
        <!-- <div>导航风格</div>
        <el-color-picker v-model="color" @change="changeThemeColor" /> -->
        <div>导航加主题风格</div>
        <theme-picker @change="changeThemeColor" />
      </div>
    </drawer>
    <theme-picker ref="themePickerDom" v-show="false" />
    <NoviceGuide v-if="fristCensor" @close-guide="fristCensor = false" />
  </div>
</template>

<script>
import queryString from 'query-string'
import xfAside from './components/Aside'
import Screenfull from '@/components/ScreenFull/screenfull'
import NoviceGuide from '@/components/NoviceGuide/noviceGuide'
import { removeWatermark, setWaterMark } from '@/utils/waterMark'

export default {
  name: 'Layout',
  data() {
    return {
      value: '',
      options: [
        {label: '简体中文', value: 'zhCN'},
        {label: 'English', value: 'enUS'},
      ],
      menuExpland: false,
      showSetting: false,
      color: '',
      avatarUrl: '',
      fristCensor: false,
      showWaterMark: false,
    }
  },
  watch: {
    '$route.path': function(val, oldval) { // 监听路由变化
      // console.log(val, oldval) // 存在二次点击语言消失，导航里面复写
      this.$router.push({query: {locale: this.value}})
    }
  },
  beforeDestroy() {
    this.$bus.$off('changeAvatar')
    localStorage.clear('avatar')
  },
  mounted() {
    this.$refs.themePickerDom.theme = ''
    setTimeout(() => {
      this.$refs.themePickerDom.theme = this.color
    }, 300)
    this.avatarUrl = localStorage.getItem('avatar') || require('../../assets/avatar.jpeg')
    this.$bus.$on('changeAvatar', (item) => {
      this.avatarUrl = item
    })
    // 新手指引
    this.$store.commit('SET_NOVICE_GUIDE_ELEM', [])
    this.$nextTick(_ => {
      this.$store.commit('SET_NOVICE_GUIDE_ELEM', {
        DOMelems: this.$refs['language'],
        type: 'language',
        tipText: '切换中英文',
      })
      this.$store.commit('SET_NOVICE_GUIDE_ELEM', {
        DOMelems: this.$refs['loginout'],
        type: 'loginout',
        tipText: '退出登录咯',
      })
    })
  },
  created() {
    this.color = localStorage.getItem('themeColor') || this.$store.state.themeColor
    this.$store.commit('CHANGE_THEME_COLOR', this.color)
    
    if (queryString.parse(location.search).locale) {
      this.value = queryString.parse(location.search).locale || 'zhCN'
    } else {
      this.$router.push({
        query: {locale: localStorage.getItem('systemLanguage') || 'zhCN'}
      })
      this.value = localStorage.getItem('systemLanguage') || 'zhCN'
    }
    this.$store.commit('CHANGE_SYSTEM_LANGUAGE', this.value)
  },
  methods: {
    showNoviceGuide() {
      this.fristCensor = true
    },
    loginOut() {
      this.$router.push({
        path: '/login',
        query: {locale: queryString.parse(location.search).locale || localStorage.getItem('systemLanguage') || 'zhCN'}
      })
      setTimeout(() => { // login 和 Layout 不在同个视图，localStorage会被清空
        localStorage.setItem('themeColor', this.$store.state.themeColor)
        localStorage.setItem('systemLanguage', this.$store.state.systemLanguage)
      }, 300)
    },
    selectLanguage(key) {
      this.$router.push({query: {...this.$route.query, locale: key}}) // 改变 ？之后参数
      this.$i18n.locale = key
      localStorage.setItem('systemLanguage', key)
      this.$store.commit('CHANGE_SYSTEM_LANGUAGE', key)
    },
    showDrawer() {
      this.showSetting = true
    },
    changeThemeColor(val) {
      this.color = val || this.$store.state.themeColor
      localStorage.setItem('themeColor', this.color)
      this.$store.commit('CHANGE_THEME_COLOR', this.color)
      this.$bus.$emit('changeOptions', this.color)
      this.showSetting = false
    },
    changeWaterMark() {
      this.showWaterMark = !this.showWaterMark
      if (this.showWaterMark) {
        const current = new Date()
        const year = current.getFullYear()
        const month = current.getMonth() > 9 ? current.getMonth() + 1 : '0' + (current.getMonth() + 1)
        const day = current.getDate() > 9 ? current.getDate() : '0' + current.getDate()
        const date = `${year}${month}${day}`
        setWaterMark('summer', 'userId', date)
      } else {
        removeWatermark()
      }
    },
  },
  components: {
    xfAside, Screenfull, NoviceGuide
  }
}
</script>

<style lang="scss">
#layout {
  width: 100%;
  height: 100%;
  .container {
    height: 100%;
  }
  .el-header {
    text-align: right;
    .el-button {
      margin-top: 10px;
    }
  }
  .el-main {
    background: rgb(236, 240, 245);
    & > div:first-child {
      background: #fff;
      padding: 20px;
    }
  }
  .menu-icon {
    float: left;
    cursor: pointer;
    font-size: 30px;
    line-height: 60px;
  }
  .language {
    float: left;
    line-height: 60px;
    margin-left: 30px;
  }
  .setting {
    position: fixed;
    top: 30%;
    right: 0;
    z-index: 10;
    color: #fff;
    font-size: 26px;
    background: #00b8e6;
    padding: 12px;
    cursor: pointer;
    border-radius: 5px;
  }
  .right-menu-item {
    display: inline-block;
    margin: 0 20px;
    font-size: 18px;
    color: #5a5e66;
    cursor: pointer;
  }
  .el-alert--success {
    margin-bottom: 10px;
  }
  .heder_avatar {
    float: right;
    width: 40px;
    height: 40px;
    margin: 10px 0 0 20px;
    border-radius: 5px;
  }
}
// router-transform
.router-transform-leave-active,
.router-transform-enter-active {
  transition: all .5s;
}
.router-transform-enter {
  opacity: 0;
  // transform: translateX(-30px);
}
.router-transform-leave-to {
  opacity: 0;
  // transform: translateX(30px);
}
</style>
