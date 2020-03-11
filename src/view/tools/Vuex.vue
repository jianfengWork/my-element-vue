<template>
  <div>
    <el-button type="primary" @click="$store.commit('ADD_COUNT', 1)">commit</el-button>
    <el-button type="primary" @click="$store.dispatch('addCount', 1)">dispatch</el-button>
    <el-button>{{count}}</el-button>
    <el-button>getters: {{$store.getters.boubleCount}}</el-button>
    <el-button type="primary" @click="$store.commit('setName')">modules</el-button>
    <el-button>{{uesrname}}</el-button>
  </div>
</template>
<script>
import {changeStore} from './js/use-store'
export default {
  name: 'Vuex',
  mounted() {
    // changeStore()
  },
  computed: {
    count() {
      return this.$store.state.count
    },
    uesrname() {
      return this.$store.state.user.username
    }
  }
}
</script>
