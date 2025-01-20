<template>
  <div class="webrtc-page">
    <div class="local-stream">
      <el-alert title="local-stream" type="success" :closable="false" />
      <div class="btn-area">
        <el-button type="primary" @click="openLocalStream">开启本地流</el-button>
        <el-button type="primary" @click="closeLocalStream">关闭本地流</el-button>
      </div>
      <div class="video-cont">
        <video class="local-video" ref="localVideoDom" muted></video>
      </div>
    </div>
    <div class="remote-stream">
      <el-alert title="remote-stream" type="success" :closable="false" />
      <div class="btn-area">
        <el-button type="primary" @click="openCall">开始通话</el-button>
        <el-button type="primary" @click="closeCall">关闭通话</el-button>
      </div>
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
      uuid: Date.now(),
      peer: null,
      currentCall: null
    }
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
    openCall() {
      // 结束通话后，同样的 id 不能连接第二次
      this.peer = new Peer(this.uuid, {
        host: '',
        port: '9000',
        path: '/myapp'
      })
      console.log('this.peer', this.peer)
      this.peer.on('open', id => {})
      this.peer.on('error', err => {
        console.log('peer error', err)
      })

      this.openLocalStream().then(localStream => {
        // 呼叫别人
        const call = this.peer.call('remote-id', localStream)
        this.currentCall = call

        call.on('stream', remoteStream => {
          this.$refs.remoteVideoDom.srcObject = remoteStream
          this.$refs.remoteVideoDom.autoplay = true
        })
        call.on('close', () => {
          console.log('call close')
        })
        call.on('error', err => {
          console.log('error', err)
        })

      })
    },
    closeCall() {
      const connObj = this.peer.connect('remote-id')
      connObj.on('open', () => {
        // Send messages
        connObj.send('break')
        // 测试结果：currentCall.close() 只会触发自己页面的 call.on('close', () => {})
        this.currentCall.close()
        this.closeLocalStream()
        this.$refs.remoteVideoDom.srcObject = null
        setTimeout(() => {
          this.peer.destroy()
        }, 1000)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.webrtc-page {
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
