<template>
  <div>
    <el-alert :title="'vueEcharts & Echarts'" type="success" :closable="false" />
    <!-- <div ref="chartDom" style="height: 500px;"></div> -->
    <v-chart class="chart-line" :options="options" autoresize />
    <!-- 折线图 -->
    <el-row :gutter="20" class="MT20">
      <el-col :span="12">
        <el-alert title="折线图：渐变、图例、曲线" type="success" :closable="false" />
        <ChartLine1 />
      </el-col>
      <el-col :span="12">
        <el-alert title="折线图：渐变、图例、双折线" type="success" :closable="false" />
        <ChartLine2 />
      </el-col>
    </el-row>
    <!-- 柱状图 -->
    <el-row :gutter="20" class="MT20">
      <el-col :span="12">
        <el-alert title="柱状图：渐变、图例、shadowStyle" type="success" :closable="false" />
        <ChartBar1 />
      </el-col>
      <el-col :span="12">
        <el-alert title="柱状图：图例、双柱图" type="success" :closable="false" />
        <ChartBar2 />
      </el-col>
      <el-col :span="12" class="MT20">
        <el-alert title="柱状图：x轴、y轴互换" type="success" :closable="false" />
        <ChartBar3 />
      </el-col>
      <el-col :span="12" class="MT20">
        <el-alert title="柱状图：图例、折线图、下载、水印" type="success" :closable="false" />
        <ChartBar4 />
      </el-col>
    </el-row>
    <!-- 饼图 -->
    <el-row :gutter="20" class="MT20">
      <el-col :span="12">
        <el-alert title="饼图：图例 - 正常" type="success" :closable="false" />
        <ChartPie1 />
      </el-col>
      <el-col :span="12">
        <el-alert title="饼图：图例 - 自定义" type="success" :closable="false" />
        <ChartPie2 />
      </el-col>
      <el-col :span="12" class="MT20">
        <el-alert title="饼图：内外环" type="success" :closable="false" />
        <ChartPie3 />
      </el-col>
    </el-row>
    <!-- 环形图 -->
    <el-row :gutter="20" class="MT20">
      <el-col :span="12" class="chart-cont">
        <el-alert title="环形图：中心数据" type="success" :closable="false" />
        <ChartRing1 />
        <div class="chart-text">
          <div class="">商户数(个)</div>
          <div class="">{{ 0 }}</div>
        </div>
      </el-col>
      <el-col :span="12">
        <el-alert title="环形图：Label、图例" type="success" :closable="false" />
        <ChartRing2 />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import debounce from 'lodash/debounce' // 防抖效果
import { addListener, removeListener } from 'resize-detector' // 监听图表resize改变
import ChartLine1 from './charts/chartLine1'
import ChartLine2 from './charts/chartLine2'
import ChartBar1 from './charts/chartBar1'
import ChartBar2 from './charts/chartBar2'
import ChartBar3 from './charts/chartBar3'
import ChartBar4 from './charts/chartBar4'
import ChartPie1 from './charts/chartPie1'
import ChartPie2 from './charts/chartPie2'
import ChartPie3 from './charts/chartPie3'
import ChartRing1 from './charts/chartRing1'
import ChartRing2 from './charts/chartRing2'

export default {
  name: 'Analysis',
  components: {
    ChartLine1, ChartLine2,
    ChartBar1, ChartBar2, ChartBar3, ChartBar4,
    ChartPie1, ChartPie2, ChartPie3,
    ChartRing1, ChartRing2,
  },
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

<style lang="scss" scoped>
.chart-line {
  width: 100%;
  height: 280px;
}
.chart-cont {
  position: relative;
  .chart-text {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: calc(50% + 19px);
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
}
</style>
