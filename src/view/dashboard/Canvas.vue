<template>
  <div class="my-canvas">
    <el-alert title="html2canvas" type="success" :closable="false" />
    <!-- start -->
    <div ref="canvasDom" class="canvas-html">
      <div class="canvas-left">
        <img width="400" :src="httpImg" alt="" />
        <div>网络图片</div>
      </div>
      <div class="canvas-riight">
        <img width="200" src="@/assets/avatar.jpeg" alt="" />
        <div>静态图片</div>
      </div>
    </div>
    <!-- end -->
    <div class="PADTB20">
      <el-button type="primary" @click="previewPoster">预览海报</el-button>
      <el-button type="primary" @click="empty">清空海报</el-button>
      <el-button type="primary" @click="downloadVueCanvas" :disabled="!vueCanvasSrc">下载 vue-canvas-poster 海报(png)</el-button>
      <el-button type="primary" @click="downloadPoster" :disabled="!canvasData">下载 html2canvas 海报(png)</el-button>
      <el-button type="primary" @click="downloadPDF" :disabled="!canvasData">下载 html2canvas 海报(pdf)</el-button>
    </div>
    <el-alert title="我是 native 海报" type="success" :closable="false" />
    <div ref="nativeDom" style="height: 248px;"></div>
    <el-alert title="我是 vue-canvas-poster 海报" type="success" :closable="false" />
    <vue-canvas-poster :widthPixels="1000" :painting="painting" @success="success" @fail="fail" />
    <img :src="vueCanvasSrc" alt="" style="width: 700px;" />
    <el-alert title="我是 html2canvas 下载海报" type="success" :closable="false" />
    <div ref="downloadDom" style="height: 248px;">
      <img :src="downloadImg" alt="" />
    </div>
    <el-alert title="我是 html2canvas 生成的原始海报(高分辨率会被放大)" type="success" :closable="false" />
    <img :src="canvasData" alt="" />
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  data() {
    return {
      httpImg: '',
      canvasData: '',
      downloadImg: '',
      vueCanvasSrc: '',
      painting: {},
    }
  },
  mounted() {
    this.painting = {}
    this.getBas64('https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_online_app/decoration/20200327/cb2d839481c4f7b275a2bb084e838d6a.png').then(data => {
      // console.log(data)
      this.httpImg = data

      // vue-canvas-poster
      this.painting = {
        width: '700px',
        height: '243px',
        background: '#fff',
        views: [
          {
            type: 'image',
            url: this.httpImg,
            css: {
              top: '0px',
              left: '0px',
              width: '400px',
              height: '167px'
            }
          },
          {
            type: 'text',
            text: '网络图片',
            css: {
              top: '170px',
              left: '158px',
              color: 'grey',
              fontSize: '16px',
            }
          },
          {
            type: 'image',
            url: require('@/assets/avatar.jpeg'),
            css: {
              top: '0px',
              left: '420px',
              width: '200px',
              height: '200px'
            }
          },
        ]
      }

      // native 拼接
      let canvasDom = document.createElement('canvas')
      let ctx = canvasDom.getContext('2d')
      const img = new Image()
      const that = this
      this.$refs.nativeDom[0] && this.$refs.nativeDom.removeChild(this.$refs.nativeDom[0])
      img.src = this.httpImg
      img.onload = function() {
        canvasDom.width = 700
        canvasDom.height = 243
        ctx.fillStyle = '#fff' // 背景色
        ctx.fillRect(0, 0, canvasDom.width, canvasDom.height)
        ctx.drawImage(img, 0, 0, 400, 166)
        const staticImg = new Image() // 静态图片
        staticImg.src = require('@/assets/avatar.jpeg')
        staticImg.onload = () => {
          ctx.drawImage(staticImg, 420, 0, 200, 220)
          ctx.font = '16px 微软雅黑'
          ctx.fillStyle = 'grey'
          ctx.textAlign = 'center'
          ctx.fillText('网络图片', 200, 188)
          that.$refs.nativeDom.appendChild(canvasDom)
        }
      }
    })
  },
  methods: {
    previewPoster() {
      // window.devicePixelRatio = 1 // 会因为高分辨率而扩大倍数尺寸
      html2canvas(this.$refs.canvasDom, {
        // width: 700,
      }).then(canvas => {
        // console.log(canvas) // 1 => 700 * 243 | 2 => 1400 * 486
        this.canvasData = canvas.toDataURL('image/png')

        // 重写 canvas 1倍屏下，渲染同样大小
        let canvasDom = document.createElement('canvas')
        let ctx = canvasDom.getContext('2d')
        let img = new Image()
        img.src = this.canvasData
        const that = this
        img.onload = function() {
          if (window.devicePixelRatio > 1) {
            canvasDom.width = img.width / 2 // (img.width / 2) * 1.5 适当缩放增加清晰度
            canvasDom.height = img.height / 2 // (img.height / 2) * 1.5 适当缩放增加清晰度
            ctx.drawImage(img, 0, 0, canvasDom.width, canvasDom.height)
            canvasDom.toBlob(
              blob => {
                // console.log(blob)
                let data = URL.createObjectURL(blob);
                that.downloadImg = data
              },
              'image/png',
              1
            )
          } else {
            canvasDom.width = img.width
            canvasDom.height = img.height
            ctx.drawImage(img, 0, 0,)
            that.downloadImg = canvasDom.toDataURL('image/png') // base64
          }
          canvasDom = null
        }
      })
    },
    empty() {
      this.canvasData = null
      this.downloadImg = null
    },
    success(src) {
      // console.log(src)
      this.vueCanvasSrc = src
    },
    fail(err) {
      console.log('fail:', err)
    },
    downloadVueCanvas() {
      const link = document.createElement('a')
      link.href = this.vueCanvasSrc
      link.setAttribute('download', 'poster' + Date.now() + '.png')
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    downloadPoster() {
      const link = document.createElement('a')
      link.href = this.downloadImg
      link.setAttribute('download', 'poster' + Date.now() + '.png')
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    downloadPDF() {
      // https://www.cnblogs.com/gaofz/p/11081605.html 超过 height 分页
      const PDF = new JsPDF('', 'pt', 'a4')
      PDF.addImage(this.downloadImg, 'png', 0, 0)
      PDF.save(Date.now() + '.pdf')
    },
    getBas64(url, outputFormat = 'image/png') { // 将网络图片转成 base64 需要后端配置 oss 跨域
      return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let img = new Image()

        img.crossOrigin = 'Anonymous' // 设置 image 对象可跨域请求
        img.onload = function() {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          let dataURL = canvas.toDataURL(outputFormat)
          canvas = null
          resolve(dataURL)
        }
        img.src = url + '?t=' + Date.now() // 防止 oss 的缓存问题
      })
    },
  },
}
</script>

<style lang="scss">
.my-canvas {
  .canvas-html {
    width: 700px;
    display: flex;
    color: grey;
    text-align: center;
    background: #fff;
    // opacity: 0; // 不生效
    // display: none; // 不生效
    // position: absolute; // 生效
    // z-index: -1;
  }
  .canvas-left {
    margin-right: 20px;
  }
}
</style>
