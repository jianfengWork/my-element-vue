<template>
  <div class="my-recorder">
    <el-row>
      <el-col :span="8">
        <div>采样率</div>
        <el-select v-model="sampleRate" placeholder="采样率" @change="destroyedRecord">
          <el-option
            v-for="item in sampleRateOptions"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <div>采样位数</div>
        <el-select v-model="sampleBit" placeholder="采样位数" @change="destroyedRecord">
          <el-option
            v-for="item in sampleBitOptions"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <div>声道数</div>
        <el-select v-model="numChannel" placeholder="声道数" @change="destroyedRecord">
          <el-option
            v-for="item in numChannelOptions"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="btn-action">
      <div style="padding: 20px 0;">控制</div>
      <el-button type="primary" @click="startRecord" :disabled="record_start">开始录音</el-button>
      <el-button type="primary" @click="pauseRecord" :disabled="record_pause">暂停录音</el-button>
      <el-button type="primary" @click="resumeRecord" :disabled="record_resume">继续录音</el-button>
      <el-button type="primary" @click="stopRecord" :disabled="record_stop">停止录音</el-button>
    </div>
    <div class="view-area">
      <div style="padding: 20px 0;">数据</div>
      <el-row>
        <el-col :span="6">
          <div style="font-size: 24px;">{{recordData.duration}}</div>
          <div>录音时长(秒)</div>
        </el-col>
        <el-col :span="6">
          <div style="font-size: 24px;">{{recordData.fileSize}}</div>
          <div>录音大小(字节)</div>
        </el-col>
        <el-col :span="6">
          <div style="font-size: 24px;">{{(recordData.fileSize / 1024 / 1024).toFixed(5)}}M</div>
          <div>录音大小(M)</div>
        </el-col>
        <el-col :span="6">
          <div style="font-size: 24px;">{{recordData.vol}}</div>
          <div>当前录音音量百分比(%)</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div style="padding: 20px 0;">录音频段：</div>
          <canvas id="recorderCanvas"></canvas>
        </el-col>
        <el-col :span="12">
          <div style="padding: 20px 0;">播放频段：</div>
          <canvas id="playCanvas"></canvas>
        </el-col>
      </el-row>
    </div>
    <div class="btn-action">
      <div style="padding: 20px 0;">播放</div>
      <el-button type="primary" @click="startPlay" :disabled="play_start">开始播放</el-button>
      <el-button type="primary" @click="pausePlay" :disabled="play_pause">暂停播放</el-button>
      <el-button type="primary" @click="resumePlay" :disabled="play_resume">继续播放</el-button>
      <el-button type="primary" @click="stopPlay" :disabled="play_stop">停止播放</el-button>
      <span>播放时间：{{playTime.toFixed(2)}}(秒)</span>
    </div>
    <div class="btn-action">
      <div style="padding: 20px 0;">格式</div>
      <el-button type="primary" @click="downloadWAV" :disabled="download_WAV">下载WAV</el-button>
    </div>
    <div class="view-area">
      <div style="padding: 20px 0;">vue-audio-native</div>
      <vue-audio-native
        :url="'https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_test_app/business_college/audio/20200409/79c3182021410b559d53e6fde3afda55.mp3'"
        :show-current-time="true"
        :show-controls="false"
        :show-download="true"
        :autoplay="false"
        :wait-buffer="true"
        hint=""
      />
    </div>
  </div>
</template>

<script>
import Recorder from 'js-audio-recorder'
// http://recorder.api.zhuyuntao.cn/

let recorder = null // 录音实例
let oCanvas = null // 录音dom
let ctx = null // 录音dom 绘图上下文
let drawRecordId = null // 录音波纹
let pCanvas = null // 回放dom
let pCtx = null // 回放dom 绘图上下文
let drawPlayId = null // 回放波纹

