<template>
  <div class="transition-graph">
    <ul :style="{'transform-origin': `center center ${center}px`}">
      <li
        v-for="(item, index) in edge" :key="item"
        :style="{
          'transform-origin': `center center ${center}px`,
          'transform': `rotateY(${deg * index}deg)`,
          'background': $store.state.themeColor
        }"
      >{{ item }}</li>
    </ul>
  </div>
</template>

<script>
/**
 * 正 n 边形外角和 = 360
 * 
 * 在直角三角形中:
 * 1. 1个夹角 30度
 * 2. 夹角的邻边长度 50
 * 求: 对边的长度
 * 
 * 正切: 对边 / 邻边
 * 
 * 弧度: 角度 * Math.PI / 180
 */
export default {
  data() {
    const edge = 8 // 几面
    const width = 100
    const deg = 360 / edge
    return {
      edge,
      deg,
      center: -(Math.tan((180 - deg) / 2 * Math.PI / 180) * (width / 2)).toFixed(4)
    }
  },
}
</script>

<style lang="scss" scoped>
.transition-graph {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 1px dotted #304156;
  perspective: 200px; // 视距
  perspective-origin: center center;
  &:hover ul {
    transform: rotateY(-360deg);
  }
  ul {
    position: relative;
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    transform-style: preserve-3d;
    transform-origin: center center 0px;
    transition: all 3s;
    margin: 0 auto;
  }
  li {
    width: 98px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #fff;
    border: 1px dotted #fff;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
