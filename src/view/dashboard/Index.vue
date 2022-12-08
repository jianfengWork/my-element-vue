<template>
  <div>
    <el-alert :title="$t('message')['app.index.desc']" type="success" :closable="false" />
    <el-button type="primary" size="mini" @click="copyCode">复制代码</el-button>
    <el-button type="primary" size="mini" @click="pdfExport">导出PDF</el-button>
    <el-button type="primary" size="mini" @click="wordExport">导出WORD</el-button>
    <el-button type="primary" size="mini" @click="$router.push('/nav')">路由导航</el-button>
    <el-button type="primary" size="mini" @click="openPdf">查看PDF</el-button>
    <pre id="pdfDom" v-highlightjs="AsideCode"><code class="html"></code></pre>
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
  mounted() {
    /* const name = 'summer' + Date.now()
    this.$socket.emit('login', { // 向服务器发送登陆事件
      name
    })
    this.$socket.on('login', (data) => { // 响应服务器返回的登陆事件
      if (data.status === 'ok') {
        console.log('登陆成功')
      } else {
        this.$router.push('/login')
      }
    })
    this.$socket.emit('message', { // 向服务器发送消息
      name,
      text: name + '：hello socket'
    })
    this.$socket.on('message', function(data) { // 接收服务器消息
      console.log(data)
    })
    this.$socket.on('sys', function(data) { // 接收服务器系统消息
      console.log(data)
    })
    this.timer = setInterval(() => { // 每5秒进行心跳检测，防止链接断开
      this.$socket.emit('heartbeat', {
        name,
      })
    }, 5000) */
  },
  beforeDestroy() {
    // clearInterval(this.timer)
  },
  methods: {
    copyCode(event) {
      this.$clipboard(this.AsideCode, event)
    },
    pdfExport() {
      this.getPdf('#pdfDom')
    },
    wordExport() {
      $('#pdfDom').wordExport(Date.now())
    },
    openPdf() {
      // window.open('/pdf/web/viewer.html?file=http://localhost:3000/static/downloads/hzp.pdf') // 全路径
      window.open('/pdf/web/viewer.html?file=/static/downloads/hzp.pdf') // 当前服务路径
    },
  }
}
</script>
