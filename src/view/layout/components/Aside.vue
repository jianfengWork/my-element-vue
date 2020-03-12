<template>
  <el-aside class="aside" :style="currentColor" :class="{'aside-mini': menuExpland}">
    <div class="title">VUE</div>
    <el-menu
      :collapse="menuExpland"
      :default-active="$route.path"
      :router="false"
      @select="selectRouter"
      class="xf-menu better-scrollbar"
      :class="{'xs-mune-mini': menuExpland}"
      :background-color="navColor"
      text-color="#fff"
      :default-openeds="openList"
      :collapse-transition="false"
      active-text-color="#ffd04b">
      <div v-for="(item, $index) in asideList" :key="item.name">
        <el-submenu :index="String($index)" v-if="item.children && item.children.length > 1">
          <template slot="title" v-if="item.meta">
            <i :class="item.meta.icon" />
            <span slot="title" v-if="!menuExpland">{{item.meta.title}}</span>
          </template>
          <el-menu-item-group>
            <template v-for="elem in item.children">
              <el-menu-item v-if="elem.meta && !elem.hide" :key="elem.name" :index="elem.path">{{elem.meta.title}}</el-menu-item>
            </template>
          </el-menu-item-group>
        </el-submenu>
        <template v-else>
          <el-menu-item v-for="(elem, $index) in item.children" :key="$index" :index="elem.path">
            <template v-if="elem.meta">
              <i :class="item.meta.icon" />
              <span slot="title">{{elem.meta.title}}</span>
            </template>
          </el-menu-item>
        </template>
      </div>
    </el-menu>
    <div class="footer" @click="toggleOpen" :style="{'background': $store.state.themeColor}">
      <i class="el-icon-top" :class="{'el-icon-transtion': menuOpen }" />
    </div>
  </el-aside>
</template>
<script>
// 路由权限，应从layout传入有权限的router数组，循环展示
export default {
  name: 'Aside',
  props: {
    menuExpland: {
      type: Boolean,
      required: true
    },
    navColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      openList: [],
      menuOpen: false,
      asideList: []
    }
  },
  mounted() {
    this.$store.dispatch('getRouterPermission').then(() => { // 在这里渲染权限路由
      // console.log(this.$store.state.routerPermission)
      this.asideList = this.$router.options.routes.filter(item => !item.hide) // 过滤一级隐藏模块
      // console.log(this.asideList)
    })
  },
  methods: {
    selectRouter(route) { // 改变路由回调
      this.$router.push({
        path: route,
        query: {locale: this.$store.state.systemLanguage}
      })
    },
    toggleOpen() {
      this.menuOpen = !this.menuOpen
      if (this.menuOpen) {
        for (let item in this.asideList) {
          this.openList.push(String(item))
        }
      } else {
        this.openList = []
      }
    }
  },
  watch: {
    menuExpland(val) { // 手动全展开，再按钮展开，有问题
      if (!val) {
        setTimeout(() => {
          this.menuOpen = false
        }, 300)
      }
    }
  },
  computed: {
    currentColor() {
      return {
        background: `${this.navColor}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.aside {
  width: 200px!important;
  color: #fff;
  position: relative;
  text-align: center;
  transition: all .3s;
  user-select: none; // 禁止文本选中
  &.aside-mini {
    width: 70px!important;
  }
  .title, .footer {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, .5);
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 26px;
    cursor: pointer;
    border-bottom: none;
    border-top: 1px solid rgba(255, 255, 255, .5);
  }
  .el-icon-top {
    transition: all .3s;
  }
  .el-icon-transtion {
    transform: rotate(180deg);
  }
  .el-menu {
    width: 200px;
    line-height: 50px;
    border-right: none;
    max-height: calc(100% - 122px);
    &.xs-mune-mini {
      width: 70px;
    }
  }
  .el-menu-item.is-active {
    background: rgb(0, 147, 184);//!important;
    i {
      color: #ffd04b !important;
    }
  }
  .el-submenu__title span, .el-menu-item span {
    width: 100px;
    text-align: left;
    padding-left: 10px;
    display: inline-block;
  }
}
</style>
<style lang="scss">
.el-submenu {
  border: none;
}
.xs-mune-mini .el-submenu__icon-arrow {
  display: none;
}
.aside {
  .el-menu-item i, .el-submenu__title i {
    color: #fff;
  }
}
.el-menu-item-group__title {
  padding: 0;
}
</style>
