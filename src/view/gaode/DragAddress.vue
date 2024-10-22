<template>
  <div class="amap-address">
    <div id="gd-address"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

let AMapInstance = null
export default {
  data() {
    return {}
  },
  mounted() {
    this.initAMap()
  },
  beforeDestroy() {
    AMapInstance && AMapInstance.destroy()
  },
  methods: {
    initAMap() {
      AMapLoader.load({
        key: '',
        version: '2.0',
        plugins: [],
        AMapUI: {
          version: '1.1',
          plugins: []
        }
      }).then(AMap => {

        window.AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
          AMapInstance = new AMap.Map('gd-address', {
            zoom: 16,
            scrollWheel: false, // 关闭缩放
            center: [120.024359, 30.289183]
          })

          // 创建地图拖拽
          let positionPicker = new PositionPicker({
            mode: 'dragMap',
            map: AMapInstance
          })
          positionPicker.on('success', positionResult => {
            this.$message({
              dangerouslyUseHTMLString: true,
              message: `<div>${positionResult.address}</div><div>${positionResult.position.lng},${positionResult.position.lat}</div>`
            })
            console.log('positionResult', positionResult)
          })
          // 启动拖放
          positionPicker.start()
        })
        

      }).catch(e => {
        console.log(e)
      })
    },
  }
}
</script>

<style lang="scss">
.amap-address {
  width: 100%;
  height: 100%;
  position: relative;
  #gd-address {
    width: 100%;
    height: 100%;
  }
}
</style>
