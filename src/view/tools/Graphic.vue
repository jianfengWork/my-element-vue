<template>
  <div class="my-code">
    <el-alert title="图形验证码" type="success" :closable="false" />
    <div class="refresh-code" @click="refreshCode">
      <graphic-code :identify-code="identifyCode" />
    </div>
    <el-alert title="短信验证码" type="success" :closable="false" />
    <sms-code ref="smsCodeDom" @run="sendCode" :second="60" />
    <el-alert style="margin-top: 10px;" title="滑块验证" type="success" :closable="false" />
    <slide-verify
      :l="40"
      :r="10"
      :w="310"
      :h="155"
      :accuracy="3"
      :imgs="imgList"
      slider-text="向右滑动"
      @fail="onFail"
      @success="onSuccess"
    />
  </div>
</template>

<script>
import graphicCode from '@/components/GraphicCode/graphicCode'
import smsCode from '@/components/SMScode/smsCode'
export default {
  name: 'codetest', // 图形验证码调用
  data() {
    return {
      identifyCode: '',
      identifyCodeCont: '1234567890ABCDEFG',
      imgList: [
        'http://e.hiphotos.baidu.com/zhidao/pic/item/b64543a98226cffc7a951157b8014a90f703ea9c.jpg',
        'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1208/15/c0/12924355_1344999165562.jpg',
        'http://img1.imgtn.bdimg.com/it/u=3483415840,2446087639&fm=26&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=3992873028,1734106948&fm=214&gp=0.jpg',
        'http://img2.imgtn.bdimg.com/it/u=3381731657,4133778123&fm=214&gp=0.jpg',
      ],
    }
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodeCont, 4)
  },
  methods: {
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodeCont, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodeCont[this.randomNum(0, this.identifyCodeCont.length)]
      }
      console.log(this.identifyCode)
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    sendCode() { // sms-code
      this.$refs.smsCodeDom.start()
    },
    // slide-verify
    onFail() {
      this.$message.error('验证不通过')
    },
    onSuccess() {
      this.$message.success('验证通过')
    },
  },
  components: {
    graphicCode, smsCode
  }
}
</script>

<style lang="scss" scoped>
.my-code {
  .refresh-code {
    width: 112px;
    height: 42px;
    cursor: pointer;
    user-select: none;
    margin-bottom: 20px;
  }
}
</style>
