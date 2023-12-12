<template>
  <div>
    <el-alert title="svg" type="success" :closable="false" />
    <svg-icon icon-class="wechat" />
    <el-alert title="icon" type="success" :closable="false" />
    <i class="icon-TeamRequest iconfont" />
    <el-alert title="数字" type="success" :closable="false" />
    <div style="font-family: 'DIN-Bold'; font-size: 30px;">abc123456789</div>
    <div style="font-size: 30px;">abc123456789</div>
    <el-alert title="英文" type="success" :closable="false" />
    <div style="font-family: 'Helvetica'; font-size: 30px;">abc123456789</div>
    <div style="font-size: 30px;">abc123456789</div>
  </div>
</template>

<script>
export default {
  name: 'Icon',
}
</script>

<style>

</style>
