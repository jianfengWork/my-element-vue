<template>
  <div class="file">
    <el-button type="primary" @click="getAvatar">点击下载</el-button>
  </div>
</template>

<script>
import URI from 'urijs' // 处理请求url
import saveAs from 'file-saver'

export default {
  name: 'File',
  data() {
    return {}
  },
  mounted() {
    // this.exportFile()
  },
  methods: {
    linkDownload(path) {
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = path
      link.setAttribute('download', 'download')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    getAvatar() {
      saveAs('/static/downloads/avatar.png') // Method1
      // this.$fileDownLoad('/static/downloads/listen.xlsx') // Method2
      // this.linkDownload('/static/downloads/listen.xlsx') // Method3
    },
    exportFile() {
      const uri = URI('/api/export')
      let params = {
        'export_type': 'json',
        'access-token': localStorage.themeColor,
      }
      uri.addQuery(params)
      let href = uri.toString()
      console.log(href)
      // this.linkDownload(href)
    },
  }
}
</script>

<style>

</style>
