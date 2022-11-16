<template>
  <div class="float-dialog">
    <el-button type="primary" size="mini" @click="toogleFloat">{{ float ? '关闭' : '开启' }}浮动弹窗</el-button>
    <div class="float-box">
      <img class="mouse-img" :src="require('@/assets/avatar.jpeg')" alt="" />
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      float: false,
      timer: null,
      boxDom: null,
      x: 0,
      y: 0,
      xin: true, // 判断层的 X 坐标，为真是向右移动，否则向左
      yin: true, // 判断层的 Y 坐标，为真是向下移动，否则向上
      step: 1, // 层移动的步长，值越大移动速度越快
      delay: 10 // 层移动的时间间隔，单位为毫秒，值越小移动速度越快
    }
  },
  mounted() {
    this.boxDom = document.querySelector('.float-box')
    var { x, y } = this.boxDom.getBoundingClientRect() // 浮动层的初始位置，分别对应层的初始 X坐标 和 Y坐标
    this.x = x
    this.y = y
    this.boxDom.onmouseover = () => {
      this.float = false
      if (this.timer) clearInterval(this.timer)
    }
    this.boxDom.onmouseout = () => {
      this.float = true
      this.timer = setInterval(this.floatAD, this.delay)
    }
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    toogleFloat() {
      this.float = !this.float
      if (this.float) {
        this.timer = setInterval(this.floatAD, this.delay)
      } else {
        if (this.timer) clearInterval(this.timer)
      }
    },
    floatAD() {
      const L = 200 // 左边界
      const T = 0 // 上边界
      const R = window.innerWidth - this.boxDom.offsetWidth // 右边界
      const B = window.innerHeight - this.boxDom.offsetHeight // 下边界

      // 实现 X 轴方向上的运动，document.body.scrollLeft 为文档区域的滚动条向右拉的距离，以保证在滚动条右拉时仍在可见范围内
      // 实现 Y 轴方向上的运动，document.body.scrollTop 为文档区域的滚动条向下拉的距离，以保证在滚动条下拉时仍在可见范围内
      this.boxDom.style.left = this.x + document.body.scrollLeft + 'px'
      this.boxDom.style.top = this.y + document.body.scrollTop + 'px'
      this.x = this.x + this.step * (this.xin ? 1 : -1) // 通过判断层的范围决定层在 X 轴上的运动方向
      if (this.x < L) { this.xin = true; this.x = L }
      if (this.x > R) { this.xin = false; this.x = R }
      this.y = this.y + this.step * (this.yin ? 1 : -1) // 通过判断层的范围决定层在 Y 轴上的运动方向
      if (this.y < T) { this.yin = true; this.y = T }
      if (this.y > B) { this.yin = false; this.y = B }
    },
  }
}
</script>

<style lang="scss" scoped>
.float-dialog {
  width: 100%;
  height: 200px;
  .float-box {
    width: 150px;
    height: 150px;
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
