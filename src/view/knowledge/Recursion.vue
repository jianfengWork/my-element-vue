<template>
  <div class="recursion-page">
    <el-alert title="传统递归：普通递归时，内存需要记录调用的堆栈所出的深度和位置信息。在最底层计算返回值，再根据记录的信息，跳回上一层级计算，然后再跳回更高一层，依次运行，直到最外层的调用函数。在cpu计算和内存会消耗很多，而且当深度过大时，会出现堆栈溢出。" type="success" :closable="false" />
    <pre v-highlightjs="`
      function sum(n) {
        if (n === 1) return 1;
        return n + sum(n - 1);
      }

      // sum(5)
      // (5 + sum(4))
      // (5 + (4 + sum(3)))
      // (5 + (4 + (3 + sum(2))))
      // (5 + (4 + (3 + (2 + sum(1)))))
      // (5 + (4 + (3 + (2 + 1))))
      // (5 + (4 + (3 + 3)))
      // (5 + (4 + 6))
      // (5 + 10)
      // 15
    `"><code class="js"></code></pre>
    <el-alert title="尾递归：整个计算过程是线性的，调用一次sum(x, total)后，会进入下一个栈，相关的数据信息和跟随进入，不再放在堆栈上保存。当计算完最后的值之后，直接返回到最上层的sum(5,0)。这能有效的防止堆栈溢出。" type="success" :closable="false" />
    <pre v-highlightjs="`
      function sum(x, total) {
        if (x === 1) {
          return x + total;
        }
        return sum(x - 1, x + total);
      }

      // sum(5, 0)
      // sum(4, 5)
      // sum(3, 9)
      // sum(2, 12)
      // sum(1, 14)
      // 15
    `"><code class="js"></code></pre>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>

</style>
