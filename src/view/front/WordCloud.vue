<template>
  <div class="word-cloud">
    <el-button class="FR" type="primary" size="mini" @click="elemKey = Date.now()">刷新词云</el-button>
    <wordcloud
      :key="elemKey"
      :data="defaultWords"
      nameKey="name"
      valueKey="value"
      :color="myColors"
      :rotate="{from: -10, to: 10, numOfOrientation: 5 }"
      :showTooltip="false"
      :wordClick="wordClickHandler"
    />
    <el-alert title="手风琴" type="success" :closable="false" />
    <FengQin />
  </div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
// https://github.com/feifang/vue-wordcloud
import FengQin from './components/FengQin'

export default {
  data() {
    return {
      elemKey: 0,
      myColors: ['#11a983', '#13c2c2', '#6959CD', '#1270C9'],
      defaultWords: [
        { 'name': 'Cat', 'value': 26 },
        { 'name': 'fish', 'value': 19 },
        { 'name': 'things', 'value': 18 },
        { 'name': 'look', 'value': 16 },
        { 'name': 'two', 'value': 15 },
        { 'name': 'fun', 'value': 9 },
        { 'name': 'know', 'value': 9 },
        { 'name': 'good', 'value': 9 },
        { 'name': 'play', 'value': 6 }
      ],
    }
  },
  methods: {
    wordClickHandler(name, value, vm) {
      console.log(name, value, vm);
    }
  },
  components: {
    wordcloud,
    FengQin
  },
}
</script>

<style lang="scss">
div.tooltip {
  display: none;
}
</style>
