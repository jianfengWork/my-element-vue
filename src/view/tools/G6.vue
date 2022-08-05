<template>
  <div class="g6-page">
    <el-alert title="G6 节点" type="success" :closable="false" />
    <G6Node />
    <el-alert class="MT20" title="G6 紧凑树 流程图" type="success" :closable="false" />
    <G6Tree />
    <el-alert class="MT20" title="G6 缩进树 流程图" type="success" :closable="false" />
    <G6Tree2 />
  </div>
</template>

<script>
import G6Node from './g6Components/G6Node'
import G6Tree from './g6Components/G6Tree'
import G6Tree2 from './g6Components/G6Tree2'

export default {
  components: {
    G6Node,
    G6Tree,
    G6Tree2
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>

</style>
