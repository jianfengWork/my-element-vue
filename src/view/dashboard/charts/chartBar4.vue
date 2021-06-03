<template>
  <v-chart class="chart-line" :options="options" autoresize style="width: 100%; height: 300px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);" />
</template>

<script>
export default {
  data() {
    const xAxisData = ['杭州', '金华', '绍兴', '宁波', '台州']
    const seriesData1 = [399, 190, 131, 127, 126]
    const seriesData2 = [299, 290, 91, 190, 50]
    return {
      options: {
        color: ['#FAC859', '#2382F8'],
        grid: {
          top: '18%',
          left: '8%',
          right: '5%',
          bottom: '10%'
        },
        graphic: [{
          type: 'group',
          bounding: 'raw',
          left: 50,
          bottom: 15,
          z: 100,
          children: [
            {
              type: 'rect',
              left: 'center', // 根据父元素进行定位
              top: 'center',
              z: 100,
              shape: {
                width: 100,
                height: 30
              },
              style: {
                fill: 'rgba(0, 0, 0, 0.3)'
              }
            },
            {
              type: 'text',
              left: 'center',
              top: 'center',
              z: 100,
              style: {
                fill: '#fff',
                text: '水印',
                font: 'bolder 14px Microsoft YaHei'
              },
            }
          ]
        }],
        legend: {
          show: true,
          top: 10,
        },
        toolbox: {
          top: 10,
          right: 30,
          feature: {
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          borderColor: '#ddd',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#E3E9EE'
            }
          },
          axisLabel: {
            fontSize: 14,
            color: '#707070',
          },
        },
        yAxis: {
          type: 'value',
          name: '(个)',
          max: 500,
          splitLine: { // 网格线
            show: true,
            lineStyle: {
              color: '#E3E9EE'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 14,
              color: '#707070'
            }
          },
        },
        series: [
          {
            data: seriesData1,
            name: '蒸发量',
            type: 'bar',
            barMinWidth: '10%',
            barMaxWidth: '30%',
            label: {
              show: true,
              position: 'top',
              color: '#707070',
              fontWeight: '500',
            }
          },
          {
            name: '降水量',
            type: 'line',
            data: seriesData2,
            label: {
              show: true,
              position: 'top',
              color: '#707070',
              fontWeight: '500',
            }
          },
        ]
      },
    }
  }
}
</script>

<style lang="scss">

</style>
