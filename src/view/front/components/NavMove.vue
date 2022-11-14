<template>
  <div class="nav-move">
    <div class="move-wrap">
      <div class="nav-piece"></div>
      <ul class="nav-box">
        <li class="active">新闻</li>
        <li>体育</li>
        <li>军事</li>
        <li>财经</li>
        <li>互联网</li>
        <li>航空航天</li>
        <li>社会</li>
        <li>国内</li>
        <li>国外</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { animateMove } from '@/utils/animate'

export default {
  data() {
    return {}
  },
  mounted() {
    const liDom = document.querySelector('.nav-box').children
    const pieceDom = document.querySelector('.nav-piece')
    var now = 0
    for (let i = 0, leni = liDom.length; i < leni; i++) {

      liDom[i].index = i // 记录索引

      // 鼠标移入
      liDom[i].onmouseover = function() {
        pieceDom.style.width = this.offsetWidth + 'px'
        animateMove(pieceDom, {'left': this.offsetLeft})
      }
      
      // 鼠标移出
      liDom[i].onmouseout = function() {
        pieceDom.style.width = liDom[now].offsetWidth +'px'
        animateMove(pieceDom, {'left': liDom[now].offsetLeft})
      }

      // 点击事件
      liDom[i].onclick = function() {
        now = this.index

        for (let j = 0, lenj = liDom.length; j < lenj; j++) {
          liDom[j].className = ''
        }

        this.className = 'active'
      }

    }
  },
}
</script>

<style lang="scss" scoped>
.nav-move {
  width: 100%;
  height: 40px;
  background: #041d46;
  display: flex;
  justify-content: center;
  .move-wrap {
    position: relative;
    .nav-box {
      position: relative;
      li {
        float: left;
        padding: 5px 20px;
        line-height: 30px;
        color: #fff;
        cursor: pointer;
        border-radius: 6px;
      }
      .active {
        background: #c00;
      }
    }
    .nav-piece {
      height: 40px;
      position: absolute;
      background: #c00;
      left: 0;
      border-radius: 6px;
    }
  }
}
</style>
