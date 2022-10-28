<template>
  <div class="mouse-drug">
    <div class="drug-box">
      <div class="drug-piece" :style="{'background': $store.state.themeColor}">可以拖拽</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    const boxDom = document.querySelector('.drug-box')
    const pieceDom = document.querySelector('.drug-piece')
    pieceDom.onmousedown = function(event) {
      let evt = event || window.event
      // 获得鼠标在元素中按下的位置 x,y
      let x = evt.pageX - boxDom.offsetLeft
      let y = evt.pageY - boxDom.offsetTop

      document.onmousemove = function(event) {
        let evt = event || window.event
        // 改变起始点，鼠标在div中的位置就是其起点
        boxDom.style.left = evt.pageX - x + 'px'
        boxDom.style.top = evt.pageY - y + 'px'

        // 左
        if (boxDom.offsetLeft < 200) {
          boxDom.style.left = 200 + 'px'
        }
        // 右
        if (boxDom.offsetLeft > window.innerWidth - boxDom.offsetWidth) {
          boxDom.style.left = window.innerWidth - boxDom.offsetWidth + 'px'
        }
        // 上
        if (boxDom.offsetTop < 0) {
          boxDom.style.top = 0 + 'px'
        }
        // 下
        if (boxDom.offsetTop > window.innerHeight - boxDom.offsetHeight) {
          boxDom.style.top = window.innerHeight - boxDom.offsetHeight+'px'
        }

        // 禁止文本选中（选中后取消）
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()

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
.mouse-drug {
  width: 300px;
  height: 100px;
  margin: 20px 0;
  .drug-box {
    width: 300px;
    height: 100px;
    border: 1px solid #b6b6b6;
    position: absolute;
    background: #fff;
  }
  .drug-piece {
    width: 100%;
    line-height: 26px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    cursor: move;
    user-select: none;
  }
}
</style>
