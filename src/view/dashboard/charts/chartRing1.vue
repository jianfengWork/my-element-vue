<template>
  <v-chart class="chart-line" :options="options" autoresize style="width: 100%; height: 300px; background: #0C4F8F;" />
</template>

<script>
export default {
  data() {
    const seriesData = [
      { value: 335, name: '浙江省' },
      { value: 310, name: '上海市' },
      { value: 234, name: '福建省' },
      { value: 135, name: '安徽省' },
      { value: 1548, name: '江苏省' },
      { value: 1000, name: '湖北省' },
    ]
    return {
      options: {
        color: ['#0aabef', '#0080ff', '#00ffc3', '#bf2cfe', '#FFC381', '#EBB4E9',],
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
            name: '商户数',
            type: 'pie',
            radius: ['60%', '80%'], // 调整 pie 渲染区域，需要同时按比例更改
            center: ['50%', '50%'], // 坐标 x y，饼图的圆心的位置，比如将 50% 调整为 30%，饼图就会往上移动容器高度的 20%
            avoidLabelOverlap: true, // 是否启用防止标签重叠策略
            data: seriesData,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
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
