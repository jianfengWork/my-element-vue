<template>
 <transition name="fade">
  <div class="sliding-pictures">
    <div class="drag-title">
      <span>完成拼图安全验证</span>
      <div class="operation">
        <span
          title="刷新验证码"
          @click="canvasInit"
          class="el-icon-refresh-right"
        ></span>
      <span
        title="关闭验证码"
        @click="closeCode"
        class="el-icon-close"
      ></span>
      </div>
    </div>
    <div class="drag-bottom">
      <div class="vimg">
        <canvas id="sliderBlock" :style="{left: slideX - slideLeft +'px'}"></canvas>
        <canvas id="codeImg"></canvas>
      </div>
      <div class="slider" :class="{ sliderTrue: confirmSuccess, sliderError:confirmError}">
        <div class="track-left" v-if="trackLeft > 0" :style="{width:trackLeft + 'px'}"></div>
        <div class="track">
          {{ tips }}
        </div>
        <div class="button" :class="trackLeft > 0 ? 'button-on' : ''" :style="{left:trackLeft + 'px'}" @mousedown.prevent="drag">
          <i class="el-icon-check" v-if="confirmSuccess"></i>
          <i class="el-icon-close" v-else-if="confirmError"></i>
          <i class="el-icon-d-arrow-right" v-else></i>
        </div>
      </div>
    </div>

  </div>
  </transition>
