<template>
  <!-- 重开一页签，uuid 代表用户ID -->
  <div class="webrtc-call">
    <div class="local-stream">
      <el-alert title="local-stream" type="success" :closable="false" />
      <div class="video-cont">
        <video class="local-video" ref="localVideoDom" muted></video>
      </div>
    </div>
    <div class="remote-stream">
      <el-alert title="remote-stream" type="success" :closable="false" />
      <div class="video-cont">
        <video class="remote-video" ref="remoteVideoDom"></video>
      </div>
    </div>
  </div>
</template>

<script>
import Peer from 'peerjs'

let localStream = null
export default {
  data() {
    return {
      uuid: 'remote-id',
      peer: null,
      currentCall: null
    }
  },
  mounted() {
    this.peer = new Peer(this.uuid, {
      host: '',
      port: '9000',
      path: '/myapp'
    })
    console.log('this.peer', this.peer)
    this.peer.on('open', id => {
      console.log('peer open id:', id)
    })
    
    // 响应被呼叫
    this.peer.on('call', call => {
      this.currentCall = call
      this.openLocalStream().then(localStream => {
        call.answer(localStream)
        
        call.on('stream', remoteStream => {
          this.$refs.remoteVideoDom.srcObject = remoteStream
          this.$refs.remoteVideoDom.autoplay = true
        })
        call.on('close', () => {
          console.log('call close')
        })

      })
    })

    // 响应被连接事件
    this.peer.on('connection', (connObj) => {
      connObj.on('data', (data) => {
        console.log('接收到接收方的消息：', data)
        // 关闭通话
        if (data && data === 'break') {
          this.currentCall.close()
          this.closeLocalStream()
          this.$refs.remoteVideoDom.srcObject = null
        }
      })
    })
  },
  beforeDestroy() {
    this.peer && this.peer.destroy()
    this.closeLocalStream()
  },
  methods: {
    openLocalStream() {
      return new Promise((resolve, reject) => {
        // 获取本地媒体流
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            localStream = stream
            this.$refs.localVideoDom.srcObject = stream
            this.$refs.localVideoDom.autoplay = true
            this.$refs.localVideoDom.play()
            // console.log('localStream', localStream)
            resolve(localStream)
          }).catch(err => {
            reject()
            this.$message.error('摄像头，麦克风开启失败!')
            console.log("Failed to get local stream", err)
          })

        } else {
          reject()
          this.$message.error('MediaDevices API is not supported on this browser.')
        }
      })
    },
    closeLocalStream() {
      localStream && localStream.getTracks().forEach(track => track.stop())
    },
  }
}
</script>

<style lang="scss" scoped>
.webrtc-call {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  .local-stream {
    flex: 1;
    padding-right: 10px;
    .video-cont {
      margin-top: 20px;
      .local-video {
        width: 100%;
        height: 300px;
      }
    }
  }
  .remote-stream {
    flex: 1;
    padding-left: 10px;
    .video-cont {
      margin-top: 20px;
      .remote-video {
        width: 100%;
        height: 300px;
      }
    }
  }
}
</style>
