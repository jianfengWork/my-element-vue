<template>
  <div>
    <div class="wrapper_mask" ref="wrapper_mask">
      <div class="mask1">
        <div class="mask_content_border" ref="maskBorder">
          <div class="mask_content" ref="maskContent"></div>
          <div class="arrow1">
            <!-- <img src="../../assets/img/video-icon.png" /> -->
          </div>
          <div class="tipAndBtn" :class="{pizhu: isPiZhu}">
            <p class="tip">{{eleemsTipText}}</p>
            <el-button-group>
              <el-button size="small" type="primary" @click="closeGuide">{{ noviceGuideElems.length === (showMaskIndex + 1) ? '关闭' : '跳过' }}</el-button>
              <el-button size="small" type="primary" @click="prevStep" v-show="showMaskIndex !== 0">上一步</el-button>
              <el-button size="small" type="primary" @click="nextStep" v-show="noviceGuideElems.length !== (showMaskIndex + 1)">下一步</el-button>
            </el-button-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'noviceGuide',
  data () {
    return {
      showMask: false,
      showMaskContent: '',
      showMask2Elems: [],
      noviceGuideElems: [],
      showMaskIndex: 0,
      eleemsTipText: '',
      isPiZhu: false
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.noviceGuideElems = this.$store.state.noviceGuideElems
      document.getElementsByTagName('body')[0].className = 'html-body-overflow'
      const {DOMelems, type, tipText} = this.noviceGuideElems[0]
      this.eleemsTipText = tipText
      this.setMaskContentStyle(this.$refs.maskContent, this.$refs.maskBorder, DOMelems, type)
    })
  },
  beforeDestroy () {
    document.body.removeAttribute('class', 'html-body-overflow')
  },
  methods: {
    // 元素定位
    setMaskContentStyle: function (maskContent, maskBorder, targetEle, type = '') {
      // getBoundingClientRect用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
      var contentRect = targetEle.getBoundingClientRect()
      var styles = [{ property: 'width', distance: 'distance' }, { property: 'height', distance: 'distance' }, { property: 'left' }, { property: 'top' }]
      var paddingWidth = 12
      for (var i = 0; i < styles.length; i++) {
        var finalDistance = 0
        this.isPiZhu = false
        if (styles[i].distance) {
          finalDistance = contentRect[styles[i].property]
        } else {
          finalDistance = contentRect[styles[i].property] - paddingWidth / 2 - 2
        }
        if (styles[i].property === 'height' && (type === 'dafen' || type === 'pizhu')) {
          maskBorder.style[styles[i].property] = finalDistance + 200 + 'px'
        } else if (type === 'pizhu') { // 批注
          this.isPiZhu = true
          maskBorder.style[styles[i].property] = finalDistance + 'px'
        } else {
          maskBorder.style[styles[i].property] = finalDistance + 'px'
        }
        var borderRadius = parseInt(this.getStyle(targetEle, 'borderRadius')) ? this.getStyle(targetEle, 'borderRadius') : '4px'
        maskBorder.style.borderRadius = borderRadius
        maskContent.style.borderRadius = borderRadius
      }
    },
    getStyle: function (el, attr) {
      return el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el, false)[attr]
    },
    activeCurrentTip () {
      const {DOMelems, type, tipText} = this.noviceGuideElems[this.showMaskIndex]
      this.eleemsTipText = tipText
      this.setMaskContentStyle(this.$refs.maskContent, this.$refs.maskBorder, DOMelems, type)
    },
    prevStep () {
      this.showMaskIndex--
      if (this.showMaskIndex < 0) {
        this.showMaskIndex = 0
      }
      this.activeCurrentTip()
    },
    nextStep() {
      this.showMaskIndex++
      if (this.showMaskIndex > (this.noviceGuideElems.length - 1)) {
        this.showMaskIndex = this.noviceGuideElems.length - 1
      }
      this.activeCurrentTip()
    },
    closeGuide() {
      this.$emit('close-guide')
    },
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 300px;
  background: #eef2f6;
}
.wrapper .arc {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: #fff;
  transform: translate(25px, 25px);
  position: relative;
  margin-left: 100px;
  float: left;
}
.wrapper .content {
  width: 380px;
  height: 250px;
  float: left;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  transform: translate(25px, 25px);
  position: relative;
}
.wrapper .content div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #000;
}
.border_content {
  width: 100px;
  height: 50px;
  border: 3px dashed #000;
  border-radius: 5px;
}
.wrapper_mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  z-index: 2000;
}
.wrapper_mask .mask_content {
  border-radius: 5px;
  width: 100%;
  height: 100%;
  background: #fff;
}
.mask_content_border {
  position: absolute;
  border: 2px dashed #fff;
  border-radius: 10px;
  z-index: 9999;
  box-sizing: content-box;
  transition: all 0.2s linear;
  padding: 6px;
}
.cloneBtn {
  position: relative;
  /*z-index: 99999;*/
  right: -384px;
  top: 10px;
}
.mask1 .mask_content_border .arrow1 {
  position: relative;
  top: 20px;
  left: 248px;
}
.mask_button {
  position: absolute;
  bottom: 20%;
  left: 50%;
  cursor: pointer;
}
.tipAndBtn {
  min-width: 240px;
  min-height: 150px;
  margin-top: 20px;
  .tip {
    font-size: 16px;
    color: #fff;
    line-height: 1.5;
  }
}
.pizhu {
  margin-left: -150px;
}
.html-body-overflow {
  overflow: hidden;
}
</style>
