<template>
  <div class="my-clamp">
    <div class="clamp-main">
      <el-select v-model="lines" placeholder="多行文本截断">
        <el-option
          v-for="item in 5"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <v-clamp autoresize :max-lines="lines">{{ text }}</v-clamp>
    </div>
    <el-alert class="MT20" title="原生拖拽" type="success" :closable="false" />
    <NativeDrug />
  </div>
</template>

<script>
import VClamp from 'vue-clamp'
import NativeDrug from './components/NativeDrug'

export default {
  data() {
    return {
      lines: 3,
      text: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。',
    }
  },
  components: {
    VClamp,
    NativeDrug
  },
}
</script>

<style lang="scss">
.my-clamp {
  .clamp-main > div {
    width: 50%;
    padding-bottom: 20px;
  }
}
</style>
