<template>
  <div>
    <el-checkbox v-model="checked" @change="changeItem(item)"></el-checkbox>
    <slot name="content" v-bind="{checked}"></slot>
  </div>
</template>
<script>
// v-bind="{checked}" 对外传递作用域参数
export default {
  name: 'ScopeSolt',
  props: ['item'],
  data() {
    return {
      checked: false
    }
  },
  methods: {
    changeItem(item) {
      console.log(item)
    }
  }
}
</script>
