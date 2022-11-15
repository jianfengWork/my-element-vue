<template>
  <div class="router-nav">
    <ul class="menu-list">
      <el-button type="primary" size="mini" @click="$router.push('/dashboard/index')">前往首页</el-button>
      <li
        :class="{'active': $index == active}"
        v-for="(item, $index) in menuList" :key="$index"
        @click="changeHash(item, $index)"
      >{{ item.name }}</li>
    </ul>
    <div class="menu-main">
      <div id="name1">内容一</div>
      <div id="name2">内容二</div>
      <div id="name3">内容三</div>
      <div id="name4">内容四</div>
      <div id="name5">内容五</div>
    </div>
  </div>
</template>

<script>
/**
 * html, body 高度 100% 去掉
 */
export default {
  data() {
    const activeEnum = {
      '#name1': 0,
      '#name2': 1,
      '#name3': 2,
      '#name4': 3,
      '#name5': 4,
    }
    return {
      active: activeEnum[this.$route.hash] || 0,
      menuList: [
        { name: '导航一', hash: 'name1' },
        { name: '导航二', hash: 'name2' },
        { name: '导航三', hash: 'name3' },
        { name: '导航四', hash: 'name4' },
        { name: '导航五', hash: 'name5' },
      ],
    }
  },
  mounted() {
    const htmlDom = document.querySelector('html')
    const bodyDom = document.querySelector('body')
    htmlDom.style.height = 'auto'
    bodyDom.style.height = 'auto'
  },
  beforeDestroy() {
    const htmlDom = document.querySelector('html')
    const bodyDom = document.querySelector('body')
    htmlDom.style.height = '100%'
    bodyDom.style.height = '100%'
  },
  methods: {
    changeHash(item, index) {
      this.active = index
      this.$router.push({ hash: item.hash })
    }
  }
}
</script>

<style lang="scss" scoped>
.router-nav {
  width: 100%;
  .menu-list {
    position: fixed;
    top: 100px;
    left: 100px;
    padding: 10px;
    background: #f5f5f5;
    li {
      color: #333;
      line-height: 36px;
      padding-left: 10px;
      position: relative;
      cursor: pointer;
      width: 100px;
      &:hover {
        color: #4350F5;
      }
    }
    .active {
      color: #4350F5;
      &::before {
        display: inline-block;
        content: "";
        width: 3px;
        height: 40%;
        background: #3760F4;
        position: absolute;
        left: 0;
        top: 30%;
      }
    }
  }
  .menu-main {
    width: 100%;
    padding: 30px 30px 30px 300px;
    box-sizing: border-box;
    div {
      width: 100%;
      height: 600px;
    }
  }
}
</style>
