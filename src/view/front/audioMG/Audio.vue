<template>
  <div class="audio-page">
    <div class="audio-tag TC">
      <audio controls id="aud" v-if="audioSrc">
        <source id="sou" :src="audioSrc" />
      </audio>
    </div>
    <div class="audio-btn TC">
      <el-button type="primary" size="mini" @click="onPlay">{{ playText }}</el-button>
      <el-button type="primary" size="mini" @click="nextMusic">下一首</el-button>
    </div>
    <div class="lyric-box">
      <ul class="lyric-ul">
        <li v-for="item in lyricList" :key="item.id" :id="`num${item.id}`">{{ item.text }}</li>
      </ul>
    </div>
    <div class="lyric-action">
      <div class="current-time">{{ playTime }}</div>
      <div class="lyric-progress" @click="clickProgress">
        <div class="cube" @click.stop="" @mousedown="changeProgress($event)"><span>{{ playTime }}</span></div>
      </div>
      <div class="total-time">{{ totalTime }}</div>
    </div>
    <div class="volume-action">
      <el-button type="primary" size="mini" @click="onVolume">{{ volumeText }}</el-button>
      <div class="volume-progress">
        <div class="updown" @mousedown="changeVolume($event)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { minuteSecond } from '@/utils/dateFc'
import lyricJson from './music/music.json'
import audioSrc from './music/夜空中最亮的星 - G.E.M.邓紫棋.mp3'