</template>
<script>
export default {
  name: 'BaseCanvasDrag',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tips: '向右拖动滑块填充拼图',
      // 滑块x轴数据
      slider: {
        mx: 0
      },
      imgUrl: '/images/graphic2.png',
      canvasWidth: 300, // canvas的宽度
      slideLeft: 0, // 绘图左侧和图片边框距离
      slideX: 0, // 已经拖动的距离
      trackLeft: 0, // 滑块左侧拖动的距离
      confirmError: false // 是否拖动错误了，为true则显示错误的样式
    }
  },
  computed: {
    // 拼图是否正确
    confirmSuccess: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  mounted() {
    this.canvasInit()
  },
  methods: {
    closeCode() {
      this.$emit('close')
    },
    // 拼图验证码初始化
    canvasInit() { // 生成指定区间的随机数
      const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      // mx: x 横向绘图起始位置
      // y 纵向绘图起始位置
      const width = this.canvasWidth
      const mx = random(170, width - 56)
      const y = random(40, 99)
      this.slider = { mx }
      if (this.confirmSuccess) {
        this.$emit('dragReset')
      }
      this.confirmSuccess = false
      this.confirmError = false
      this.slideLeft = 0
      this.slideX = 0
      this.trackLeft = 0
      this.tips = '向右拖动滑块填充拼图'
      this.draw(mx, y)
    },
    // 鼠标按下
    drag(e) {
      this.confirmError = false
      const dom = e.target // dom元素
      const downCoordinate = { x: e.x, y: e.y } // 正确的滑块数据
      const checkx = Number(this.slider.mx) // x轴数据 应该滑动的距离
      let x = 0
      const move = moveEV => { // 滑块滑动、图片滑动
        x = moveEV.x - downCoordinate.x // y = moveEV.y - downCoordinate.y;
        if (x >= this.canvasWidth - 56 || x <= 0) return false
        dom.style.left = x + 'px' // dom.style.top = y + "px";
        this.slideX = x
        this.trackLeft = x
      }
      const up = () => { // 判断是否在允许范围内
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        const max = checkx + 4
        const min = checkx - 4 // 允许正负误差
        if ((max >= x && x >= min) || x === checkx) {
          this.confirmSuccess = true
          this.tips = ''
        } else {
          this.confirmError = true
          this.tips = '验证失败，请重试'
          this.confirmSuccess = false
          setTimeout(() => {
            this.canvasInit()
          }, 200)
        }
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    draw(mx = 200, y = 50) {
      const mainDom = document.querySelector('#codeImg')
      const bg = mainDom.getContext('2d')
      const width = this.canvasWidth
      const height = mainDom.height
      const blockDom = document.querySelector('#sliderBlock')
      const block = blockDom.getContext('2d') // 重新赋值，让canvas进行重新绘制
      blockDom.height = height
      mainDom.height = height
      blockDom.width = width
      mainDom.width = width
      const imgsrc = this.imgUrl
      const img = document.createElement('img')
      img.style.objectFit = 'scale-down'
      img.src = imgsrc
      img.onload = function () {
        bg.drawImage(img, 0, 0, width, height)
        block.drawImage(img, 0, 0, width, height)
      }
      const mainxy = { x: mx, y: y, r: 9 }
      this.drawBlock(bg, mainxy, 'fill') // 底部图片
      this.drawBlock(block, mainxy, 'clip') // 上方滑块
    }, // 绘制拼图
    drawBlock(ctx, xy = { x: this.canvasWidth - 56, y: 109, r: 9 }, type) {
      const x = xy.x
      const y = xy.y
      const r = xy.r
      const w = 40
      this.slideLeft = x
      const PI = Math.PI // 绘制
      ctx.beginPath() // left
      ctx.moveTo(x, y) // top
      ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true)
      ctx.lineTo(x + w + 5, y) // right
      ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false)
      ctx.lineTo(x + w + 5, y + w) // bottom
      ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false)
      ctx.lineTo(x, y + w)
      ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true)
      ctx.lineTo(x, y) // 修饰，没有会看不出效果
      ctx.lineWidth = 1
      ctx.fillStyle = 'rgba(255, 255, 255 , 1)'
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
      ctx.stroke()
      ctx[type]()
      ctx.globalCompositeOperation = 'xor'
    }
  }
}
</script>
<style scoped lang="scss">
  .sliding-pictures {
    padding: 0;
    width: 400px;
    z-index: 999;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 2px 6px 0px rgba(191, 194, 204, 0.75);
    .vimg { // 更改[.vimg]调整图片大小
      width: 100%;
      height: 150px;
      position: relative;
      #codeImg,
      #sliderBlock {
        width: inherit;
        height: inherit;
      }
      #sliderBlock {
        position: absolute;
        z-index: 4000;
      }
    }
    .drag-title{
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      height: 48px;
      color: rgba(0, 0, 0, 0.85);
      border-bottom: 1px solid #EFF1F4;
    }
    .drag-bottom {
      padding: 16px 24px;
    }
    .slider {
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      margin-top: 16px;
      .track-left {
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(10, 111, 235, 0.25);
        border-radius: 4px;
        border: 1px solid rgba(10, 111, 235, 0.19);
        border-right: none;
      }
      .track {
        /*margin-left: 7px;*/
        width: calc(100%);
        height: 100%;
        background: #F8F9FD;
        border-radius: 4px;
        border: 1px solid #D7D9DF;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.35);
        width: 48px;
        height: 48px;
        background: #fff;
        box-shadow: 0px 0px 5px 0px rgba(191, 194, 204, 0.37);
        border-radius: 3px 4px 4px 3px;
        border: 1px solid #D7D9DF;
        &.button-on {
          box-shadow: 0px 0px 5px 0px rgba(10, 111, 235, 0.35);
          background: #0A6FEB;
          color: #fff;
        }
      }
    }
    .sliderTrue {
      .track-left {
        background: #CFF6EF;
        border-color: #5AD7C8;
      }
      .button,
      .button.button-on {
        background: #5AD7C8;
        box-shadow: 0px 2px 6px 0px rgba(102, 215, 201, 0.53);
        border-radius: 4px;
        border: 1px solid #5AD7C8;
      }
    }
    .sliderError {
      .track-left {
        background: #FCE2E1;
        border-color: #FB6060;
      }
      .button,
      .button.button-on{
        background: #FB6060;
        border-radius: 4px;
        border: 1px solid #FB6060;
        color: #fff;
      }
    }
    .operation {
      > span {
        color: rgba(0, 0, 0, 0.35);
        margin-left: 10px;
        font-size: 18px;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
</style>
