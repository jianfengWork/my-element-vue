<template>
  <div class="magnifier-page">
    <div class="mf-box">
      <div class="mf-small">
        <!-- img宽度 = mf-small -->
        <img src="./images/small.jpg" width="350" alt="" />
        <div class="mf-mask"></div>
      </div>
      <div class="mf-big">
        <!-- img宽度 = mf-big * 2 -->
        <img src="./images/big.jpg" width="800" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { getPage } from '@/utils/animate'

export default {
  data() {
    return {}
  },
  mounted() {
    const boxDom = document.querySelector('.mf-box')
    const smallDom = document.querySelector('.mf-small')
    const bigDom = document.querySelector('.mf-big')

    const maskDom = smallDom.children[1]
    const bigImgDom = bigDom.children[0]

    // 鼠标经过的时候 - 显示 maskDom 和 bigDom
    // mouseenter, mouseleave 不会触发事件冒泡
    // mouseover, mouseout 会触发事件冒泡
    boxDom.onmouseenter = function () {
      maskDom.style.display = 'block'
      bigDom.style.display = 'block'
    }
    boxDom.onmouseleave = function () {
      maskDom.style.display = 'none'
      bigDom.style.display = 'none'
    }

    // 当鼠标在盒子中移动的时候，让 maskDom 和鼠标一起移动
    boxDom.onmousemove = function(evt) {
      evt = evt || window.event

      // 想移动黄盒子，必须知道鼠标在 smallDom 中的位置
      // x 作为 maskDom 的 left 值，y 作为 maskDom 的 top 值
      var maskX = getPage(evt).pageX - boxDom.offsetLeft
      var maskY = getPage(evt).pageY - boxDom.offsetTop

      // 让鼠标在黄盒子最中间，减去黄盒子宽高的一半
      maskX = maskX - maskDom.offsetWidth / 2
      maskY = maskY - maskDom.offsetHeight / 2
      
      // 把 maskDom 限制到 boxDom 中
      // left 取值为大于 0，boxDom 的宽 - maskDom 的宽
      maskX = maskX < 0 ? 0 : maskX
      maskY = maskY < 0 ? 0 : maskY
      const maxX = boxDom.offsetWidth - maskDom.offsetWidth
      const maxY = boxDom.offsetHeight - maskDom.offsetHeight
      maskX = maskX > maxX ? maxX : maskX
      maskY = maskY > maxY ? maxY : maskY

      // 最终位置
      maskDom.style.left = maskX + 'px'
      maskDom.style.top = maskY + 'px'

      // 当 maskDom 移动的时候，让大图移动
      // 求 大图片移动的距离

      // mask移动的距离 / mask最大能够移动的距离 = 大图片移动的距离 / 大图片最大能够移动的距离

      // mask最大能够移动的距离
      var maskMax = boxDom.offsetWidth - maskDom.offsetWidth
      // 大图片最大能够移动的距离
      var bigImageMax = bigImgDom.offsetWidth - bigDom.offsetWidth

      var bigImageX = maskX * bigImageMax / maskMax
      var bigImageY = maskY * bigImageMax / maskMax
    
      bigImgDom.style.left = -bigImageX + 'px'
      bigImgDom.style.top = -bigImageY + 'px'
    }

  },
}
</script>

<style lang="scss" scoped>
.magnifier-page {
  width: 100%;
  height: 100%;
  background: #fff;
  .mf-box {
    width: 350px;
    height: 350px;
    border: 1px solid #ccc;
    position: relative;
    user-select: none;
  }
  .mf-small {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
    }
    .mf-mask { // 宽高应是 box 的一半
      width: 175px;
      height: 175px;
      background: rgba(255, 255, 0, 0.4);
      position: absolute;
      top: 0;
      left: 0;
      cursor: move;
      display: none;
    }
  }
  .mf-big {
    width: 400px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 360px; // 350 + 10
    border: 1px solid #ccc;
    overflow: hidden;
    display: none;
    img {
      position: absolute;
    }
  }
}
</style>