let audioPlayer, lyricProgressDom, cubeDom
export default {
  data() {
    return {
      audioSrc,
      playText: '播放',
      volumeText: '音量',
      lyricList: [],
      totalTime: '00:00',
      playTime: '00:00'
    }
  },
  mounted() {
    audioPlayer = document.querySelector('#aud')
    lyricProgressDom = document.querySelector('.lyric-progress')
    cubeDom = document.querySelector('.cube')
    // 加载歌词
    this.loadLyric()
    // 总时间 - 音频或视频的元数据已加载
    audioPlayer.onloadedmetadata = () => {
      this.totalTime = minuteSecond(audioPlayer.duration)
    }
    // 监听播放时间
    audioPlayer.addEventListener('timeupdate', this.timeUpdate)
    // 移除 document.onmousemove
    document.onmouseup = function() {
      document.onmousemove = null
    }
  },
  beforeDestroy() {
    if (audioPlayer) audioPlayer.removeEventListener('timeupdate', this.timeUpdate)
  },
  methods: {
    onPlay() {
      if (audioPlayer.paused) {
        audioPlayer.play()
        this.playText = '暂停'
      } else {
        audioPlayer.pause()
        this.playText = '播放'
      }
    },
    timeUpdate() {
      const currentTime = parseInt(audioPlayer.currentTime)
      const lisDom = document.querySelector('.lyric-ul').querySelectorAll('li')
      for (let i = 0, leni = lisDom.length; i < leni; i++) {
        if (document.querySelector(`#num${currentTime}`)) { // 找不到 id，不做事情
          lisDom[i].style.color = '#fff'
          lisDom[i].style.fontSize = '16px'
        }
      }
      // 高亮
      if (document.querySelector(`#num${currentTime}`)) {
        const curLiDom = document.querySelector(`#num${currentTime}`)
        curLiDom.style.color = '#ffd04b'
        curLiDom.style.fontSize = '20px'
        // 歌词滚动
        const lyricBoxDom = document.querySelector('.lyric-box')
        const lyricUlDom = document.querySelector('.lyric-ul')
        // console.log(lyricBoxDom.offsetHeight / 2, curLiDom.offsetTop)
        if ((lyricBoxDom.offsetHeight / 2 - curLiDom.offsetTop) > 0) {
          lyricUlDom.style.top = 0 + 'px'
        } else {
          // 减 30 = 150 - 160 为 -10，以 -40 为一格向上移动（根据 lyricBoxDom 高度及时变更）
          lyricUlDom.style.top = (lyricBoxDom.offsetHeight / 2 - curLiDom.offsetTop) - 30 + 'px'
        }
      }
      // 时间跟随
      cubeDom.style.left = (audioPlayer.currentTime / audioPlayer.duration) * (lyricProgressDom.offsetWidth - cubeDom.offsetWidth) + 'px'
      this.playTime = minuteSecond(audioPlayer.currentTime)
    },
    loadLyric(id = 1) {
      this.lyricList = []
      const lyric = lyricJson.data.filter(item => item.id == id)[0].lyric
      const arrgc = lyric.split('[')
      // console.log('arrgc', arrgc)
      for (let i = 1, leni = arrgc.length; i < leni; i++) {
        const textArr = arrgc[i].split(']') // ['00:01.03', '夜空中最亮的星 ']
        // console.log('textArr', textArr)
        const timeArr = textArr[0].split('.') // ['00:01', '03']
        const secondArr = timeArr[0].split(':') // ['00', '01']
        const second = secondArr[0] * 60 + secondArr[1] * 1
        // console.log(second, textArr[1])
        this.lyricList.push({ id: second, text: textArr[1] })
      }
    },
    onVolume() {
      if (audioPlayer.muted) {
        audioPlayer.muted = false
        this.volumeText = '音量'
      } else {
        audioPlayer.muted = true
        this.volumeText = '静音'
      }
    },
    clickProgress(evt) {
      evt = evt || window.event
      let left = evt.clientX - lyricProgressDom.offsetLeft
      // console.log('left', left)
      if (left < cubeDom.offsetWidth) left = 0
      if (left > lyricProgressDom.offsetWidth - cubeDom.offsetWidth) {
        left = lyricProgressDom.offsetWidth - cubeDom.offsetWidth
      }
      cubeDom.style.left = left + 'px'
      const currentTime = left / (lyricProgressDom.offsetWidth - cubeDom.offsetWidth)
      audioPlayer.currentTime = currentTime * audioPlayer.duration
    },
    changeProgress(evt) {
      evt = evt || window.event
      const x = evt.clientX - cubeDom.offsetLeft
      document.onmousemove = (evt) => {
        let left = evt.clientX - x
        if (left < 0) left = 0
        if (left > lyricProgressDom.offsetWidth - cubeDom.offsetWidth) {
          left = lyricProgressDom.offsetWidth - cubeDom.offsetWidth
        }
        cubeDom.style.left = left + 'px'
        const currentTime = left / (lyricProgressDom.offsetWidth - cubeDom.offsetWidth)
        audioPlayer.currentTime = currentTime * audioPlayer.duration
        // console.log('audioPlayer.currentTime', audioPlayer.currentTime)
      }
    },
    changeVolume(evt) {
      evt = evt || window.event
      const volumeProDom = document.querySelector('.volume-progress')
      const updownDom = document.querySelector('.updown')
      const x = evt.clientX - updownDom.offsetLeft
      document.onmousemove = (evt) => {
        let left = evt.clientX - x
        if (left < 0) left = 0
        if (left > volumeProDom.offsetWidth - updownDom.offsetWidth) {
          left = volumeProDom.offsetWidth - updownDom.offsetWidth
        }
        updownDom.style.left = left + 'px'
        const volume = left / (volumeProDom.offsetWidth - updownDom.offsetWidth)
        audioPlayer.volume = volume
        audioPlayer.muted = left > 0 ? false : true
        this.volumeText = left > 0 ? '音量' : '静音'
      }
    },
    nextMusic() {
      if (audioPlayer) audioPlayer.removeEventListener('timeupdate', this.timeUpdate)
      cubeDom.style.left = 0 + 'px'
      const lyricUlDom = document.querySelector('.lyric-ul')
      lyricUlDom.style.top = 0 + 'px'
      this.audioSrc = ''
      this.playText = '播放'
      this.lyricList = []
      this.totalTime = '00:00'
      this.playTime = '00:00'
      setTimeout(() => {
        this.audioSrc = audioSrc
        this.$nextTick(() => {
          audioPlayer = document.querySelector('#aud')
          // 总时间 - 音频或视频的元数据已加载
          audioPlayer.onloadedmetadata = () => {
            this.totalTime = minuteSecond(audioPlayer.duration)
          }
          // 监听播放时间
          audioPlayer.addEventListener('timeupdate', this.timeUpdate)
          // this.onPlay()
          this.loadLyric(1)
        })
      }, 1000)
    },
  }
}
</script>

<style lang="scss" scoped>
.audio-page {
  width: 100%;
  height: 100%;
  background: #fff;
  .audio-btn {
    margin: 20px 0;
  }
  .lyric-box {
    width: 500px;
    height: 300px;
    background: #304156;
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    .lyric-ul {
      width: 100%;
      color: #fff;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
      }
    }
  }
  .lyric-action {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    .lyric-progress {
      width: 400px;
      height: 3px;
      background: #304156;
      position: relative;
      margin: 0 30px;
      cursor: pointer;
      div {
        width: 5px;
        height: 5px;
        background: #ffd04b;
        border-radius: 50%;
        border: 5px solid #304156;
        box-sizing: content-box;
        position: absolute;
        top: -7px;
        left: 0px;
        cursor: pointer;
        user-select: none;
      }
      span {
        position: absolute;
        top: 12px;
        left: -18px;
      }
    }
  }
  .volume-action {
    display: flex;
    align-items: center;
    justify-content: center;
    .volume-progress {
      width: 100px;
      height: 3px;
      background: #304156;
      position: relative;
      margin: 0 30px;
      div {
        width: 5px;
        height: 5px;
        background: #ffd04b;
        border-radius: 50%;
        border: 5px solid #304156;
        box-sizing: content-box;
        position: absolute;
        top: -7px;
        left: 85px; // 100 - 15
        cursor: pointer;
      }
    }
  }
}
</style>
