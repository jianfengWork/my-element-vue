<template>
  <div class="monaco-editor">
    <div class="btn-action">
      <el-button type="primary" size="mini" @click="onBack">返回</el-button>
      <el-button type="primary" size="mini" @click="onRun">运行</el-button>
    </div>
    <div class="main-cont">
      <div class="editor-cont" ref="monacoDom"></div>
      <div class="render-cont" v-loading="loading">
        <v-chart class="chart-line" :options="options" autoresize />
      </div>
    </div>
  </div>
</template>

<script>
import codeList from './code'
import * as monaco from 'monaco-editor/esm/vs/editor/edcore.main'

let Editor = null
export default {
  data() {
    return {
      options: {},
      loading: false
    }
  },
  mounted() {
    this.initEditor()
    this.onRun()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    Editor = null
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    initEditor() {
      let code = 'const options = {}'
      const result = codeList[0].code
      Editor = monaco.editor.create(this.$refs.monacoDom, {
        value: result || code,
        language: 'javascript', // 支持语言
        theme: 'vs-dark', // 主题
      })
    },
    onRun() {
      this.loading = true
      const onlineCode = Editor.getValue()
      try {
        const runCode = new Function(`${onlineCode};return options || '';`)
        this.options = runCode()
      } catch (e) {
        this.$message.error(`代码错误: ${e}`)
      }
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    onResize() {
      Editor && Editor.layout()
    },
    onBack() {
      this.$router.push('/dashboard/analysis')
    },
  },
}
</script>

<style lang="scss" scoped>
.monaco-editor {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  flex-direction: column;
  overflow: hidden;
  .btn-action {
    padding: 10px;
    text-align: center;
  }
  .main-cont {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    .editor-cont {
      width: 50%;
      height: 100%;
    }
    .render-cont {
      width: 50%;
      height: 100%;
    }
    .chart-line {
      width: 100%;
      height: 100%;
      background: #0C4F8F;
    }
  }
}
</style>
