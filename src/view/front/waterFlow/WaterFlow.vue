<template>
  <ul class="water-flow">
    <li class="water-box" v-for="(item, $index) in renderImg" :key="$index">
      <div class="img-box">
        <img :src="item" />
      </div>
    </li>
  </ul>
</template>

<script>
const initImg = [
  require('./images/1.jpg'), require('./images/2.jpg'), require('./images/3.jpg'), require('./images/4.jpg'),
  require('./images/5.jpg'), require('./images/6.jpg'), require('./images/7.jpg'), require('./images/8.jpg'),
  require('./images/9.jpg'), require('./images/10.jpg'), require('./images/11.jpg'), require('./images/12.jpg'),
  require('./images/13.jpg'), require('./images/14.jpg'), require('./images/15.jpg'), require('./images/16.jpg'),
  require('./images/17.jpg'), require('./images/18.jpg'), require('./images/19.jpg'), require('./images/20.jpg'),
]
export default {
  data() {
    return {
      renderImg: [
        ...initImg, ...initImg, ...initImg, ...initImg,
      ],
      currentDom: null, // 监听的 dom
    }
  },
  mounted() {
    this.$nextTick(_ => {
      setTimeout(() => { this.imgLocation() }, 50)

      this.currentDom = document.querySelector('.el-main')
      this.currentDom.addEventListener('scroll', this.loadImg)
    })
    // 解决页面刷新错位
    window.onload = () => {
      this.imgLocation()
    }
  },
  beforeDestroy() {
    this.currentDom && this.currentDom.removeEventListener('scroll', this.loadImg)
  },
  methods: {
    loadImg() {
      const { clientHeight, scrollTop } = document.querySelector('.el-main')
      const ulDom = document.querySelector('.water-flow')
      const liDom = ulDom.children
      const top = liDom[liDom.length - 1].offsetTop // 最后一个 li 距离顶部的高度
      // console.log(clientHeight, scrollTop, clientHeight + scrollTop, top)
      if (clientHeight + scrollTop > top) {
        this.renderImg.push(...initImg)
        this.$nextTick(_ => {
          this.imgLocation()
        })
      }
    },
    imgLocation() {
      const ulDom = document.querySelector('.water-flow')
      const liDom = ulDom.children
      const boxWidth = document.querySelector('.el-main').offsetWidth
      const liWidth = liDom[0].offsetWidth
      const num = Math.floor(boxWidth / liWidth)
      ulDom.style.width = num * liWidth + 'px'

      const arrHeight = [] // 高度数组，记录高度
      for (let i = 0, leni = liDom.length; i < leni; i++) {

        if (i < num) {
          arrHeight.push(liDom[i].offsetHeight)
        } else {
          const min = Math.min.apply(null, arrHeight) // 每次找到数组最小值
          const idx = this.getIndex(arrHeight, min) // 最小值索引
          liDom[i].style.position = 'absolute'
          liDom[i].style.top = min + 'px'
          liDom[i].style.left = liDom[idx].offsetLeft + 'px'
          arrHeight[idx] = arrHeight[idx] + liDom[i].offsetHeight // 高度累加
        }

      }
    },
    getIndex(arr, min) {
      for (let i = 0, leni = arr.length; i < leni; i++) {
        if (arr[i] == min) return i
      }
    }
  }
}
</script>

<style lang="scss">
.water-flow {
  margin: 0 auto;
  padding: 0 !important;
  position: relative;
  .water-box {
    float: left;
    padding: 5px;
  }
  .img-box {
    width: 150px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0 0 5px #b6b6b6;
  }
  img {
    width: 100%;
  }
}
</style>
