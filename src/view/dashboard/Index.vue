<template>
  <div>
    <el-alert :title="$t('message')['app.index.desc']" type="success" :closable="false" />
    <el-button type="primary" size="mini" @click="copyCode">复制代码</el-button>
    <pre v-highlightjs="AsideCode"><code class="html"></code></pre>
  </div>
</template>

<script>
// https://highlightjs.org/ 高亮颜色选择
import AsideCode from '!!raw-loader!@/view/layout/components/Aside'

export default {
  name: 'Index',
  data() {
    return {
      AsideCode
    }
  },
  methods: {
    copyCode(event) {
      this.$clipboard(this.AsideCode, event)
    }
  }
}
</script>
