<template>
  <div class="amap-geo">
    <div id="gd-geo"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import chinaData from './zhejiang.json'

let AMapInstance = null, infoWindow = null
export default {
  data() {
    return {
      markers: [],
      provincPolygonList: []
    }
  },
  async mounted() {
    await this.initMap()
    // 初始完地图后，开始绘制
    this.setUpPlotsFn(chinaData)
  },
  methods: {
    initMap() {
      return new Promise((resolve) => {
        AMapLoader.load({
          key: '',
          version: '2.0',
          plugins: [
            'AMap.GeoJSON' // 配置行政区查询服务
          ]
        }).then((AMap) => {
          AMapInstance = new AMap.Map('gd-geo', {
            center: [120.025359, 30.289183],
            zoom: 7
          })
          AMapInstance.on('complete', () => {
            resolve()
          })
        })
        .catch((e) => {
          console.log(e)
        })
      })
    },
    // 设置地块
    setUpPlotsFn(featuresObj) {
      const { features } = featuresObj
      features.forEach((item) => {
        this.addGeoJsonFn(item)
      })
      AMapInstance.add(this.provincPolygonList)
      AMapInstance.add(this.markers)
      // 地图自适应
      AMapInstance.setFitView()
    },
    // GeoJson数据进行解析
    addGeoJsonFn(feature) {
      const geoJSON = {
        type: 'FeatureCollection',
        features: [feature]
      }
      AMapInstance.plugin('AMap.Geocoder', () => {
        const polygon = new AMap.GeoJSON({
          geoJSON: geoJSON,
          getPolygon: function(geojson, lnglats) {
            // 将解析出来的面 进行绘制
            return new AMap.Polygon({
              path: lnglats,
              fillOpacity: 0.3,
              fillColor: '#80d8ff',
              strokeColor: '#08B2BD',
              strokeWeight: 1,
              map: AMapInstance
            })
          }
        })
        const { name, center } = feature.properties
        polygon.on('mouseover', (e) => {
          // 鼠标移入更改样式
          polygon.setOptions({
            fillOpacity: 0.7,
            fillColor: '#08B2BD'
          })
          const info = []
          info.push(
            `<div style="font-size: 12px; background-color: #fff;padding: 10px; border-radius: 10px;"><div style="font-weight: 700;">${name}</div>`
          )
          info.push(
            '<div style="display: flex; justify-content: space-between;align-items: center;padding: 5px 0;"><span style="color:#666;padding-right: 10px;">聚合资源总量</span> <span style="font-weight: 700;">100MW</span></div>'
          )
          info.push(
            '<div style="display: flex; justify-content: space-between;align-items: center;padding: 5px 0;"><span style="color:#666;">充电站</span> <span style="font-weight: 700;">100座</span></div>'
          )
          info.push(
            '<div style="display: flex;justify-content: space-between;align-items: center;padding: 5px 0;"><span style="color:#666;">换电站</span> <span style="font-weight: 700;">100座</span></div>'
          )
          info.push(
            '<div style="display: flex;justify-content: space-between;align-items: center;padding: 5px 0;"><span style="color:#666;">光伏</span> <span style="font-weight: 700;">100MW</span></div>'
          )
          info.push(
            '<div style="display: flex; justify-content: space-between;align-items: center;padding: 5px 0;"><span style="color:#666;">储能</span> <span style="font-weight: 700;">100MWH</span></div></div>'
          )
          infoWindow = new AMap.InfoWindow({
            isCustom: true, // 使用自定义窗体
            content: info.join(''),
            offset: new AMap.Pixel(0, -30)
          })
          // 获取点击的位置信息
          const lnglat = e.lnglat
          // 在点击的位置上显示信息窗体
          infoWindow.open(AMapInstance, lnglat)
        })

        polygon.on('mouseout', () => {
          // 鼠标移出恢复样式
          infoWindow.close()
          polygon.setOptions({
            fillOpacity: 0.5,
            fillColor: '#80d8ff'
          })
        })

        this.provincPolygonList.push(polygon)

        if (name) {
          this.addMarkerList(center, name)
        }
      })
    },
    addMarkerList(center, item) {
      const markersContent = []
      markersContent.push(`<div style="display: flex;align-items: center;font-size: 10px;border-radius: 5px;">`)
      markersContent.push(
        `<span style="color:#666;background-color: #fff;min-width: 40px;height: 20px;display: flex;align-items: center;justify-content:center">${item}</span>`
      )
      markersContent.push(
        `<span style="color:#fff;background-color: #3AD6C4;min-width: 40px;height: 20px;display: flex;align-items: center;justify-content:center">3213</span>`
      )
      markersContent.push(`</div>`)
      const marker = new AMap.Marker({
        position: center, // 标注点位置
        content: markersContent.join(''),
        map: AMapInstance, // 将标注点添加到地图上
      })
      this.markers.push(marker)
    },
    // 隐藏
    removeFn() {
      if (this.markers) {
        this.markers.forEach((item) => item.hide())
        this.provincPolygonList.forEach((item) => item.hide(item))
      }
    },
    // 隐藏
    showFn() {
      if (this.markers) {
        this.markers.forEach((item) => item.show())
        this.provincPolygonList.forEach((item) => item.show(item))
      }
    },
  }
}
</script>

<style lang="scss">
.amap-geo {
  width: 100%;
  height: 100%;
  #gd-geo {
    width: 100%;
    height: 100%;
    background: transparent !important;
  }
}
</style>
