<template>
  <div class="anhui-city-cont">
    <div ref="anhuiCityDom" class="anhui-city" />
  </div>
</template>

<script>
import debounce from 'lodash/debounce' // 防抖效果
import { addListener, removeListener } from 'resize-detector' // 监听图表resize改变
// import AH_HF_JSON from '../AHmap/hefei.json' // registerMap 扩展注册

export default {
  props: {
    cityName: {
      type: String,
      default: '芜湖市'
    },
  },
  data() {
    return {
      anhuiCity: null,
      mapEnum: {
        '合肥市': 'hefei',
        '芜湖市': 'wuhu',
      },
      seriesEnum: {
        '合肥市': [
          { name: '肥东县', value: 1000 },
          { name: '瑶海区', value: 900 },
          { name: '包河区', value: 700 },
          { name: '蜀山区', value: 700 },
          { name: '庐阳区', value: 700 },
          { name: '长丰县', value: 500 },
          { name: '肥西县', value: 500 },
          { name: '庐江县', value: 500 },
          { name: '巢湖市', value: 500 },
        ],
        '芜湖市': [
          { name: '三山区', value: 1000 },
        ],
      },
    }
  },
  created() {
    this.resize = debounce(this.resize, 200)
  },
  beforeDestroy() {
    this.anhuiCity.dispose()
    this.anhuiCity = null
    removeListener(this.$refs.anhuiCityDom, this.resize)
  },
  mounted() {
    this.renderEchart()
    addListener(this.$refs.anhuiCityDom, this.resize)
  },
  methods: {
    renderEchart() {
      // console.log(this.cityName)
      this.anhuiCity = this.Echarts.init(this.$refs.anhuiCityDom)
      const AH_CITY_JSON = require('../AHmap/json/' + this.mapEnum[this.cityName] + '.json')
      this.Echarts.registerMap('anhui-city', AH_CITY_JSON)
      const seriesData = this.seriesEnum[this.cityName]
      
      const option = { // 指定图表的配置项和数据
        title: {
          text: this.cityName,
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
          show: false,
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
        series: [
          {
            name: '安徽省区域分布图',
            type: 'map',
            mapType: 'anhui-city', // 自定义扩展图表类型
            zoom: 1.2,
            label: {
              normal: { // 字体颜色
                show: true,
                // color: '#fff'
              },
              emphasis: { // 鼠标聚焦时字体颜色
                show: true,
                color: '#fff'
              }
            },
            itemStyle: {
              areaColor: '#f0f4fe', // 未匹配到 visualMap 颜色时显示
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

      this.anhuiCity.setOption(option)
      const that = this
      this.anhuiCity.on('click', function(param) {
        console.log(param.name)
        that.$message.success(param.name)
        // return false
      })
    },
    resize() {
      this.anhuiCity.resize()
    }
  },
}
</script>

<style lang="scss">
.anhui-city-cont {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
}
.anhui-city {
  width: 100%;
  height: 600px;
}
</style>
