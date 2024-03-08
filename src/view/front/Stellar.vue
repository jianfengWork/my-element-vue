<template>
  <div class="stellar-wrap">
    <div data-stellar-background-ratio="1">
    </div>
    <div data-stellar-background-ratio="1">
    </div>
    <div data-stellar-background-ratio="0.3">
    </div>
    <div data-stellar-background-ratio="1">
    </div>
    <div data-stellar-background-ratio="1">
    </div>
  </div>
</template>

<script>
/**
 * data-stellar-background-ratio: 背景移动的速度。值越大，滚动时背景移动得越慢
 * data-stellar-horizontal-offset="40": 设置横向偏移，默认单位：px
 * data-stellar-vertical-offset="150": 设置纵向偏移，默认单位：px
 * $.stellar('refresh'): 窗口大小改变时刷新Stellar.js
 */
export default {
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      $('.stellar-wrap').stellar()
    })
    // 
    // 
  },
}
</script>

<style lang="scss" scoped>
.stellar-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  div:nth-child(1) {
    width: 533;
    height: 400px;
    background: url('./waterFlow/images/1.jpg') no-repeat;
  }
  div:nth-child(2) {
    width: 400px;
    height: 400px;
    background: url('./waterFlow/images/2.jpg') no-repeat;
  }
  div:nth-child(3) {
    width: 1000px;
    height: 666px;
    background: url('./waterFlow/images/3.jpg') no-repeat;
  }
  div:nth-child(4) {
    width: 740px;
    height: 555px;
    background: url('./waterFlow/images/4.jpg') no-repeat;
  }
  div:nth-child(5) {
    width: 800px;
    height: 553px;
    background: url('./waterFlow/images/6.jpg') no-repeat;
  }
}
</style>
