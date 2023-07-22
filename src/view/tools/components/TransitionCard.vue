<template>
  <div class="transition-card">
    <ul>
      <li>正面</li>
      <li>反面</li>
    </ul>
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
.transition-card {
  width: 300px;
  height: 150px;
  padding: 20px;
  border: 1px dotted #304156;
  perspective: 800px; // 视距
  perspective-origin: center center;
  &:hover ul {
    transform: rotateY(-180deg);
  }
  ul {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 2s;
  }
  li {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    &:nth-child(1) {
      background: green;
    }
    &:nth-child(2) {
      background: blue;
      transform: rotateY(180deg);
    }
  }
}
</style>
