<template>
  <div class="feng-qin">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import { animate } from '@/utils/animate'

export default {
  data() {
    return {}
  },
  mounted() {
    let liArr = document.querySelectorAll('.feng-qin li')
    for (let i = 0; i < liArr.length; i++) {

      // 绑定 onmouseover 事件，鼠标放入到 li 中该盒子变宽，其他的盒子变窄
      liArr[i].onmouseover = function() {
        for (var j = 0; j < liArr.length; j++) {
          // 引用框架实现宽度变窄
          animate(liArr[j], {'width': 100})
        }
        // 自身
        animate(this, {'width': 800})
      }

      // 鼠标移开，回复原样
      liArr[i].onmouseout = function() {
        for (var j = 0; j < liArr.length; j++) {
          animate(liArr[j], {'width': 240})
        }
      }
      
    }
  },
}
</script>

<style lang="scss" scoped>
.feng-qin {
  width: 1180px; // 240 * 5 = 1200, 需小于 1200, 否则最后一张移入移出会抖动
  height: 400px; // 图片的高
  border: 1px solid #ddd;
  overflow: hidden;
  ul {
    width: 1300px; // 需大于 1200, 否则最后一张移入移出会消失
  }
  li {
    width: 240px;
    height: 400px;
    float: left;
    &:nth-child(1) {
      background: url('/images/xm1.jpg') no-repeat;
    }
    &:nth-child(2) {
      background: url('/images/xm2.jpg') no-repeat;
    }
    &:nth-child(3) {
      background: url('/images/xm3.jpg') no-repeat;
    }
    &:nth-child(4) {
      background: url('/images/xm4.jpg') no-repeat;
    }
    &:nth-child(5) {
      background: url('/images/xm5.jpg') no-repeat;
    }
  }
}
</style>
