<template>
  <div class="components-container">
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="editor-content" v-html="content" />
    <!-- {{html}} -->
  </div>
</template>

<script>
import Tinymce from '@/components/richTinymce/richTiny'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      html: '', // 标签字符串
      content: '',
    }
  },
  mounted() {
    this.content = `<h1 style="text-align: center;">我喜欢土土!</h1><h1 style="text-align: center;">土土喜欢我!</h1>`
  },
  watch: {
    content(val) {
      this.html = val
      console.log(val)
    }
  },
}
</script>

<style scoped>
.mce-flow-layout-item.mce-last {
  display: none;
}
.editor-content{
  margin-top: 20px;
}
</style>
