<template>
  <div class="my-count">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span class="cart-title">基础使用</span>
          </div>
          <count-up
            :start="0"
            :end="2020"
          />
        </el-card>
      </el-col>
      <!--  -->
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span class="cart-title">保留小数</span>
          </div>
          <count-up
            :start="0"
            :end="2020.0609"
            :decimals="2"
            decimal='.'
          />
        </el-card>
      </el-col>
      <!--  -->
      <el-col :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span class="cart-title">左右填充信息</span>
          </div>
          <count-up
            :start="0"
            :end="2020"
            prefix="¥"
            suffix="元"
          />
        </el-card>
      </el-col>
      <!--  -->
      <el-col style="margin-top: 20px" :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span class="cart-title">自定义样式</span>
          </div>
          <count-up
            :start="0"
            :end="2020"
            :decimals="2"
            prefix="$"
            :content-style="contentStyle"
          />
        </el-card>
      </el-col>
      <!--  -->
      <el-col style="margin-top: 20px" :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span class="cart-title">分组</span>
          </div>
          <count-up
            :start="0"
            :end="20200609"
            :usegroup="true"
          />
        </el-card>
      </el-col>
      <!--  -->
      <el-col style="margin-top: 20px" :span="8">
        <el-card shadow="hover">
          <div slot="header">
            <span class="cart-title">自定义单位(20200609)</span>
          </div>
          <div>
            <count-up
              :start="0"
              :end="20200609"
              :duration="0.1"
              :simplify="true"
              :unit="[[3, 'k+']]"
            />
          </div>
          <div>
            <count-up
              :start="0"
              :end="20200609"
              :simplify="true"
              :unit="[[5, '10w+']]"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentStyle: {
        fontSize: '24px',
        color: this.$store.state.themeColor
      },
    }
  },
}
</script>

<style lang="scss">

</style>
