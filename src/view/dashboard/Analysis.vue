<template>
  <div>
    <el-alert title="Echarts" type="success" :closable="false" />
    <!-- <div ref="chartDom" style="height: 500px;"></div> -->
    <v-chart class="chart-line" :options="options" autoresize />
  </div>
</template>

<script>
import debounce from 'lodash/debounce' // 防抖效果
import { addListener, removeListener } from 'resize-detector' // 监听图表resize改变

export default {
  name: 'Analysis',
  data() {
    return {
      pieChart: '',
      options: {
        title: {
        // text: 'line'
      },
      tooltip: {
        trigger: 'axis',
      },
      color: [this.$store.state.themeColor],
      grid: { // 内边距
        top: '8%',
        left: '0%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          areaStyle: {},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
      ],
      },
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
    // 自写打开
    // this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.$bus.$on('changeOptions', item => {
      this.options.color = [item]
    })
    // 自写打开
    // this.renderEchart()
    // addListener(this.$refs.chartDom, this.resize)
  },
  beforeDestroy() {
    this.$bus.$off('changeOptions')
    // 自写打开
    // this.pieChart.dispose()
    // this.pieChart = null
    // removeListener(this.$refs.chartDom, this.resize)
  },
  methods: {
    renderEchart() {
      this.pieChart = this.Echarts.init(this.$refs.chartDom)
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

<style scoped>
.chart-line {
  width: 100%;
  height: 280px;
}
</style>
