<template>
  <div class="g6-page">
    <el-alert title="G6 流程图" type="success" :closable="false" />
    <G6Tree />
  </div>
</template>

<script>
import G6Tree from './g6Components/G6Tree'

export default {
  components: {
    G6Tree
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>

</style>
