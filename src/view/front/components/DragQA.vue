<template>
  <el-row class="drug-qa">
    <el-col :span="6">
      <!-- sort: false, 不可排序 -->
      <Draggable
        class="qa-main"
        :list="qaList"
        :sort="false"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneQA"
      >
        <li v-for="elem in qaList" :key="elem.type" class="qa-item">
          {{ elem.desc }} {{ elem.type }}
        </li>
      </Draggable>
    </el-col>
    <el-col :span="6">
      <Draggable
        class="comp-main"
        :list="compList"
        :animation="200"
        :group="{ name: 'people', pull: false, put: true }"
        @add="addQA"
      >
        <li v-for="(elem, $index) in compList" :key="$index" class="drag-item">
          <component :is="elem.type" />
        </li>
      </Draggable>
    </el-col>
  </el-row>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  data() {
    return {
      qaList: [
        { desc: '选择题', type: 'el-radio', data: {id: ''} },
        { desc: '简答题', type: 'el-input', data: {id: ''} },
        { desc: '多选题', type: 'el-checkbox', data: {id: ''} },
      ],
      compList: [
        { desc: '选择题', type: 'el-radio', data: {id: ''} },
      ],
    }
  },
  methods: {
    addQA(evt) {
      console.log('addQA', evt)
      console.log('comp list', this.compList)
    },
    cloneQA(data) {
      // console.log('clone data', data)
      return data
    },
  }
}
</script>

<style lang="scss" scoped>
.drug-qa {
  .comp-main {
    height: 200px;
    overflow: auto;
    border: 1px solid #041d46;
  }
}
</style>
