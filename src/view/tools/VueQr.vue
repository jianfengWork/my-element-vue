<template>
  <div class="vue-qr">
    <VueQr
      :text="qrcodeText"
      :logoSrc="logoSrc"
    />
  </div>
</template>

<script>
// https://github.com/Binaryify/vue-qr
import VueQr from 'vue-qr'
/**
 * text: 文案、链接
 * size: 尺寸, 长宽一致, 包含外边距
 * margin: 外边距，默认 20px
 * colorDark: 实点的颜色
 * colorLight: 空白区的颜色
 * backgroundColor: 背景色
 * bgSrc: 背景图地址 http / require()
 * logoSrc: 二维码中心 logo
 * logoScale: logo 尺寸
 * dotScale: 二维码的点的大小 0 ～ 1
 */

export default {
  components: {
    VueQr
  },
  data() {
    return {
      logoSrc: require('@/assets/avatar.jpeg'),
      qrcodeText: `企业名称:杭州云嘉云计算\n统一信用代码:913307837176731653\n安全指数:${100}`
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
