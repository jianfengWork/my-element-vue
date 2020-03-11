<template>
  <div class="file">
    <el-button type="primary" @click="getAvatar">点击下载</el-button>
  </div>
</template>

<script>
import saveAs from 'file-saver'

export default {
  name: 'File',
  data() {
    return {}
  },
  methods: {
    linkDownload(path) {
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = path
      link.setAttribute('download', '导出资料' + new Date().toLocaleDateString() + '.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    getAvatar() {
      saveAs('/static/downloads/avatar.png') // Method1
      // this.$fileDownLoad('/static/downloads/listen.xlsx') // Method2
      // this.linkDownload('/static/downloads/listen.xlsx') // Method3
    }
  }
}
</script>

<style>

</style>
