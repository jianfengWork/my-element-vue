<template>
  <div class="render-fn">
    <RenderHtml :userProvidedHtml="htmlContent" />
    <pre v-highlightjs="RenderHtmlCode"><code class="js"></code></pre>
  </div>
</template>

<script>
import RenderHtml from './components/renderHtml'
import RenderHtmlCode from '!!raw-loader!./components/renderHtml.js'

export default {
  components: {
    RenderHtml
  },
  data() {
    return {
      RenderHtmlCode,
      htmlContent: '<p>渲染函数替换v-html</p>'
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
