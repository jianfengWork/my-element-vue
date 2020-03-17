<template>
  <el-button @click="run" type="primary" :class="{'btn-default-color': time > 0}" :disabled="disabled || time > 0">{{ text }}</el-button>
</template>

<script>
export default {
  name: 'smscode', // 短信验证码
  props: {
    second: {
      type: Number,
      default: 60
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      time: 0
    }
  },
  methods: {
    run() {
      this.$emit('run')
    },
    start() {
      this.time = this.second
      this.timer()
    },
    stop() {
      this.time = 0
      this.disabled = false
    },
    setDisabled(val) {
      this.disabled = val
    },
    timer() {
      if (this.time > 0) {
        this.time--
        setTimeout(this.timer, 1000)
      } else {
        this.disabled = false
      }
    }
  },
  computed: {
    text() {
      return this.time > 0 ? this.time + 's 后重新获取' : '获取短信验证码'
    }
  }
}
</script>
