<template>
  <div class="video-page">
    <div class="video-btn TC">
      <el-button type="primary" size="mini" @click="nextVideo">下一部</el-button>
    </div>
    <div class="video-player">
      <video id="video" :src="videoSrc"></video>
      <div class="controls">
        <!-- 播放/暂停 -->
        <div class="play-switch" @click="onPlay"><i :class="playStatus ? 'el-icon-video-pause' : 'el-icon-video-play'" /></div>
        <!-- 播放进度 -->
        <div class="progress" @mousedown="changeProgress($event)">
          <div class="line" :style="{width: lineWidth}"></div>
        </div>
        <!-- 当前播放时间、播放总时长 -->
        <div class="timer">
          <span>{{ playTime }}</span> / <span>{{ totalTime }}</span>
        </div>
        <!-- 全屏 -->
        <div class="full-screen" @click="onFullScreen"><i :class="fullScreen ? 'el-icon-remove-outline' : 'el-icon-full-screen'" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatHour } from '@/utils/dateFc'
import mp4Src1 from './video/fun.mp4'
import mp4Src2 from './video/chrome.mp4'

let videoPlayer, progressDom
export default {
  data() {
    return {
      videoSrc: mp4Src1,
      playStatus: false,
      fullScreen: false,
      lineWidth: '0%',
      totalTime: '00:00:00',
      playTime: '00:00:00'
    }
  },
  mounted() {
    this.initVideo()
    // 移除 document.onmousemove
    document.onmouseup = function() {
      document.onmousemove = null
    }
  },
  beforeDestroy() {
    if (videoPlayer) videoPlayer.removeEventListener('timeupdate', this.timeUpdate)
  },
  methods: {
    initVideo() {
      videoPlayer = document.querySelector('#video')
      progressDom = document.querySelector('.progress')
      // 当浏览器可以播放视频的时候，渲染时间
      videoPlayer.oncanplay = () => {
        videoPlayer.style.display = 'inline'
        this.totalTime = formatHour(videoPlayer.duration)
      }
      // 进度条，只要修改了 video.currentTime 就会执行 ontimeupdate
      videoPlayer.addEventListener('timeupdate', this.timeUpdate)
      // 视频播放完成之后，重置操作
      videoPlayer.onended = () => {
        videoPlayer.currentTime = 0
        this.playStatus = false
      }
    },
    onPlay() {
      if (this.playStatus == false) {
        videoPlayer.play()
        this.playStatus = true
      } else {
        videoPlayer.pause()
        this.playStatus = false
      }
    },
    timeUpdate() {
      // line 宽度 = 当前的时间 / 总的时间 * 100 + %
      this.lineWidth = videoPlayer.currentTime / videoPlayer.duration * 100 + '%'
      // 显示当前时间
      this.playTime = formatHour(videoPlayer.currentTime)
    },
    changeProgress(evt) {
      evt = evt || window.event
      evt.preventDefault()
      const x = evt.offsetX
      const lastX = evt.clientX - x
      // currentTime 改变，lineWidth 自动改变，但有延迟
      this.lineWidth = x
      videoPlayer.currentTime = x / progressDom.offsetWidth * videoPlayer.duration
      document.onmousemove = (evt) => {
        evt = evt || window.event
        let left = evt.clientX - lastX
        if (left < 0) left = 0
        if (left > progressDom.offsetWidth) left = progressDom.offsetWidth
        this.lineWidth = left + 'px'
        videoPlayer.currentTime = left / progressDom.offsetWidth * videoPlayer.duration
      }
    },
    onFullScreen() {
      const playerDom = document.querySelector('.video-player')
      if (this.fullScreen == false) {

        if (playerDom.webkitRequestFullScreen) {
          playerDom.webkitRequestFullScreen()
        } else if (playerDom.mozRequestFullScreen) {
          playerDom.mozRequestFullScreen()
        } else if (playerDom.requestFullscreen) {
          playerDom.requestFullscreen()
        }

        videoPlayer.style.width = '100%'
        this.fullScreen = true
      } else {
        document.webkitCancelFullScreen()
        videoPlayer.style.width = 'auto'
        this.fullScreen = false
      }
      
    },
    nextVideo() {
      this.videoSrc = this.videoSrc == mp4Src1 ? mp4Src2 : mp4Src1
      if (videoPlayer) videoPlayer.removeEventListener('timeupdate', this.timeUpdate)
      this.playStatus = false,
      this.fullScreen = false,
      this.lineWidth = '0%',
      this.totalTime = '00:00:00',
      this.playTime = '00:00:00'
      this.initVideo()
    },
  }
}
</script>

<style lang="scss" scoped>
.video-page {
  width: 100%;
  height: 100%;
  background: #fff;
  .video-btn {
    margin-bottom: 20px;
  }
}
.video-player {
  width: 720px;
  height: 360px;
  margin: 0 auto;
  border-radius: 4px;
  background: #000 url(./images/loading.gif) center/300px no-repeat;
  position: relative;
  text-align: center;
  .controls {
    width: 700px;
    height: 40px;
    padding: 0 10px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    position: absolute;
    left: 50%;
    margin-left: -350px;
    bottom: 5px;
    display: flex;
    align-items: center;
    user-select: none;
    line-height: 1;
  }
  .play-switch, .full-screen {
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #FFF;
    cursor: pointer;
  }
  .full-screen {
    position: absolute;
    right: 15px;
  }
  .progress {
    width: 430px;
    height: 10px;
    border-radius: 3px;
    overflow: hidden;
    background-color: #555;
    cursor: pointer;
    margin: 0 15px;
    position: relative;
    .line {
      height: 100%;
      background-color: #fff;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .timer {
    height: 20px;
    line-height: 20px;
    color: #FFF;
    font-size: 14px;
  }
}
#video {
  height: 100%;
  display: none;
}
</style>
