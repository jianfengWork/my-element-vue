<template>
  <div class="my-command">
    <el-button type="primary" @click="show = !show">{{show ? '销毁' : '挂载'}}</el-button>
    <el-button v-if="show" v-append-text="`hello ${number}`" @click="number++">
      点我
    </el-button>
    <!-- computed -->
    <el-alert title="computed" type="success" :closable="false" class="MT20" />
    <div class="computed">
      <div class="MT20">
        <span>firstname：</span>
        <el-input v-model.trim="firstname" />
      </div>
      <div class="MT20">
        <span>lastname：</span>
        <el-input v-model.trim="lastname" />
      </div>
      <div class="MT20">
        <span>familyname：</span>
        <el-input v-model.trim="familyname" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  directives: {
    appendText: { // 指令名称
      bind() {
        // console.log('bind')
      },
      inserted(el, binding) {
        el.appendChild(document.createTextNode(binding.value))
        // console.log('inserted', el, binding)
      },
      update() {
        // console.log('update')
      },
      componentUpdated(el, binding) {
        el.removeChild(el.childNodes[el.childNodes.length - 1])
        el.appendChild(document.createTextNode(binding.value))
        // console.log('componentUpdated')
      },
      unbind() {
        // console.log('unbind')
      }
    }
  },
  computed: {
    familyname: { // 需要 {{familyname}} 触发
      get() {
        return this.firstname + this.lastname
      },
      set(val) { // 设置 v-model 触发
        console.log(val)
        this.firstname = val[0] || ''
        this.lastname = val.substring(1) || ''
      },
    },
  },
  data() {
    return {
      number: 1,
      show: true,
      firstname: '建',
      lastname: '峰',
    }
  }
}
</script>

<style lang="scss">
.my-command {
  .el-input {
    width: 300px;
  }
  .computed {
    span {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
