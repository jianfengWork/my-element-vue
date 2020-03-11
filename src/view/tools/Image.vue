<template>
  <div class="image">
    <el-row>
      <el-col :span="4" v-for="(item, $index) in srcList" :key="$index">
        <el-image :src="item" fit="contain" @click="showBigImage(item)" />
      </el-col>
    </el-row>
    <big-image ref="bigImageDom" />
  </div>
</template>

<script>
import bigImage from '@/components/BigImage/bigImage'
export default {
  data() {
    return {
      srcList: [
        'https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_online_app/decoration/20200305/41c19f9ced472f70c172b64d508ab22d.png',
        'https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_online_app/decoration/20200311/1d88aae44831c2da0768c10571650512.gif',
        'https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_online_app/decoration/20200305/54134c96daf5b479c202bf0f0663a4e8.png',
        'https://mifbb-upload-image.oss-cn-hangzhou.aliyuncs.com/mifbb_online_app/decoration/20200305/75680054014060f575b477020725f7b7.png',
      ],
    }
  },
  methods: {
    showBigImage(item) {
      this.$refs.bigImageDom.openBigImage(item)
    },
  },
  components: {
    bigImage
  },
}
</script>

<style lang="scss">
.image {
  .el-image {
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
}
</style>
