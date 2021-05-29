<template>
  <div class="anhui-map-cont">
    <div ref="anhuiMapDom" class="anhui-map" />
  </div>
</template>

<script>
import debounce from 'lodash/debounce' // 防抖效果
import { addListener, removeListener } from 'resize-detector' // 监听图表resize改变

export default {
  data() {
    return {
      anhuiMap: null,
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
        series: [
          {
            name: '安徽省区域分布图',
            type: 'map',
            mapType: '安徽', // 自定义扩展图表类型
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
      const that = this
      this.anhuiMap.on('click', function(param) {
        console.log(param)
        that.$message.success(param.name)
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
</style>
