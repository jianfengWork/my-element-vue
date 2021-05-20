<template>
  <v-chart class="chart-line" :options="options" autoresize style="width: 100%; height: 300px; background: #0C4F8F;" />
</template>

<script>
export default {
  data() {
    const xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月']
    const seriesData1 = [0, 307, 246, 503, 240, 300, 250, 500, 300]
    const seriesData2 = [100, 207, 146, 303, 450, 300, 370, 380, 500]
    return {
      options: {
        color: '#fff', // 圆点的颜色
        grid: {
          top: '20%',
          left: '18%',
          right: '10%',
          bottom: '12%'
        },
        legend: {
          itemWidth: 20, // 横线的长度
          itemHeight: 8, // 横线的高度
          top: 10, // top | left | right | bottom
          align: 'left', // 线 和 字 的位置，可选 left | right
          itemGap: 10,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
        },
        tooltip: {
          trigger: 'axis', // item | axis 是由轴线触发，还是点触发
          axisPointer: {
            type: 'line', // 可选值 line | shadow 默认 line
          },
          // backgroundColor: '', // 背景色
          borderColor: '#ddd',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          formatter: val => {
            const date = new Date()
            const year = date.getFullYear() + '年'
            return `${year + val[0].name}份<br />
              <span style="display: inline-block; width: 8px; height: 8px; background: #CD99FD; border-radius: 50%;"></span>
              数据量：${val[0].value}<br />
              <span style="display: inline-block; width: 8px; height: 8px; background: #13C2C2; border-radius: 50%;"></span>
              成本量：${val[1].value}`;
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, // true 原点标记在中间位置
          data: xAxisData,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            fontSize: 12,
            color: '#fff',
          }
        },
        yAxis: {
          type: 'value',
          name: '(兆)',
          splitLine: { // 网格线
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          }
        },
        series: [
          {
            data: seriesData1,
            type: 'line',
            name: '数据总量',
            symbol: 'circle',
            smooth: true, // 曲线
            itemStyle: { // 图例颜色
              color: '#CD99FD',
            },
            lineStyle: {
              normal: {
                color: '#CD99FD',
                width: 1
              }
            },
            tooltip: {
              show: true
            },
            areaStyle: { // 区域颜色 - 渐变
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0, // 100% 处的颜色
                      color: 'rgba(205, 153, 253, 0.8)'
                    },
                    {
                      offset: 1, // 0% 处的颜色
                      color: 'rgba(205, 153, 253, 0.1)'
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          },
          {
            data: seriesData2,
            type: 'line',
            name: '成本总量',
            smooth: true, // 曲线
            symbol: 'circle',
            itemStyle: { // 默认从全局调色盘 option.color 获取颜色
              color: '#13C2C2',
            },
            lineStyle: {
              normal: {
                color: '#13C2C2',
                width: 1
              }
            },
            tooltip: {
              show: true
            },
            areaStyle: { // 区域颜色 - 渐变
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0, // 100% 处的颜色
                      color: 'rgba(19, 194, 194, 0.8)'
                    },
                    {
                      offset: 1, // 0% 处的颜色
                      color: 'rgba(19, 194, 194, 0.1)'
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            }
          }
        ]
      },
    }
  }
}
</script>

<style lang="scss">

</style>
