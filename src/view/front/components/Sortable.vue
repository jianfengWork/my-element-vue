<template>
  <ul class="sort-list">
    <li v-for="item in sortList" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script>
// https://github.com/SortableJS/Sortable
import Sortable from 'sortablejs'

export default {
  data() {
    return {
      sortList: [
        { name: 'item 1', id: 1 },
        { name: 'item 2', id: 2 },
        { name: 'item 3', id: 3 },
      ]
    }
  },
  mounted() {
    const el = document.querySelector('.sort-list')
    const that = this
    new Sortable(el, {
      animation: 150,
      ghostClass: 'li-shadow',
      onEnd(evt) {
        const val = that.sortList.splice(evt.oldIndex, 1)[0]
        that.sortList.splice(evt.newIndex, 0, val)
        console.log('sortList', that.sortList)
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.sort-list {
  li {
    cursor: move;
    line-height: 30px;
  }
  .li-shadow {
    opacity: 0.5;
    // background: #c8ebfb;
  }
}
</style>
