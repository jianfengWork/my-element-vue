<template>
  <div class="transition-text">
    <span>我是一段文字</span>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.transition-text {
  overflow: hidden;
  span {
    display: inline-block;
    position: relative;
    font-weight: bold;
    color: #000;
    font-size: 26px;
    line-height: 1;
    &::before {
      content: '';
      position: absolute;
      left: -100%;
      width: 20px;
      height: 26px;
      background: #fff;
      opacity: 0.5;
      animation: shine 1.5s linear infinite;
    }
  }
}
@keyframes shine {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
