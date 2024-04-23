<template>
  <div class="amap-wrap">
    <div id="gd-weather"></div>
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
    window.amapData = this
  },
  beforeDestroy() {
    AMapInstance && AMapInstance.destroy()
  },
  methods: {
    initAMap() {
      AMapLoader.load({
        key: '',
        version: '2.0',
        plugins: ['AMap.Weather'],
      }).then(AMap => {
        AMapInstance = new AMap.Map('gd-weather', {
          zoom: 16,
          center: [120.024359, 30.289183]
        })

        // 创建一个 Marker 实例：
        const marker = new AMap.Marker({
          position: new AMap.LngLat(120.024359, 30.289183),
          content: '<img src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png">',
          offset: new AMap.Pixel(-13, -25) // 以 icon 的 [center bottom] 为原点
        })
        marker.setLabel({
          direction: 'right',
          offset: new AMap.Pixel(10, 0),  // 设置文本标注偏移量
          content: '<div class="info">贝达梦工厂</div>', // 设置文本标注内容
        })
        // 将创建的点标记添加到已有的地图实例
        AMapInstance.add(marker)

        // 异步加载 缩放工具条
        AMap.plugin('AMap.ToolBar',function(){ 
          var toolbar = new AMap.ToolBar()
          AMapInstance.addControl(toolbar);
        })
        // 异步加载 比例尺
        AMap.plugin('AMap.Scale',function(){ 
          var scale = new AMap.Scale()
          AMapInstance.addControl(scale);
        })

        // 实时天气。需要 securityJsCode
        var weather = new AMap.Weather()
        weather.getLive('余杭区', function(err, data) {
          if (!err) {
            var str = [];
            str.push('<h4 >实时天气' + '</h4><hr>');
            str.push(`<p class="weather-city" onclick="window.amapData.openCity('${data.city}')">城市/区：${data.city}</p>`);
            str.push('<p>天气：' + data.weather + '</p>');
            str.push('<p>温度：' + data.temperature + '℃</p>');
            str.push('<p>风向：' + data.windDirection + '</p>');
            str.push('<p>风力：' + data.windPower + ' 级</p>');
            str.push('<p>空气湿度：' + data.humidity + '</p>');
            str.push('<p>发布时间：' + data.reportTime + '</p>');
            var infoWindow = new AMap.InfoWindow({
              content: '<div class="weather-info" style="position:inherit;margin-bottom:0;">'+str.join('')+'</div><div class="weather-sharp"></div>',
              isCustom: true,
              offset: new AMap.Pixel(0, -30)
            });
            infoWindow.open(AMapInstance, marker.getPosition());
            /* marker.on('mouseover', function() {
              infoWindow.open(AMapInstance, marker.getPosition());
            })
            marker.on('mouseout', function() {
              infoWindow.close();
            }) */
          }
        })

      }).catch(e => {
        console.log(e)
      })
    },
    openCity(city) {
      this.$message.success(city)
    },
  }
}
</script>

<style lang="scss">
.amap-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  #gd-weather {
    width: 100%;
    height: 100%;
  }
  .amap-marker {
    img {
      width: 25px;
      height: 36px;
    }
  }
  .amap-marker-label{
    border: 0;
    background-color: #fff;
  }
  .weather-info {
    width: 300px;
    display: inline-block;
    padding: 10px;
    background: #fff;
  }
  .weather-sharp {
    height: 10px;
    width: 10px;
    background-color: white;
    transform: rotateZ(45deg);
    box-shadow: 2px 2px 3px rgba(114, 124, 245, .5);
    position: inherit;
    margin-left: 50%;
    margin-top: -6px;
  }
  .weather-city {
    color: #6959CD;
    cursor: pointer;
  }
}
</style>
