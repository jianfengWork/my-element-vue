<template>
  <v-chart class="chart-line" :options="options" autoresize style="width: 100%; height: 300px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);" />
</template>

<script>
export default {
  data() {
    const seriesData1 = [
      { name: '国抽', value: 4000 },
      { name: '省抽', value: 3473 },
    ]
    const seriesData2 = [
      { name: '国抽合格', value: 3000 },
      { name: '国抽不合格', value: 100 },
      { name: '省抽合格', value: 3170 },
      { name: '省抽不合格', value: 303 },
    ]
    return {
      options: {
        color: ['#FAC859', '#25E881', '#546FC6', '#F4395D', '#EE7423', '#2CABD5',],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        legend: {
          top: '10',
          data: ['国抽', '国抽合格', '国抽不合格', '省抽', '省抽合格', '省抽不合格',]
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            center: ['50%', '55%'],
            label: {
              position: 'inner',
              fontSize: 14,
            },
            labelLine: {
              show: false
            },
            data: seriesData1
          },
          {
            name: '',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['50%', '55%'],
            labelLine: {
              length: 10,
              length2: 20
            },
            label: {
              formatter: '{b|{b}：}{c|{c}批次}',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                b: {
                  color: '#707070',
                  fontSize: 14,
                  lineHeight: 30
                },
                c: {
                  color: '#333',
                  fontSize: 14,
                },
              }
            },
            data: seriesData2
          }
        ]
      },
    }
  }
}
</script>

<style lang="scss">

</style>
