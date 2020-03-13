<template>
  <div class="refresh-code">
    <div @click="refreshCode">
      <graphic-code :identify-code="identifyCode" />
    </div>
  </div>
</template>

<script>
  import graphicCode from '@/components/GraphicCode/graphicCode'
  export default {
    name: 'codetest', // 图形验证码调用
    data() {
      return {
        identifyCode: '',
        identifyCodeCont: '1234567890ABCDEFG'
      }
    },
    mounted() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodeCont, 4)
    },
    methods: {
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      refreshCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodeCont, 4)
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodeCont[this.randomNum(0, this.identifyCodeCont.length)]
        }
        console.log(this.identifyCode)
      }
    },
    components: {
      graphicCode
    }
  }
</script>

<style lang="scss" scoped>
.refresh-code {
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  div {
    width: 112px;
    cursor: pointer;
  }
}
</style>
