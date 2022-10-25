<template>
  <div class="scroll-bar">
    <div class="elem_box">
      <!-- 内容 -->
      <div class="elem_content">
        <div v-for="item in 50" :key="item">孩儿励志出湘关，学不成名终不还。</div>
      </div>
      <!-- 滚动条 -->
      <div class="elem_scroll">
        <div class="elem_piece" :style="{'background': $store.state.themeColor}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { animateScroll } from '@/utils/animate'

export default {
  data() {
    return {}
  },
  mounted() {
    // 1. 获取相关元素
    let elem_box = document.querySelector('.elem_box')
    let elem_content = document.querySelector('.elem_content')
    let elem_scroll = document.querySelector('.elem_scroll')
    let elem_piece = document.querySelector('.elem_piece')

    // 2. 设置滚动条的高度
    // 内容的高 / 盒子的高 = scroll 的高 / piece 的高
    // piece 的高 = 盒子的高 * scroll 的高 / 内容的高
    let barHeight = 0
    if (elem_content.offsetHeight > elem_box.clientHeight)
      barHeight = elem_box.offsetHeight * elem_scroll.offsetHeight / elem_content.offsetHeight
    elem_piece.style.height = barHeight + 'px'

    // 3. 绑定事件（鼠标按下，然后移动）
    elem_piece.onmousedown = function(event) {
      let e = event || window.event
      let pageY = e.pageY || animateScroll().top + e.clientY
      let beginY = pageY - elem_piece.offsetTop
      // 模拟拖拽案例
      document.onmousemove = function(event) {
        // 获取鼠标在页面的位置
        let e = event || window.event
        let pageY = e.pageY || animateScroll().top + e.clientY
        // 鼠标的位置 - 鼠标在盒子中的位置
        let endY = pageY - beginY

        // 限制 y 的取值。大于 0，小于 scroll 的高度 - piece 的高度
        if (endY < 0) {
          endY = 0
        }
        if (endY > elem_scroll.offsetHeight - elem_piece.offsetHeight) {
          endY = elem_scroll.offsetHeight - elem_piece.offsetHeight
        }

        // 鼠标移动，piece 联动
        elem_piece.style.top = endY + 'px'

        // 高级比例: 内容走的距离 / piece 走的距离 = (内容的高 - 大盒子的高) / (scroll 的高 - piece 的高)
        var s = endY * (elem_content.offsetHeight - elem_box.offsetHeight) / (elem_scroll.offsetHeight - elem_piece.offsetHeight)
        // 通过 marginTop 负值移动
        elem_content.style.marginTop = -s + 'px'

        // 让被选文字清除
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
.scroll-bar {
  .elem_box {
    width: 300px;
    height: 500px;
    border: 1px solid #ddd;
    margin: 100px 0;
    overflow: hidden;
    position: relative;
  }
  .elem_content {
    text-align: center;
    line-height: 36px;
  }
  .elem_scroll {
    width: 20px;
    height: 500px;
    background-color: #e8e8e8;
    position: absolute;
    top: 0;
    right: 0;
  }
  .elem_piece {
    width: 20px;
    border-radius: 10px;
    cursor: pointer;
    position: absolute;
    top: 0;
  }
}
</style>
