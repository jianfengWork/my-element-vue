<template>
  <div class="mouse-bound">
    <div class="bound-box">
      <div class="bound-piece" :style="{'background': $store.state.themeColor}"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    const boxDom = document.querySelector('.bound-box')
    const pieceDom = document.querySelector('.bound-piece')
    pieceDom.onmousedown = function(event) {
      let evt = event || window.event
      // 获得鼠标在元素中按下的位置 x,y
      let x = evt.offsetX
      let y = evt.offsetY

      document.onmousemove = function(event) {
        let evt = event || window.event
        // 改变起始点，鼠标在div中的位置就是其起点
        pieceDom.style.left = evt.clientX - x + 'px'
        pieceDom.style.top = evt.clientY - y + 'px'

        // 左
        if (pieceDom.offsetLeft < boxDom.offsetLeft) {
          pieceDom.style.left = boxDom.offsetLeft + 'px'
        }
        // 右
        if (pieceDom.offsetLeft > boxDom.offsetLeft + boxDom.offsetWidth - pieceDom.offsetWidth) {
          pieceDom.style.left = boxDom.offsetLeft + boxDom.offsetWidth - pieceDom.offsetWidth + 'px'
        }
        // 上
        if (pieceDom.offsetTop < boxDom.offsetTop) {
          pieceDom.style.top = boxDom.offsetTop + 'px'
        }
        // 下
        if (pieceDom.offsetTop > boxDom.offsetTop + boxDom.offsetHeight - pieceDom.offsetHeight) {
          pieceDom.style.top = boxDom.offsetTop + boxDom.offsetHeight - pieceDom.offsetHeight+'px'
        }

      }

      // 事件解绑
      document.onmouseup = function() {
        document.onmousemove = null
      }

    }
  },
}
</script>

<style lang="scss" scoped>
.mouse-bound {
  display: flex;
  justify-content: center;
  .bound-box {
    width: 800px;
    height: 400px;
    border: 1px solid #b6b6b6;
    margin: 20px;
  }
  .bound-piece {
    width: 100px;
    height: 100px;
    position: absolute;
    cursor: pointer;
  }
}
</style>
