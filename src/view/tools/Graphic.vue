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
        '/images/graphic1.png',
        '/images/graphic2.png',
        '/images/graphic3.png',
        '/images/graphic4.png',
        '/images/graphic5.png',
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
