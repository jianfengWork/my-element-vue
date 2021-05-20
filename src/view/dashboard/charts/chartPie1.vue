<template>
  <v-chart class="chart-line" :options="options" autoresize style="width: 100%; height: 300px; background: #0C4F8F;" />
</template>

<script>
export default {
  data() {
    const seriesData = [
      { name: '数据总量', value: 100 },
      { name: '成本总量', value: 80 },
      { name: '风险预警', value: 120 },
      { name: '原辅料', value: 50 },
    ]
    return {
      options: {
        color: ['#0aabef', '#0080ff', '#00ffc3', '#bf2cfe'],
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
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          borderColor: '#ddd',
          borderWidth: 1,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        series: [
          {
            name: '数据统计',
            type: 'pie',
            radius: '60%', // 控制大小
            center: ['40%', '50%'], // 控制位置
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            data: seriesData,
            label: {
              show: true,
              color: '#fff',
              fontSize: 12,
              width: 60,
              overflow: 'break',
              formatter: val => {
                return (
                  '{name|' + val.name + '}\n{value|' + val.value + '}{unit|种}'
                );
              },
              rich: {
                name: {
                  color: '#34ABFF'
                },
                value: {
                  color: '#fff'
                }
              },
              alignTo: 'labelLine'
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 20
              }
            },
            emphasis: { // 鼠标移入
              itemStyle: { // 加上了阴影部分
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
