<template>
  <div class="amap-search">
    <div class="amap-btn">
      <el-input v-model.trim="value" size="small" placeholder="餐饮服务、酒店住宿" @keyup.enter.native="searchMap" />
      <el-button type="primary" size="small" @click="searchMap">搜索数据</el-button>
    </div>
    <div id="gd-search"></div>
    <div id="panel"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

let AMapInstance = null
const lnglat = [120.024359, 30.289183]
export default {
  data() {
    return {
      value: ''
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
        plugins: ['AMap.PlaceSearch', 'AMap.Walking'],
      }).then(AMap => {
        AMapInstance = new AMap.Map('gd-search', {
          zoom: 16,
          center: lnglat
        })
        
        // 当前位置
        const marker = new AMap.Marker({
          position: lnglat,
          icon: require('@/assets/logo.png'),
          offset: new AMap.Pixel(-13, -25)
        })
        AMapInstance.add(marker)

        // 步行导航
        var walking = new AMap.Walking({
          map: AMapInstance
        })

        const placeSearch = new AMap.PlaceSearch({
          type: this.value || '餐饮服务', // 兴趣点类别
          pageSize: 50, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: '0571', // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
          // map: AMapInstance, // 展现结果的地图实例
          panel: 'panel', // 结果列表将在此容器中进行展示，配合 map: AMapInstance 使用
          icon: false,
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        })
        var cpoint = lnglat // 中心点坐标
        // 200米
        placeSearch.searchNearBy('', cpoint, 200, (status, result) => {
          console.log(status, result)
          if (status === 'complete' && result.info === 'OK') {
            const { pois } = result.poiList
            pois.forEach((poi) => {
              // 创建一个 Marker 实例
              const marker = new AMap.Marker({
                position: poi.location,
                content: '<img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png">',
                offset: new AMap.Pixel(-13, -25)
              })
              AMapInstance.add(marker)

              const content = `
                <div class="search-info">
                  <h5>${poi.name}</h5><hr>
                  <ul>
                    <li>地址: ${poi.address}</li>
                    <li>类型: ${poi.type}</li>
                    <li>距您: ${poi.distance}米</li>
                  </ul>
                </div>
              `
              var infoWindow = new AMap.InfoWindow({
                content: content,
                isCustom: true,
                offset: new AMap.Pixel(0, -30)
              });
              marker.on('click', function() {
                infoWindow.open(AMapInstance, marker.getPosition())
                // 步行路径规划
                walking.clear()
                walking.search(lnglat, poi.location, function() {
                  setTimeout(() => {
                    AMapInstance.setZoom(19)
                  }, 0)
                })
                
              })
              // marker.on('mouseout', function() {
              //   infoWindow.close()
              // })

            })
          }
          // 设置缩放
          AMapInstance.setZoom(18)
        })

      }).catch(e => {
        console.log(e)
      })
    },
    searchMap() {
      AMapInstance && AMapInstance.clearMap()
      this.initAMap()
    },
  }
}
</script>

<style lang="scss">
.amap-search {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .amap-btn {
    display: flex;
    justify-content: center;
  }
  #gd-search {
    flex: 1;
    width: 100%;
  }
  .amap-marker {
    img {
      width: 25px;
      height: 36px;
    }
  }
  #panel {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 60px;
    right: 10px;
    width: 280px;
    height: 300px;
    border-bottom: solid 1px silver;
  }
  .search-info {
    width: 300px;
    display: inline-block;
    padding: 10px;
    background: #fff;
  }
}
</style>
