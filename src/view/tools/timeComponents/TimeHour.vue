<template>
  <div class="time-hour">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      text: '',
      totalTime: 7200 // 2小时
    }
  },
  mounted() {
    this.renderDate()
    if (this.timer) clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.renderDate()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    renderDate() {
      // 小时
      const h = this.totalTime / 3600
      const hour = h < 10 ? ('0' + parseInt(h)) : parseInt(h)
      // 分钟
      const m = (this.totalTime - hour * 3600) / 60
      const minute = m < 10 ? ('0' + parseInt(m)) : parseInt(m)
      // 秒钟
      const s = this.totalTime % 60
      const second = s < 10 ? ('0' + s) : s
      
      this.text = `${hour} : ${minute} : ${second}`
      this.totalTime--
      if (this.totalTime <= 0) clearInterval(this.timer)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
