<template>
  <v-chart class="chart-line" :options="options" autoresize style="width: 100%; height: 300px; background: #0C4F8F;" />
</template>

<script>
export default {
  data() {
    const yAxisData = ['1月', '2月', '3月', '4月', '5月', '6月']
    const seriesData = [100, 307, 246, 503, 240, 340]
    return {
      options: {
        color: '#00FFC3',
        grid: {
          top: '20%',
          left: '15%',
          right: '10%',
          bottom: '12%'
        },
        legend: {
          selectedMode: false, // 图例 是否可点击
          itemWidth: 20, // 横线的长度
          itemHeight: 10, // 横线的高度
          top: 10, // top | left | right | bottom
          align: 'left', // 线 和 字 的位置，可选 left | right
          itemGap: 10,
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          // 默认不显示，可以在 legend 文字很多的时候对文字做裁剪并且开启 tooltip
          // formatter: function(name) { // 自定义 legend
          //   return '数据总量';
          // },
          tooltip: { // 显示 series.name
            show: false
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow', // 可选值 line | shadow 默认 line
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
              <span style="display: inline-block; width: 8px; height: 8px; background: #00FFC3; border-radius: 50%;"></span>
              预警数量：${val[0].value}`;
          }
        },
        xAxis: {
          type: 'value',
          name: '(个)',
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
            fontSize: 12,
            color: '#fff',
          },
          axisTick: {
            show: false, // 是否显示 刻度
            inside: false, // 刻度内外，默认 false - 外
          }
        },
        yAxis: {
          type: 'category',
          data: yAxisData,
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
          },
          axisTick: {
            show: false, // 是否显示 刻度
            inside: false, // 刻度内外，默认 false - 外
          },
        },
        series: [
          {
            data: seriesData,
            name: '风险预警',
            type: 'bar',
            barMinWidth: '20%',
            barMaxWidth: '40%',
            label: {
              show: true,
              position: 'right',
              color: '#00FFC3'
            },
            itemStyle: { // 区域颜色 - 渐变
              normal: {
                barBorderRadius: [0, 20, 20, 0], // 上右下左
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 1,
                      color: '#00FFC3' // top 处的颜色
                    },
                    {
                      offset: 0,
                      color: '#18B6E4' // bottom 处的颜色
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