export default {
  data() {
    return {
      sampleRate: 16000, // 采样率
      sampleBit: 16, // 采样位数
      numChannel: 1, // 声道数 单
      sampleRateOptions: [
        { text: '8000', value: 8000 },
        { text: '16000', value: 16000 },
        { text: '22050', value: 22050 },
        { text: '24000', value: 24000 },
        { text: '44100', value: 44100 },
        { text: '48000', value: 48000 },
      ],
      sampleBitOptions: [
        { text: '8', value: 8 },
        { text: '16', value: 16 },
      ],
      numChannelOptions: [
        { text: '单', value: 1 },
        { text: '双', value: 2 },
      ],
      recordData: {
        duration: 0,
        fileSize: 0,
        vol: 0,
      },
      playTime: 0,
      timer: null,
      record_start: false,
      record_pause: true,
      record_resume: true,
      record_stop: true,
      play_start: true,
      play_pause: true,
      play_resume: true,
      play_stop: true,
      download_WAV: true,
    }
  },
  mounted() {
    oCanvas = document.getElementById('recorderCanvas')
    ctx = oCanvas.getContext('2d')
    pCanvas = document.getElementById('playCanvas')
    pCtx = pCanvas.getContext('2d')
  },
  destroyed() {
    this.destroyedRecord()
  },
  methods: {
    startRecord() {
      this.clearPlay()
      this.record_start = true
      this.record_pause = false
      this.record_resume = true
      this.record_stop = false

      this.play_start = true
      this.play_pause = true
      this.play_resume = true
      this.play_stop = true

      this.download_WAV = true

      recorder = null

      const config = this.configData() // 获取录音配置

      if (!recorder) {
        recorder = new Recorder(config)

        recorder.onprogress = (params) => {
          // console.log(recorder, params)
          this.recordData = {
            duration: params.duration.toFixed(2),
            fileSize: params.fileSize,
            vol: params.vol.toFixed(2)
          }
        }
        // recorder.onplay = () => {
        //   console.log('%c回调监听，开始播放音频', 'color: #2196f3')
        // }
        // recorder.onpauseplay = () => {
        //   console.log('%c回调监听，暂停播放音频', 'color: #2196f3')
        // }
        // recorder.onresumeplay = () => {
        //   console.log('%c回调监听，继续播放音频', 'color: #2196f3')
        // }
        // recorder.onstopplay = () => {
        //   console.log('%c回调监听，停止播放音频', 'color: #2196f3')
        // }
        recorder.onplayend = () => {
          console.log('%c回调监听，音频已经完成播放', 'color: #2196f3')
          this.stopPlay();
        }
      }
      recorder.start().then(() => {
        console.log('开始录音')
        this.drawRecord() // 开始绘制canvas
      }).catch(error => {
        console.log(`异常了, ${error.name}:${error.message}`)
      })
    },
    pauseRecord() {
      this.record_start = true
      this.record_pause = true
      this.record_resume = false
      this.record_stop = true
      if (recorder) {
        console.log('暂停录音')
        recorder.pause()
        drawRecordId && cancelAnimationFrame(drawRecordId)
        drawRecordId = null
      }
    },
    resumeRecord() {
      this.record_start = true
      this.record_pause = false
      this.record_resume = true
      this.record_stop = false
      console.log('继续录音')
      recorder && recorder.resume()
      this.drawRecord()
    },
    stopRecord() {
      this.record_start = false
      this.record_pause = true
      this.record_resume = true
      this.record_stop = true

      this.play_start = false
      this.play_pause = true
      this.play_resume = true
      this.play_stop = true

      this.download_WAV = false

      console.log('停止录音')
      recorder && recorder.stop()
      drawRecordId && cancelAnimationFrame(drawRecordId)
      drawRecordId = null
    },
    drawRecord() {
      drawRecordId = requestAnimationFrame(this.drawRecord) // 用requestAnimationFrame稳定60fps绘制
      // 实时获取音频大小数据
      let dataArray = recorder.getRecordAnalyseData()
      let bufferLength = dataArray.length
      // 填充背景色
      ctx.fillStyle = '#eee'
      ctx.fillRect(0, 0, oCanvas.width, oCanvas.height)
      // 设定波形绘制颜色
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgb(17, 169, 131)'
      ctx.beginPath()

      var sliceWidth = oCanvas.width * 1.0 / bufferLength // 一个点占多少位置，共有bufferLength个点要绘制
      var x = 0 // 绘制点的x轴位置
      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0
        var y = v * oCanvas.height / 2
        if (i === 0) {
          ctx.moveTo(x, y) // 第一个点
        } else {
          ctx.lineTo(x, y) // 剩余的点
        }
        x += sliceWidth // 依次平移，绘制所有点
      }

      ctx.lineTo(oCanvas.width, oCanvas.height / 2)
      ctx.stroke()
    },
    startPlay() {
      this.record_start = true
      this.record_pause = true
      this.record_resume = true
      this.record_stop = true

      this.play_start = true
      this.play_pause = false
      this.play_resume = true
      this.play_stop = false

      console.log('开始播放')
      recorder && recorder.play()
      drawRecordId && cancelAnimationFrame(drawRecordId)
      drawRecordId = null
      recorder && this.drawPlay()

      this.playTime = 0
      this.timer = setInterval(() => {
        this.playTime = recorder.getPlayTime()
      }, 100)
    },
    pausePlay() {
      this.play_start = true
      this.play_pause = true
      this.play_resume = false
      this.play_stop = true
      console.log('暂停播放')
      this.stopDrawPlay()
      recorder && recorder.pausePlay()

      clearInterval(this.timer)
      this.timer = null
    },
    resumePlay() {
      this.play_start = true
      this.play_pause = false
      this.play_resume = true
      this.play_stop = false
      console.log('继续播放')
      recorder && recorder.resumePlay()
      this.drawPlay()

      this.timer = setInterval(() => {
        this.playTime = recorder.getPlayTime()
      }, 100)
    },
    stopPlay() {
      this.record_start = false
      this.record_pause = true
      this.record_resume = true
      this.record_stop = true

      this.play_start = false
      this.play_pause = true
      this.play_resume = true
      this.play_stop = true

      console.log('停止播放')
      this.clearPlay()
      recorder && recorder.stopPlay()

      clearInterval(this.timer)
      this.timer = null
      this.playTime = 0
    },
    drawPlay() {
      drawPlayId = requestAnimationFrame(this.drawPlay) // 用requestAnimationFrame稳定60fps绘制
      // 实时获取音频大小数据
      let dataArray = recorder.getPlayAnalyseData()
      let bufferLength = dataArray.length
      // 填充背景色
      pCtx.fillStyle = '#eee'
      pCtx.fillRect(0, 0, pCanvas.width, pCanvas.height)
      // 设定波形绘制颜色
      pCtx.lineWidth = 1
      pCtx.strokeStyle = 'rgb(17, 169, 131)'
      pCtx.beginPath()

      var sliceWidth = pCanvas.width * 1.0 / bufferLength // 一个点占多少位置，共有bufferLength个点要绘制
      var x = 0 // 绘制点的x轴位置
      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0
        var y = v * pCanvas.height / 2
        if (i === 0) {
          pCtx.moveTo(x, y) // 第一个点
        } else {
          pCtx.lineTo(x, y) // 剩余的点
        }
        x += sliceWidth // 依次平移，绘制所有点
      }

      pCtx.lineTo(pCanvas.width, pCanvas.height / 2)
      pCtx.stroke()
    },
    configData() {
      return {
        sampleRate: this.sampleRate,
        sampleBits: this.sampleBit,
        numChannels: this.numChannel,
      }
    },
    downloadWAV() {
      if (recorder) {
        console.log('wav: ', recorder.getWAVBlob())
        recorder.getWAVBlob().arrayBuffer().then(arraybuffer => {
          // console.log(arraybuffer)
        })
        recorder.downloadWAV('recorder')
      }
    },
    destroyedRecord() {
      if (recorder) {
        this.record_start = false
        this.record_pause = true
        this.record_resume = true
        this.record_stop = true

        this.play_start = true
        this.play_pause = true
        this.play_resume = true
        this.play_stop = true

        this.download_WAV = true
        this.recordData = {
          duration: 0,
          fileSize: 0,
          vol: 0,
        }
        clearInterval(this.timer)
        this.playTime = 0
        recorder.destroy().then(() => {
          console.log('%c销毁录音实例', 'color: #2196f3')
          recorder = null
          drawRecordId && cancelAnimationFrame(drawRecordId)
          this.stopDrawPlay()
        })
      }
    },
    clearPlay() { // 清空录音波纹
      if (drawRecordId) {
        cancelAnimationFrame(drawRecordId)
        drawRecordId = null
      }
      this.stopDrawPlay()
    },
    stopDrawPlay() { // 停止回放波纹
      drawPlayId && cancelAnimationFrame(drawPlayId)
      drawPlayId = null
    },
  },
}
</script>

<style lang="scss">
.my-recorder {
  .el-select {
    width: 90%;
  }
  canvas {
    width: 80%;
    height: 200px;
    background: #eee;
  }
}
</style>
