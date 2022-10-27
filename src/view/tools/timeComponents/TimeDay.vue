<template>
  <div class="time-day">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      text: '',
      totalTime: 60 * 60 * 36 // 1.5天
    }
  },
  mounted() {
    this.renderDate()
    if (this.timer) clearInterval(this.timer)
    // this.timer = setInterval(() => {
    //   this.renderDate()
    // }, 1000)
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    renderDate() {
      const day = parseInt(this.totalTime / (60 * 60 * 24))
      const diff = this.totalTime - (day * 60 * 60 * 24) // 小于 1 天的差
      // 小时
      const h = diff / 3600
      const hour = h < 10 ? ('0' + parseInt(h)) : parseInt(h)
      // 分钟
      const m = (diff - hour * 3600) / 60
      const minute = m < 10 ? ('0' + parseInt(m)) : parseInt(m)
      // 秒钟
      const s = diff % 60
      const second = s < 10 ? ('0' + s) : s
      
      this.text = `${day}天${hour}小时${minute}分${second}秒`
      this.totalTime--
      if (this.totalTime <= 0) clearInterval(this.timer)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
