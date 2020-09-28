<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容并按下Enter" @keyup.enter.native="addList"></el-input>
    <xf-solt v-for="(item, $index) in list" :key="'slot' + $index" :item="item">
      <template v-slot:content="itemprops">
        <span class="text" :style="{'color': itemprops.checked ? '#00b8e6' : 'grey'}">{{item}}</span>
        <i @click="dels(item)">x</i>
      </template>
    </xf-solt>
  </div>
</template>
<script>
// v-slot:content="itemprops" 接收参数
// index作为key会导致删除状态异常
import xfSolt from './components/ScopeSolt'

export default {
  name: 'Solt',
  components: {
    xfSolt
  },
  data() {
    return {
      input: '',
      list: []
    }
  },
  methods: {
    addList() {
      if (this.input !== '')
      this.list.push(this.input)
      this.input = ''
    },
    dels(val) {
      this.list = this.list.filter(ele => {
        return ele !== val
      })
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  padding: 5px 0;
}
.text {
  padding: 0 20px;
}
</style>
<style>
.el-checkbox {
  margin: 0;
}
</style>
