<template>
  <div class="my-cropper">
    <div class="model" v-show="model" @click="model = false">
      <div class="model-show">
        <img :src="modelSrc" alt="">
      </div>
    </div>
    <p style="color: #000;">截图demo</p>
    <div class="cut">
      <div class="cropper-cont">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="true"
          :full="option.full"
          :fixed="fixed"
          :fixed-number="fixedNumber"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :fixed-box="option.fixedBox"
          :original="option.original"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :center-box="option.centerBox"
          @real-time="realTime"
          :high="option.high"
          @img-load="imgLoad"
          :mode="mode"
        />
      </div>
      <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden'}">
        <div :style="previews.div">
          <img :src="previews.url" :style="previews.img">
        </div>
      </div>
    </div>
    <div class="test-button">
      <el-button type="primary" size="mini" @click="changeImg">changeImg</el-button>
      <el-button type="primary" size="mini" @click="$refs.uploads.click()">upload</el-button>
      <el-button type="primary" size="mini" @click="startCrop" v-if="!crap">开始</el-button>
      <el-button type="primary" size="mini" @click="stopCrop" v-else>结束</el-button>
      <el-button type="primary" size="mini" @click="clearCrop">清空</el-button>
      <el-button type="primary" size="mini" @click="refreshCrop">刷新</el-button>
      <el-button type="primary" size="mini" @click="changeScale(5)">放大</el-button>
      <el-button type="primary" size="mini" @click="changeScale(-5)">缩小</el-button>
      <el-button type="primary" size="mini" @click="rotateLeft">向右旋转90</el-button>
      <el-button type="primary" size="mini" @click="rotateRight">向左旋转90</el-button>
      <el-button type="primary" size="mini" @click="finish('base64')">预览(base64)</el-button>
      <el-button type="primary" size="mini" @click="finish('blob')">预览(blob)</el-button>
      <el-button type="primary" size="mini" @click="down('base64')">下载(base64)</el-button>
      <el-button type="primary" size="mini" @click="down('blob')">下载(blob)</el-button>
      <input
        type="file"
        ref="uploads"
        style="position:absolute; clip:rect(0 0 0 0);"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)"
      >
      <div style="display:block; width: 100%;color: #000;">
        <label class="c-item">
          <span>上传图片是否显示原始宽高 (针对大图 可以铺满)</span>
          <input type="checkbox" v-model="option.original">
          <span>original: {{ option.original}}</span>
        </label>
        <label class="c-item">
          <span>能否拖动图片</span>
          <input type="checkbox" v-model="option.canMove">
        </label>
        <label class="c-item">
          <span>能否拖动截图框</span>
          <input type="checkbox" v-model="option.canMoveBox">
          <span>canMoveBox: {{ option.canMoveBox}}</span>
        </label>
        <label class="c-item">
          <span>截图框固定大小</span>
          <input type="checkbox" v-model="option.fixedBox">
          <span>fixedBox: {{ option.fixedBox}}</span>
        </label>
        <label class="c-item">
          <span>是否输出原图比例的截图</span>
          <input type="checkbox" v-model="option.full">
          <span>full: {{ option.full}}</span>
        </label>
        <label class="c-item">
          <span>是否自动生成截图框</span>
          <input type="checkbox" v-model="option.autoCrop">
          <span>autoCrop: {{ option.autoCrop}}</span>
        </label>
        <label class="c-item">
          <span>是否根据dpr生成适合屏幕的高清图片</span>
          <input type="checkbox" v-model="option.high">
          <span>high: {{ option.high}}</span>
        </label>
        <label class="c-item">
          <span>截图框是否限制在图片里(只有在自动生成截图框时才能生效)</span>
          <input type="checkbox" v-model="option.centerBox">
          <span>centerBox: {{ option.centerBox}}</span>
        </label>
        <label class="c-item">
          <p>输出图片格式</p>
          <label>jpg
            <input type="radio" name="type" value="jpeg" v-model="option.outputType">
          </label>
          <label>png
            <input type="radio" name="type" value="png" v-model="option.outputType">
          </label>
          <label>webp
            <input type="radio" name="type" value="webp" v-model="option.outputType">
          </label>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import {VueCropper} from 'vue-cropper'
