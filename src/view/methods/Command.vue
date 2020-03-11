<template>
  <div>
    <el-button type="primary" @click="show = !show">{{show ? '销毁' : '挂载'}}</el-button>
    <el-button v-if="show" v-append-text="`hello ${number}`" @click="number++">
      点我
    </el-button>
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
  data() {
    return {
      number: 1,
      show: true
    }
  }
}
</script>