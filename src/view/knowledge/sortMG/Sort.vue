<template>
  <div class="sort-page">
    <el-alert title="冒泡排序：重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。" type="success" :closable="false" />
    <img src="./images/sort-maopao.gif" alt="" />
    <el-alert class="MT20" title="选择排序：选择排序是从数组的开头开始，将第一个元素和其他元素作比较，检查完所有的元素后，最小的放在第一个位置，接下来再开始从第二个元素开始，重复以上一直到最后。" type="success" :closable="false" />
    <img src="./images/sort-xuanze.gif" alt="" />
    <el-alert class="MT20" title="插入排序：通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用in-place排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。" type="success" :closable="false" />
    <img src="./images/sort-charu.gif" alt="" />
    <pre v-highlightjs="charuCode"><code class="js"></code></pre>
    <el-alert title="快速排序：快排是处理大数据最快的排序算法之一。通过递归的方式将数据依次分解为包含较小元素和较大元素的不同子序列。该算法不断重复这个步骤直至所有数据都是有序的。" type="success" :closable="false" />
    <img src="./images/sort-kuaisu.gif" alt="" />
    <pre v-highlightjs="kuaisuCode"><code class="js"></code></pre>
  </div>
</template>

<script>
import charuCode from '!!raw-loader!./js/charu.js'
import kuaisuCode from '!!raw-loader!./js/kuaisu.js'

export default {
  data() {
    return {
      charuCode,
      kuaisuCode
    }
  },
}
</script>

<style lang="scss" scoped>
.sort-page {
  img {
    height: 260px;
  }
}
</style>
