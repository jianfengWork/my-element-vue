<template>
  <div class="axios">
    <el-alert title="axios" type="success" :closable="false" />
    <el-tag class="axios_tag" v-for="item in list" :key="item">{{item}}</el-tag>
  </div>
</template>

<script>
import {getAxios} from './js/use-axios'
export default {
  name: 'Axios',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    // getAxios()
    this.getRatings()
  },
  methods: {
    getRatings() {
      this.$fetch('/api/ratings', {}).then(res => {
        this.list = res.data
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.axios_tag {
  margin: 20px;
}
</style>
