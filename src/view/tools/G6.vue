<template>
  <div class="g6-page">
    <el-alert title="G6 流程图" type="success" :closable="false" />
    <G6Tree />
    <el-alert class="MT20" title="G6 流程图2" type="success" :closable="false" />
    <G6Tree2 />
  </div>
</template>

<script>
import G6Tree from './g6Components/G6Tree'
import G6Tree2 from './g6Components/G6Tree2'

export default {
  components: {
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
