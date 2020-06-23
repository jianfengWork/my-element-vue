<template>
  <div class="china-map-cont">
    <div ref="chinaMapDom" class="china-map" />
  </div>
</template>

<script>
import debounce from 'lodash/debounce' // 防抖效果
import { addListener, removeListener } from 'resize-detector' // 监听图表resize改变

export default {
  data() {
    return {
      chinaMap: null,
    }
  },
  created() {
    this.resize = debounce(this.resize, 200)
  },
  beforeDestroy() {
    this.chinaMap.dispose()
    this.chinaMap = null
    removeListener(this.$refs.chinaMapDom, this.resize)
  },
  mounted() {
    this.renderEchart()
    addListener(this.$refs.chinaMapDom, this.resize)
  },
  methods: {
    renderEchart() {
      this.chinaMap = this.Echarts.init(this.$refs.chinaMapDom)
      
      const option = { // 指定图表的配置项和数据
        tooltip:{
          show: true,
          formatter: function(params) {
            if (params.data) {
              return params.name + '<br/>人数：' + params.data.value[0] + '<br/>设备：' + params.data.value[1]
            }
          }
        },
        backgroundColor: '#272D3A',
        // visualMap: {
        //   type:'continuous',
        //   orient: 'horizontal', // 控制条横向
        //   bottom:20,
        //   min: 0,
        //   max: 10000,
        //   inRange: {
        //     color: ['#ffd200','#ff0000']
        //   },
        //   text: ['高', '低'],
        //   calculable: false, // 是否显示拖把
        // },
        series: [
          {
            type: 'map',
            mapType: 'china', // 指定地图类型
            label: {
              normal: {
                show: true,
                // color: '#fff'
              },
              emphasis: {
                show: true,
                color: '#fff'
              }
            },
            aspectScale: 0.9,
            zoom: 1.1,
            itemStyle: { // 区域颜色
              areaColor:'#465471',
              borderColor: '#282F3C',
            },
            emphasis: { // 鼠标聚焦时区域颜色
              itemStyle:{
                areaColor: '#8796B4',
              }
            },
            data:[{
              name: '安徽',
              value: [1000, 5000]
            }], 
          }
        ],
      }

      this.chinaMap.setOption(option)
      const that = this
      this.chinaMap.on('click', function(param) {
        console.log(param)
        that.$message.success(param.name)
      })
    },
    resize() {
      this.chinaMap.resize()
    }
  },
}
</script>

<style lang="scss">
.china-map {
  width: 100%;
  height: 600px;
}
</style>
