<template>
  <div id="my-floor">
    <section class="floor-nav">
      <ul class="nav-list">
        <li
          class="nav-list-item"
          v-for="(item, index) in floorList"
          :key="item.id"
          @click="setFloorNavMountClick(index)"
        >{{ item.name }}</li>
      </ul>
    </section>
    <div class="floor-wrap">
      <div
        class="floor-item"
        v-for="item in floorList"
        :key="item.id">
        <h3>{{ item.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      element: {
        nav_item: null,
        floor_item: null
      },
      timer: null,
      floorList: [
        { id: 1, name: 'F1' },
        { id: 2, name: 'F2' },
        { id: 3, name: 'F3' },
        { id: 4, name: 'F4' },
        { id: 5, name: 'F5' },
        { id: 6, name: 'F6' }
      ],
      currentDom: null, // 监听的 dom
    }
  },
  mounted() {
    this.element = {
      nav_item: document.querySelectorAll('.nav-list-item'),
      floor_item: document.querySelectorAll('.floor-item')
    }
    this.element.nav_item[0].classList.add('active')
    this.$nextTick(() => {
      this.currentDom = document.getElementById('my-floor')
      this.currentDom.addEventListener('scroll', this.floorSrcollEventListener)
    })
  },
  beforeDestroy() {
    this.currentDom && this.currentDom.removeEventListener('scroll', this.floorSrcollEventListener)
  },
  methods: {
    floorSrcollEventListener() { // 监听窗口滚动楼层导航动态定位
      const {nav_item, floor_item} = this.element
      const window_scrollTop = this.currentDom.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
      for (let i = 0, len = floor_item.length; i < len; i++) {
        let floor_offsetTop = floor_item[i].offsetTop - floor_item[0].offsetTop
        if (window_scrollTop >= floor_offsetTop) {
          for (let n = 0, len = nav_item.length; n < len; n++) {
            const current_classList = nav_item[n].classList
            i === n ? current_classList.add('active') : current_classList.remove('active')
          }
        }
      }
    },
    setFloorNavMountClick(index) { // 楼层导航事件驱动
      const {floor_item} = this.element
      const floor_offsetTop = floor_item[index].offsetTop - floor_item[0].offsetTop
      const window_scrollTop = this.currentDom.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
      const move = {
          step: 50,
          times: 15,
          FLOOR_OFFSETTOP: floor_offsetTop,
        }
      if (window_scrollTop > floor_offsetTop) {
        this.setFloorScrollArrowUp(move)
      } else if (window_scrollTop == floor_offsetTop) {
        return false
      } else {
        this.setFloorScrollArrowDown(move)
      }
    },
    setFloorScrollArrowUp(move) { // 设置楼层向上滚动
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let window_scrollTop = this.currentDom.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
        if (window_scrollTop <= move.FLOOR_OFFSETTOP) {
          // document.documentElement.scrollTop = document.body.scrollTop = move.FLOOR_OFFSETTOP
          this.currentDom.scrollTop = move.FLOOR_OFFSETTOP
          clearInterval(this.timer)
        } else {
          // document.documentElement.scrollTop = document.body.scrollTop = window_scrollTop - move.step
          this.currentDom.scrollTop = window_scrollTop - move.step
        }
      }, move.times)
    },
    setFloorScrollArrowDown(move) { // 设置楼层向下滚动
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        let window_scrollTop = this.currentDom.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
        if (window_scrollTop >= move.FLOOR_OFFSETTOP) {
          this.currentDom.scrollTop = move.FLOOR_OFFSETTOP
          clearInterval(this.timer)
        } else {
          this.currentDom.scrollTop = window_scrollTop + move.step
        }
      }, move.times)
    },
  }
}
</script>

<style lang="scss" scoped>
#my-floor {
  position: relative;
  height: calc(100% - 40px);
  overflow: scroll;
  // nav
  .nav-list {
    position: fixed;
    top: 50%;
    left: 240px;
    transform: translateY(-50%);
    width: 46px;
    text-align: center;
    color: #606266;
    background: #f8f8f8;
  }
  .nav-list-item {
    height: 46px;
    line-height: 46px;
    transition: all .5s;
    cursor: pointer;
    border-bottom: 1px solid #fff;
  }
  .nav-list-item.active, .nav-list-item:hover {
    color: #FFF;
    background: #404040;
  }
  // floor
  .floor-wrap {
    margin-left: 80px;
  }
  .floor-item {
    width: 100%;
    min-height: 900px;
    margin-bottom: 20px;
    color: #FFF;
  }
  .floor-wrap div:nth-child(1) {
    background: #409EFF;
  }
  .floor-wrap div:nth-child(2) {
    background: #304156;
  }
  .floor-wrap div:nth-child(3) {
    background: #11A983;
  }
  .floor-wrap div:nth-child(4) {
    background: #13C2C2;
  }
  .floor-wrap div:nth-child(5) {
    background: #6959CD;
  }
  .floor-wrap div:nth-child(6) {
    background: #1270C9;
  }
}
</style>
