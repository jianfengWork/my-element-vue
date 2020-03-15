<template>
  <div class="image">
    <el-row>
      <el-col :span="4" v-for="(item, $index) in srcList" :key="$index">
        <el-image :src="item" fit="contain" @click="showBigImage(item)" />
      </el-col>
    </el-row>
    <big-image ref="bigImageDom" />
    <!-- Sticker.js -->
    <el-alert title="Sticker.js" type="success" :closable="false" />
    <div class="sticker example-1" />
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
  mounted() {
    Sticker.init('.sticker')
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
  .sticker {
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
  .example-1 .sticker-img { // 必须是 .sticker-img
    background: url('../../assets/avatar.jpeg');
    background-size: 100% 100%;
  }
}
</style>
