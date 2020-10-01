<template>
  <div class="my-transition">
    <el-alert title="transition" type="success" :closable="false" />
    <div>
      <el-button type="primary" @click="single = !single">单个 vue2-animate</el-button>
      <transition name="fadeUp">
        <div class="animate-single" :style="{'background': themeColor}" v-if="single">single</div>
      </transition>
    </div>
    <el-alert title="transition-group" type="success" :closable="false" class="MT20" />
    <el-button type="primary" @click="arr.push(Math.random())">添加 transition</el-button>
    <transition-group name="fadeLeft" tag="ul" class="transition-list">
      <!-- 以 item 为 key，使动画作用在该元素上 -->
      <li v-for="(item, $index) in arr" :key="item">
        <span :style="{'background': themeColor}">{{item}}</span>
        <el-button type="danger" @click="del($index)">删除</el-button>
      </li>
    </transition-group>
  </div>
</template>

<script>
// https://github.com/asika32764/vue2-animate
import { mapState } from 'vuex';
export default {
  data() {
    return {
      single: true,
      arr: [1, 2, 3,]
    }
  },
  computed: {
    ...mapState(['themeColor']),
  },
  methods: {
    del(index){
      this.arr.splice(index, 1);
    }
  },
}
</script>

<style lang="scss" scoped>
.my-transition {
  .animate-single {
    width: 50px;
    height: 50px;
    margin-top: 20px;
    color: #fff;
    line-height: 50px;
    text-align: center;
  }
  .transition-list {
    li {
      span {
        color: #fff;
        border-radius: 4px;
        display: inline-block;
        width: 200px;
        line-height: 36px;
        margin-right: 20px;
        margin-top: 20px;
        text-align: center;
      }
    }
  }
}
</style>