export default {
  name: 'ScreenShotDemo',
  components: {
    VueCropper
  },
  data() {
    return {
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      lists: [],
      option: {
        // 裁剪图片的地址
        img: '',
        // 裁剪生成图片的质量
        size: 1,
        // 输出原图比例截图 props名full
        full: false,
        // 裁剪生成图片的格式
        outputType: 'png',
        // 上传图片是否可以移动
        canMove: true,
        // 固定截图框大小 不允许改变
        fixedBox: false,
        // 上传图片按照原始比例渲染
        original: false,
        // 截图框能否拖动
        canMoveBox: true,
        // 是否默认生成截图框
        autoCrop: false,
        // 只有自动截图开启 宽度高度才生效
        // 默认生成截图框宽度
        autoCropWidth: 200,
        // 默认生成截图框高度
        autoCropHeight: 150,
        // 截图框是否被限制在图片里面
        centerBox: false,
        // 是否按照设备的dpr 输出等比例图片
        high: true
      },
      show: true,
      // 是否开启截图框宽高固定比例
      fixed: false,
      // 截图框的宽高比例
      fixedNumber: [1, 2],
      // 裁剪框的大小信息
      info: true,
      // canScale 图片是否允许滚轮缩放
      canScale: true,
      // infoTrue  true 为展示真实输出图片宽高 false 展示看到的截图框宽高:
      infoTrue: true,
      // maxImgSize  限制图片最大宽度和高度
      maxImgSize: 2000,
      // enlarge 图片根据截图框输出比例倍数
      enlarge: 1,
      // mode  图片默认渲染方式
      mode: 'contain'
    }
  },
  mounted() {
    this.getBas64('https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_online_app/decoration/20200327/cb2d839481c4f7b275a2bb084e838d6a.png').then(data => {
      // console.log(data)
      this.option.img = data
      this.lists[0] = {img: data}
    })
    this.getBas64('https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_app/decoration/20200304/3281b15fe6aa8fe8cc11284a4e46dc48.png').then(data => {
      this.lists[1] = {img: data}
      this.lists[2] = {img: require('@/assets/avatar.jpeg')}
    })
  },
  methods: {
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
    /**
     * 内置方法 通过this.$refs.cropper 调用
     this.$refs.cropper.startCrop() 开始截图
     this.$refs.cropper.stopCrop() 停止截图
     this.$refs.cropper.clearCrop() 清除截图
     this.$refs.cropper.changeScale() 修改图片大小 正数为变大 负数变小
     this.$refs.cropper.getImgAxis() 获取图片基于容器的坐标点
     this.$refs.cropper.getCropAxis() 获取截图框基于容器的坐标点
     this.$refs.cropper.goAutoCrop 自动生成截图框函数
     this.$refs.cropper.rotateRight() 向右边旋转90度
     this.$refs.cropper.rotateLeft() 向左边旋转90度
     图片加载的回调 imgLoad 返回结果success, error
     获取截图信息
     this.$refs.cropper.cropW 截图框宽度
     this.$refs.cropper.cropH 截图框高度
     */
    changeImg() {
      this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
    },
    startCrop() {
      // start
      this.crap = true
      this.$refs.cropper.startCrop()
    },
    stopCrop() {
      //  stop
      this.crap = false
      this.$refs.cropper.stopCrop()
    },
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop()
    },
    refreshCrop() {
      // clear
      this.$refs.cropper.refresh()
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    finish(type) {
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          console.log(data)
          var img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data
      this.$emit('', this.previews)
      console.log(data)
    },
    down(type) {
      // event.preventDefault()
      var aLink = document.createElement('a')
      aLink.download = 'demo'
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          console.log(data)
          this.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },
    uploadImg(e, num) {
      // 上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把 Array Buffer 转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    imgLoad(msg) {
      console.log(msg)
    }
  }
}
//  <screen-shot v-if="screen" :img-url="bigPicUrl"  :img-arr="picArrUrl" />
</script>

<style lang="scss" scoped>
.my-cropper {
  .el-button {
    margin-top: 10px;
  }
}
.cut {
  width: 1000px;
  height: 500px;
  display: flex;
  margin: 30px auto;
  .cropper-cont {
    width: 500px;
    height: 500px;
  }
}
.c-item {
  max-width: 800px;
  margin: 20px auto 10px;
  display: block;
}
.test-button {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}
.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}
@keyframes slide {
  0%  {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
