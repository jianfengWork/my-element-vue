<template>
  <div class="mouse-drag">
    <el-alert title="边界" type="success" :closable="false" />
    <MouseBound />
    <el-alert title="自由拖拽" type="success" :closable="false" />
    <MouseDrug />
    <img class="mouse-img" :src="require('@/assets/avatar.jpeg')" alt="" />
    <el-alert title="浮动弹窗" type="success" :closable="false" />
    <FloatDialog />
  </div>
</template>

<script>
import MouseBound from './components/MouseBound'
import MouseDrug from './components/MouseDrug'
import FloatDialog from './components/FloatDialog'

export default {
  components: {
    MouseBound,
    MouseDrug,
    FloatDialog
  },
  data() {
    return {
      timer: null
    }
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  },
  mounted() {
    // 需求：点击页面的任何地方，图片跟随鼠标移动到点击位置。
    // 思路：获取鼠标在页面中的位置，然图片缓慢运动到鼠标点击的位置。
    let targetX = 0
    let targetY = 0
    let leaderX = 0
    let leaderY = 0
    let that = this
    // 原理：鼠标在页面的位置 = 被卷去的部分 + 可视区域部分。
    const boxDom = document.querySelector('.mouse-drag')
    const imgBox = document.querySelector('.mouse-img')
    boxDom.onclick = function(event) {
      let evt = event || window.event

      targetX = evt.pageX - imgBox.offsetWidth / 2
      targetY = evt.pageY - imgBox.offsetHeight / 2
      if (that.timer) clearInterval(that.timer)

      that.timer = setInterval(() => {
        // 获取盒子初始 left 值
        leaderX = imgBox.offsetLeft
        // 获取运动步长
        let stepX = (targetX - leaderX) / 10
        // 再次处理步长
        stepX = stepX > 0 ? Math.ceil(stepX) : Math.floor(stepX)
        // 赋值
        leaderX = leaderX + stepX
        imgBox.style.left = leaderX + 'px'

        // 获取盒子初始 top 值
        leaderY = imgBox.offsetTop
        // 获取运动步长
        let stepY = (targetY - leaderY) / 10
        // 再次处理步长
        stepY = stepY > 0 ? Math.ceil(stepY) : Math.floor(stepY)
        // 赋值
        leaderY = leaderY + stepY
        imgBox.style.top = leaderY + 'px'
        // console.log(targetX, leaderX, stepX)

        // 运动到达，关闭定时器
        if (Math.abs(targetX - imgBox.offsetLeft) <= Math.abs(stepX) && Math.abs(targetY - imgBox.offsetTop) <= Math.abs(stepY)) {
          imgBox.style.left = targetX + 'px'
          imgBox.style.top = targetY + 'px'
          clearInterval(that.timer)
        }

      }, 30)

    }
  },
}
</script>

<style lang="scss" scoped>
.mouse-img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  position: absolute;
  top: 300px;
  left: 300px;
}
</style>
