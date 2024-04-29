<template>
  <div class="nav-bar">
    <div class="nav-header"></div>
    <div class="nav-main">
      <div class="nav-cont">
        <div class="nav-banner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    var banner = document.querySelector('.nav-banner')
    var bannerHeight = banner.offsetHeight
    var search = document.querySelector('.nav-header')
    var navMain = document.querySelector('.nav-main')
    navMain.onscroll = function(e) {
      var scrollTop = e.target.scrollTop
      // 计算比例值，获取透明度，设置背景颜色的样式
      var opacity = 0
      if (scrollTop < bannerHeight) {
        opacity = scrollTop / bannerHeight
        search.style.backgroundColor = "rgba(233,35,36," + opacity + ")"
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 100%;
  .nav-main {
    width: 300px;
    height: 500px;
    background: #304156;
    overflow: auto;
    position: relative;
  }
  .nav-header {
    width: 300px;
    height: 40px;
  }
  .nav-cont {
    width: 100%;
    height: 680px;
  }
  .nav-banner {
    width: 100%;
    height: 180px;
    background: #1270C9;
  }
}
</style>
