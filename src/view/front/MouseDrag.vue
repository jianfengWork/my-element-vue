<template>
  <div class="mouse-drag">
    <el-alert title="边界" type="success" :closable="false" />
    <MouseBound />
    <el-alert title="自由拖拽" type="success" :closable="false" />
    <MouseDrug />
  </div>
</template>

<script>
import MouseBound from './components/MouseBound'
import MouseDrug from './components/MouseDrug'

export default {
  components: {
    MouseBound,
    MouseDrug
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>

</style>
