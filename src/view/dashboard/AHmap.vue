<template>
  <div class="anhui-map-cont">
    <el-button type="primary" size="mini" v-show="!showMap" @click="showMap = true">返回省份</el-button>
    <div ref="anhuiMapDom" class="anhui-map" />
    <AHcity :city-name="cityName" v-if="!showMap" />
  </div>
</template>

<script>
import debounce from 'lodash/debounce' // 防抖效果
import { addListener, removeListener } from 'resize-detector' // 监听图表resize改变
import AHmapJson from 'echarts/map/json/province/anhui.json' // registerMap 扩展注册
import AHcity from './AHmap/AHcity'

export default {
  components: {
    AHcity,
  },
  data() {
    return {
      anhuiMap: null,
      showMap: true,
      cityName: '',
    }
  },
  created() {
    this.resize = debounce(this.resize, 200)
  },
  beforeDestroy() {
    this.anhuiMap.dispose()
    this.anhuiMap = null
    removeListener(this.$refs.anhuiMapDom, this.resize)
  },
  mounted() {
    this.renderEchart()
    addListener(this.$refs.anhuiMapDom, this.resize)
  },
  methods: {
    renderEchart() {
      this.anhuiMap = this.Echarts.init(this.$refs.anhuiMapDom)
      this.Echarts.registerMap('anhui', AHmapJson)
      const seriesData = [
        { name: '合肥市', value: 1000 },
        { name: '芜湖市', value: 900 },
        { name: '蚌埠市', value: 700 },
        { name: '黄山市', value: 700 },
        { name: '阜阳市', value: 700 },
        { name: '宿州市', value: 500 },
        { name: '滁州市', value: 500 },
        { name: '亳州市', value: 500 },
        { name: '池州市', value: 500 },
        { name: '淮南市', value: 300 },
        { name: '安庆市', value: 300 },
        { name: '宣城市', value: 300 },
        { name: '淮北市', value: 100 },
        { name: '六安市', value: 100 },
        { name: '马鞍山市', value: 100 },
        { name: '铜陵市', value: 100 },
      ]
      
      const option = { // 指定图表的配置项和数据
        title: {
          text: '安徽省',
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (params.data) {
              return params.name + '<br/>统计：' + params.data.value
            }
          }
        },
        legend: {
          show: true,
          orient: 'vertical',
          x: 'right',
          top: '20',
          itemStyle: {
            color: '#5C70F4',
          },
          // backgroundColor: '#fff',
        },
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
        },
        textStyle: {
          fontSize: 14,
        },
        visualMap: {
          min: 0,
          max: 1000,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          textStyle: {
            fontSize: 12,
          },
          inRange: {
            color: ['#f0f4fe', '#9099FC', '#5C70F4'], // 由浅入深
          },
          left: '2%',
          bottom: 6,
        },
        // visualMap: {
        //   min: 0,
        //   max: 1000,
        //   left: 26,
        //   bottom: 40,
        //   showLabel: !0,
        //   text: ['高', '低'],
        //   pieces: [
        //     { gt: 100, label: '> 100 人', color: '#7f1100' },
        //     { gte: 10, lte: 100, label: '10 - 100 人', color: '#ff5428' },
        //     { gte: 1, lt: 10, label: '1 - 9 人', color: '#ff8c71' },
        //     { gt: 0, lt: 1, label: '疑似', color: '#ffd768' },
        //     { value: 0, color: '#ffffff' } 
        //   ],
        //   show: true
        // },
        series: [
          {
            name: '安徽省区域分布图',
            type: 'map',
            mapType: 'anhui', // 自定义扩展图表类型
            zoom: 1.2,
            label: {
              normal: { // 字体颜色
                show: true,
                // formatter: '{b}({c})',
                // color: '#fff'
              },
              emphasis: { // 鼠标聚焦时字体颜色
                show: true,
                color: '#fff'
              }
            },
            itemStyle: {
              areaColor: '#bf2cfe', // 未匹配到 visualMap 颜色时显示
              color: '#25D72A', // area 中心点颜色
              borderWidth: 0.5, // 边框大小
              borderColor: '#e5e5e5', // 边界线颜色，borderwidth 必须要大于 0
            },
            emphasis: { // 鼠标聚焦时区域颜色
              itemStyle: {
                label: { show: true },
                areaColor: '#ff6e8b',
              }
            },
            hoverAnimation: true,
            data: seriesData,
          }
        ],
      }

      this.anhuiMap.setOption(option)
      this.anhuiMap.on('click', param => {
        console.log(param)
        if (param.name != '合肥市' && param.name != '芜湖市') return this.$message.error('暂未开发')
        this.$message.success(param.name)
        this.showMap = false
        this.cityName = param.name
      })
    },
    resize() {
      this.anhuiMap.resize()
    }
  },
}
</script>

<style lang="scss">
.anhui-map {
  width: 100%;
  height: 600px;
}
.anhui-map-cont {
  position: relative;
  .el-button {
    position: absolute;
    top: 20px;
    right: 30px;
    z-index: 2;
  }
}
</style>
