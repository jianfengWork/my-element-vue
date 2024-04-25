<template>
  <div class="amap-district">
    <div id="gd-district"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

let AMapInstance = null
export default {
  data() {
    return {
      districtCity: ['杭州市', 330100],
    }
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
        plugins: ['AMap.DistrictSearch'],
        AMapUI: {
          version: '1.1',
          plugins: []
        }
      }).then(AMap => {
        
        var district = new AMap.DistrictSearch({
          subdistrict: 1, // 返回下一级行政区
          extensions: 'all', // 返回行政区边界坐标点
        })
        district.search(this.districtCity[0], (status, result) => {
          var bounds = result.districtList[0].boundaries
          // console.log(result)
          var mask = []
          for (let i = 0, leni = bounds.length; i < leni; i++) {
            mask.push([bounds[i]])
          }
          AMapInstance = new AMap.Map('gd-district', {
            mask: mask, // 隐藏边界外区域
            center: [120.024359, 30.289183],
            disableSocket: true,
            labelzIndex: 130,
            pitch: 20,
            zoom: 10,
            // showLabel: false, 展示地图标注
            resizeEnable: true,
            showIndoorMap: false,
            mapStyle: 'amap://styles/55b6a3eb5cecf678ba2a35dee257dde2', // 自定义地图样式
          })
          // 渲染边界
          this.initBounds()
          // 渲染Marker
          this.setMarker()

        })

      }).catch(e => {
        console.log(e)
      })
    },
    setMarker() {
      const list = [
        { position: [119.916606,30.338657],  image: require('./icon/people.png'), name: '余杭区'},
        { position: [119.533859,30.323338],  image: require('./icon/zb.png'), name: '富阳区'},
      ]
      for (let i = 0, leni = list.length; i < leni; i++) {

        const marker = new AMap.Marker({
          position: list[i].position,
          label: {
            direction: 'top',
            offset: new AMap.Pixel(0, -10),  // 设置文本标注偏移量
            content: `<div class="mark-info">案件总数：${10}</div>`, 
          },
          icon: new AMap.Icon({
            size: new AMap.Size(20, 20), // 图标尺寸
            image: list[i].image,
            imageSize: new AMap.Size(20, 20) // 图标尺寸
          }),
        })
        AMapInstance.add(marker)
        marker.setExtData({name: list[i].name})
        var count = 0
        marker.on('click', () => {
          if (count == 0) {
            const pos = marker.getPosition()
            AMapInstance.setCenter(pos)
            AMapInstance.setZoom(12)
            this.$message.info(marker.getExtData().name)
            count = 1
          } else {
            AMapInstance.setFitView()
            count = 0
          }
          
        })

      }
    },
    initBounds() {
      AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], (DistrictExplorer, $) => {
        var districtExplorer = new DistrictExplorer({
          map: AMapInstance, // 关联的地图实例
          eventSupport: true,
        })
        let adcode = this.districtCity[1] // 区划编码
        districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
          if (error) {
            console.error(error);
            return;
          }
          
          this.renderAreaNode(districtExplorer, areaNode)
        })
        
        var $tipMarkerContent = $('<div class="tipMarker top"></div>')
        var tipMarker = new AMap.Marker({
          content: $tipMarkerContent.get(0),
          offset: new AMap.Pixel(0, 0),
          bubble: true,
        })
        districtExplorer.on('featureMousemove', function (e, feature) {
          // 更新提示位置
          tipMarker.setPosition(e.originalEvent.lnglat)
        })
        districtExplorer.on('featureMouseout featureMouseover', (e, feature) => {
          console.log('featureMouseout featureMouseover')
          this.toggleHoverFeature(
            districtExplorer,
            $tipMarkerContent,
            tipMarker,
            feature,
            e.type === 'featureMouseover',
            e.originalEvent ? e.originalEvent.lnglat : null,
          )
        })
      })
    },
    // 绘制载入的区划节点
    renderAreaNode(districtExplorer, areaNode) {
      // 清除已有的绘制内容
      districtExplorer.clearFeaturePolygons()
      // 绘制子级区划
      districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
        return {
          cursor: 'default',
          bubble: true,
          strokeColor: 'rgb(185, 188, 210)', // 线颜色
          strokeOpacity: 1, // 线透明度
          strokeWeight: 2, // 线宽
          fillColor: '#fff', // 填充色
          fillOpacity: 0.5, // 填充透明度
        }
      })

      // 绘制父级区划，仅用黑色描边
      districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: true,
        strokeColor: 'rgb(185, 188, 210)', // 线颜色
        fillColor: null,
        strokeWeight: 2, // 线宽
      })
      // 更新地图视野以适合区划面
      AMapInstance.setFitView(districtExplorer.getAllFeaturePolygons())
    },
    // 高亮鼠标移入区域
    toggleHoverFeature(
      districtExplorer,
      $tipMarkerContent,
      tipMarker,
      feature,
      isHover,
      position,
    ) {
      tipMarker.setMap(isHover ? AMapInstance: null);
      if (!feature) {
        return
      }
      let props = feature.properties
      if (isHover) {
        // 更新提示内容，显示区域label
        // $tipMarkerContent.html(props.name)
        // 更新位置
        tipMarker.setPosition(position || props.center)
      }
      // 更新相关多边形的样式
      let polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode)
      for (let i = 0, len = polys.length; i < len; i++) {
        polys[i].setOptions({
          fillOpacity: isHover ? 0.7 : 0.5,
          fillColor: isHover ? 'rgb(232,240,255)' : '#fff',
        })
      }
    },
  }
}
</script>

<style lang="scss">
.amap-district {
  width: 100%;
  height: 100%;
  #gd-district {
    width: 100%;
    height: 100%;
    background: transparent !important;
  }
  .amap-marker-label {
    border: 1px solid  #fff;
    border-radius: 8px;
    background-color: #fff;
  }
  .mark-info {
    color: #8675FF;
    font-size: 12px;
    padding: 4px;
    text-align: center;
    &::before {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      border-style: solid;
      border-width: 10px 10px 0;
      border-color: #fff transparent transparent transparent;
    }
  }
}
</style>
