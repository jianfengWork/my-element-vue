<template>
  <div>
    <el-alert title="Echarts" type="success" :closable="false" />
    <div ref="chartDom" style="height: 500px;"></div>
  </div>
</template>

<script>
import Echarts from 'echarts'
import debounce from 'lodash/debounce' // 防抖效果
import { addListener, removeListener } from 'resize-detector' // 监听图表resize改变

export default {
  name: 'Analysis',
  data() {
    return {
      pieChart: '',
    }
  },
  watch: {
    // option(val) {
    //   this.pieChart.setOption(val);
    // }
    // option: { // 深度监听
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true
    // }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderEchart()
    addListener(this.$refs.chartDom, this.resize)
  },
  beforeDestroy() {
    // this.pieChart.dispose()
    this.pieChart = null
    removeListener(this.$refs.chartDom, this.resize)
  },
  methods: {
    renderEchart() {
      this.pieChart = Echarts.init(this.$refs.chartDom)
      this.pieChart.setOption({
        title: {
          text: 'ECharts'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        },{
          name: '货源',
          type: 'bar',
          data: [52, 20, 36, 10, 10, 20]
        }]
      })
      this.pieChart = {...this.pieChart} // 不用深度监听改值，父组件使用
    },
    resize() {
      this.pieChart.resize()
    }
  },
}
</script>

<style>

</style>
