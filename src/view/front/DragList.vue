<template>
  <div class="my-drag-list">
    <el-alert title="draggable" type="success" :closable="false" />
    <draggable
      tag="ul"
      v-model="dragList"
      v-bind="dragOptions"
      :move="allow"
      @start="dragStart"
      @end="dragEnd"
      :set-data="setData"
    >
      <li v-for="elem in dragList" :key="elem.id" class="drag-item">
        {{ elem.name }} {{ elem.id }}
      </li>
    </draggable>
    <el-alert class="MT20" title="draggable-group" type="success" :closable="false" />
    <DragGroup />
    <el-alert class="MT20" title="draggable 题型" type="success" :closable="false" />
    <DragQA />
    <el-alert class="MT20" title="Sortable" type="success" :closable="false" />
    <Sortable />
    <el-alert class="MT20" title="导航动画" type="success" :closable="false" />
    <NavMove />
  </div>
</template>

<script>
// https://github.com/SortableJS/Vue.Draggable
import draggable from 'vuedraggable'
import NavMove from './components/NavMove'
import Sortable from './components/Sortable'
import DragGroup from './components/DragGroup'
import DragQA from './components/DragQA'

export default {
  data() {
    return {
      dragList: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
      ],
      dragOptions: {
        animation: 200,
        group: 'description',
        ghostClass: 'li-shadow'
      }
    }
  },
  methods: {
    dragStart(evt) {
      // console.log(evt)
    },
    allow(evt) {
      if (evt.relatedContext.element.id == 2 || evt.draggedContext.element.id == 2) return false
      console.log(evt)
    },
    dragEnd(evt) {
      console.log('dragList', this.dragList)
      // console.log(evt)
    },
    setData(dataTransfer) { // to avoid Firefox bug
      dataTransfer.setData('Text', '')
    }
  },
  components: {
    draggable,
    DragGroup,
    DragQA,
    NavMove,
    Sortable
  },
}
</script>

<style lang="scss" scoped>
.my-drag-list {
  .drag-item {
    cursor: move;
    line-height: 30px;
  }
  .li-shadow {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
