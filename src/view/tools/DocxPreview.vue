<template>
  <div class="docx-html">
    <div class="action-btn TC">
      <el-button type="primary" size="mini" @click="uploadDocx">预览docx</el-button>
      <input type="file" accept=".doc, .docx" style="display: none;" ref="fileDom" @change="changefile($event.target)" />
    </div>
    <div ref="word" class="doc-wrap"></div>
  </div>
</template>

<script>
// https://github.com/VolodymyrBaydalka/docxjs
const docxPreview = require('docx-preview')

export default {
  data() {
    return {}
  },
  methods: {
    uploadDocx() {
      this.$refs.fileDom.click()
    },
    changefile(dom) {
      setTimeout(() => {
        this.$refs.fileDom.value = ''
      }, 2000)

      const file = dom.files[0]
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const buffer = reader.result
        docxPreview.renderAsync(buffer, this.$refs.word)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.docx-html {
  width: 100%;
  height: 100%;
  background: #fff;
  .doc-wrap {
    width: 100%;
    height: calc(100% - 28px);
    background: grey;
    overflow: auto;
  }
}
</style>
