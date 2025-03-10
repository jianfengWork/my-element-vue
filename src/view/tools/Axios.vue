<template>
  <div class="axios">
    <el-alert title="axios" type="success" :closable="false" />
    <el-tag class="axios_tag" v-for="item in list" :key="item">{{item}}</el-tag>
    <div class="MT20">
      <el-alert title="Web Worker" type="success" :closable="false" />
      <el-button type="primary" @click="loadWorker">加载 Worker</el-button>
      <el-button type="primary" @click="workerSum">1 + 2 + ... + 100 = {{ sumResult }}</el-button>
    </div>
  </div>
</template>

<script>
import {getAxios} from './js/use-axios'

let worker
export default {
  name: 'Axios',
  data() {
    return {
      list: [],
      sumResult: '?'
    }
  },
  mounted() {
    // getAxios()
    this.getRatings()
  },
  methods: {
    getRatings() {
      this.$fetch('/api/ratings', {}).then(res => {
        this.list = res.data
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadWorker() {
      if (window.Worker) {
        if (typeof worker == 'undefined') {
          worker = new Worker('worker.js')

          // 监听 Worker 发来的消息
          worker.onmessage = (evt) => {
            console.log('onmessage', evt)
            if (evt.data.type == 'sum') {
              this.sumResult = evt.data.result
            }
          }

          worker.onerror = (evt) => {
            console.log('onerror', evt)
          }

        }
      }
    },
    workerSum() {
      // 发送数据给 Worker
      worker && worker.postMessage({ type: 'sum', data: [1, 100] })
    },
  }
}
</script>

<style lang="scss" scoped>
.axios_tag {
  margin: 20px;
}
</style>
