<template>
  <div class="bmap-wrap">
    <div class="bmap-btn TC">
      <el-button type="primary" size="mini" @click="changeMap">切换数据{{active}}</el-button>
    </div>
    <div id="bmap"></div>
  </div>
</template>

<script>
import { mapData } from './bmapJson'

let map = null
export default {
  data() {
    return {
      active: 1,
      results: [],
    }
  },
  mounted() {
    window.BMap && this.renderMap()
    window.bigData = this
  },
  beforeDestroy() {
    map && map.removeEventListener('moveend')
    map && map.removeEventListener('zoomend')
  },
  methods: {
    renderMap() {
      map = new BMap.Map('bmap')
      let point = new BMap.Point(120.15, 30.28)
      this.results = mapData[this.active]
      point = new BMap.Point(this.results[0].lng, this.results[0].lat)
      map.centerAndZoom(point, 7)

      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      map.addControl(new BMap.NavigationControl())
      map.addControl(new BMap.OverviewMapControl())
      this.mapListener() // 监听地图窗口

      let points = []
      let markers = []
      for (let i = 0, leni = this.results.length; i < leni; i++) {

        let img, labelColor
        if (this.results[i].status == 0) {
          img = (require('./images/bule.png'))
          labelColor = '#198CFF'
        } else if (this.results[i].status == 1) {
          img = (require('./images/green.png'))
          labelColor = '#21C771'
        } else {
          img = require('./images/red.png')
          labelColor = '#D43714'
        }
        let pointer = new BMap.Point(this.results[i].lng, this.results[i].lat)
        points.push(pointer)
        // console.log('创建点：', points)
        let myIcon = new BMap.Icon(img, new BMap.Size(23, 25))
        markers.push(new BMap.Marker(pointer, { icon: myIcon }))
        // 创建标注
        let label = new BMap.Label(this.results[i].orgName, { 'offset': new BMap.Size(20, 0) })
        label.setStyle({
          border: '0px solid #FF6A00',
          padding: '5px',
          color: labelColor,
          backgroundColor: 'white',
          fontSize: '12px',
        })
        // 绘制到地图上
        markers[i].setLabel(label)
        map.addOverlay(markers[i])

        // 信息弹窗
        const { id, orgName, status } = this.results[i]
        let content = `
          <div>
            <div class="info-box" onclick="window.bigData.lookDetail('${id}', '${orgName}', '${status}')">${orgName}(详情查看)</div>
          </div>
        `
        const addClickHandler = function(content, marker) {
          marker.addEventListener('click', function(e) {
            window.bigData.openInfo(content, e)
          })
        }
        addClickHandler(content, markers[i])

      }
      // 地图zoom动态改变，动态获取地图中心点坐标
      let view = map.getViewport(points)
      let mapZoom = view.zoom
      let centerPoint = view.center
      map.centerAndZoom(centerPoint, mapZoom)
      
    },
    lookDetail(...args) {
      this.$message.info(args.join(' > '))
    },
    openInfo(content, e) {
      let p = e.target
      let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
      let infoWindow = new BMap.InfoWindow(content, {
        width: 200,
        height: 20,
        fontSize: 14,
        enableMessage: false
      })
      map.openInfoWindow(infoWindow, point) // 开启信息窗口
    },
    mapListener() {
      map.addEventListener('moveend', queryInRect)
      map.addEventListener('zoomend', queryInRect)
      function queryInRect() {
        // 地图改变后，获取中心点，获取方圆几公里数据
        let view = map.getViewport()
        // console.log(view)
      }
    },
    changeMap() {
      this.active++
      if (this.active > 2) this.active = 1
      this.renderMap()
    },
  }
}
</script>

<style lang="scss">
.bmap-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  #bmap {
    flex: 1;
    width: 100%;
  }
  .BMap_Marker {
    img {
      height: 100%;
    }
  }
  .info-box {
    padding: 10px 0;
    cursor: pointer;
  }
  // 隐藏logo
  .anchorBL {
    display: none;
  }
}
</style>
