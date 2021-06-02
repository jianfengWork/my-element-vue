<template>
  <v-chart class="chart-line" :options="options" autoresize style="width: 100%; height: 300px; background: #0C4F8F;" />
</template>

<script>
export default {
  data() {
    const xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
    const seriesData1 = [150, 307, 246, 503, 240, 300, 250, 500]
    const seriesData2 = [100, 207, 146, 303, 450, 300, 370, 380]
    return {
      options: {
        color: ['#00FFC3', '#18B6E4'], // 柱图颜色
        grid: {
          top: '20%',
          left: '18%',
          right: '10%',
          bottom: '12%'
        },
        legend: {
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
              预警数量：${val[0].value}<br />
              <span style="display: inline-block; width: 8px; height: 8px; background: #18B6E4; border-radius: 50%;"></span>
              原辅料：${val[1].value}`;
          }
        },
        xAxis: {
          type: 'category',
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
          },
        },
        yAxis: {
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
            show: true,
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          },
        },
        series: [
          {
            data: seriesData1,
            name: '风险预警',
            type: 'bar',
            barMinWidth: '20%',
            barMaxWidth: '40%',
            barGap: '30%', // 柱图间距
            label: {
              show: true,
              position: 'top'
            }
          },
          {
            data: seriesData2,
            name: '原辅料',
            type: 'bar', // line
            barMinWidth: '20%',
            barMaxWidth: '40%',
            barGap: '30%',
            label: {
              show: true,
              position: 'top'
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
