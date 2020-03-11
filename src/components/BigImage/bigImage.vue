<template>
  <el-dialog
    width="800px"
    title="图片预览"
    :append-to-body="true"
    :visible.sync="imageVisible"
    :before-close="() => imageVisible = false">
    <div class="image-cont">
      <el-image class="big-image" :src="imgUrl" fit="contain" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      imageVisible: false,
      imgUrl: '',
    }
  },
  methods: {
    openBigImage(item) {
      this.imageVisible = true
      this.imgUrl = item
    }
  },
}
</script>

<style lang="scss">
.image-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  .big-image {
    height: 500px;
  }
}
</style>
