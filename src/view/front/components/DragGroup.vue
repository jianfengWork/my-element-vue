<template>
  <div class="drag-group">
    <div class="group-list">
      <!-- disabled: true -->
      <draggable
        tag="ul"
        v-model="list1"
        v-bind="{
          animation: 200,
          group: 'list',
          handle: '.el-icon-rank',
          ghostClass: 'li-shadow'
        }"
        :move="allow"
        @end="dragEnd"
      >
        <li v-for="elem in list1" :key="elem.id">
          {{ elem.name }} {{ elem.id }}
          <i class="el-icon-rank" />
        </li>
      </draggable>
    </div>
    <div class="group-list">
      <draggable
        tag="ul"
        v-model="list2"
        v-bind="{
          animation: 200,
          group: 'list',
          ghostClass: 'li-shadow'
        }"
        :move="allow"
        @end="dragEnd"
      >
        <li v-for="elem in list2" :key="elem.id">
          {{ elem.name }} {{ elem.id }}
        </li>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: '文章一', id: 1 },
        { name: '文章二', id: 2 },
        { name: '文章三', id: 3 },
      ],
      list2: [
        { name: '文章四', id: 4 },
        { name: '文章五', id: 5 },
        { name: '文章六', id: 6 },
      ],
    }
  },
  methods: {
    dragEnd(evt) {
      // console.log('list1', this.list1)
      // console.log('list2', this.list2)
      // console.log(evt)
    },
    allow(evt) {
      if (evt.relatedContext.element.id == 2 || evt.draggedContext.element.id == 2) return false
      console.log('group-allow', evt)
    },
  }
}
</script>

<style lang="scss" scoped>
.drag-group {
  display: flex;
  height: 120px;
  .group-list {
    width: 200px;
    li {
      cursor: move;
      line-height: 30px;
    }
    .li-shadow {
      opacity: 0.5;
    }
  }
}
</style>
