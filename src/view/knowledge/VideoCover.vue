<template>
  <div class="video-vover">
    <pre v-highlightjs="`
      // 选择视频
      handleChooseVideo() {
          let file = this.$refs.chooseVideo.files[0]
          if(!file) return
          let size = Math.floor(file.size / 1024)
          if(size > 3*1024) {
            alert('请选择3MB以内的视频')
            return false
          }
          // 获取视频地址
          let videoUrl
          if(window.createObjectURL != undefined) {
            videoUrl = window.createObjectURL(file)
          } else if (window.URL != undefined) {
            videoUrl = window.URL.createObjectURL(file)
          } else if (window.webkitURL != undefined) {
            videoUrl = window.webkitURL.createObjectURL(file)
          }

          let $video = document.createElement('video')
          $video.src = videoUrl
          // 防止移动端封面黑屏或透明白屏
          $video.play()
          $video.muted = true
          $video.addEventListener('timeupdate', () => {
            if($video.currentTime > .1) {
              $video.pause()
            }
          })
          // 截取视频第一帧作为封面
          $video.addEventListener('loadeddata', function() {
            setTimeout(() => {
              var canvas = document.createElement('canvas')
              canvas.width = $video.videoWidth * .8
              canvas.height = $video.videoHeight * .8
              canvas.getContext('2d').drawImage($video, 0, 0, canvas.width, canvas.height)
              let videoThumb = canvas.toDataURL('image/png')
              console.log(videoThumb)
            }, 16);
          })
      }
    `"><code class="js"></code></pre>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>

</style>
