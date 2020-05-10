<template>
  <div class="my-drag-list">
    <div>List</div>
    <draggable
      :list="dragList"
      v-bind="$attrs"
      @start="dragStart"
      @end="dragEnd"
      :set-data="setData"
    >
      <el-card v-for="elem in dragList" :key="elem.id" class="drag-item">
        {{ elem.name }} {{ elem.id }}
      </el-card>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  data() {
    return {
      dragList: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
      ]
    }
  },
  methods: {
    dragStart(evt) {
      // console.log(evt)
    },
    dragEnd(evt) {
      console.log(this.dragList)
      // console.log(evt)
    },
    setData(dataTransfer) { // to avoid Firefox bug
      dataTransfer.setData('Text', '')
    }
  },
  components: {
    draggable
  },
}
</script>

<style lang="scss" scoped>
.drag-item {
  width: 200px;
  margin-top: 20px;
}
</style>
