<template>
  <div class="native-drug">
    <ul class="drug-cont">
      <li id="li1" draggable="true" :style="{'background': $store.state.themeColor}">拖拽内容1</li>
      <li id="li2" draggable="true" :style="{'background': $store.state.themeColor}">拖拽内容2</li>
      <li id="li3" draggable="true" :style="{'background': $store.state.themeColor}">拖拽内容3</li>
      <li id="li4" draggable="true" :style="{'background': $store.state.themeColor}">拖拽内容4</li>
    </ul>
    <ul class="drug-cont" id="ul2"></ul>
    <ul class="drug-cont"></ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    // 1.ondragstart: 源对象开始被拖动
    var obj = null // 拖放源对象
    document.ondragstart = function(event) {
      console.log('源对象开始被拖动', 'id:', event.target.id)
      obj = event.target
    }
    // 2.ondrag: 源对象被拖动过程中(鼠标可能在移动也可能未移动)
    document.ondrag = function(event) {
      // console.log('源对象被拖动过程中') // 不断的执行
    }
    // 3.ondragend: 源对象被拖动结束
    document.ondragend = function(event) {
      console.log('源对象被拖动结束')
    }

    // 1.ondragenter: 进入目标对象
    var ulDom = document.querySelector('#ul2') // ulDom 可替换为 document
    ulDom.ondragenter = function(event) {
      console.log('进入目标对象', event.target)
    }
    // 2.ondragover: 悬停在目标对象上方
    ulDom.ondragover = function(event) {
      console.log('悬停在目标对象上方') // 不断的执行
      // 如果想要触发 ondrop 事件 则需要在 over 里面阻止默认行为
      return false
    }
    // 3.ondragleave: 离开目标对象
    ulDom.ondragleave = function(event) {
      console.log('离开目标对象')
    }
    // 4.ondrop: 在目标对象上方释放/松手
    ulDom.ondrop = function(event) {
      console.log('上方释放/松手', 'obj.parentId:', obj.parentId)
      if (obj.parentId == ulDom.id || event.target.nodeName != 'UL') return false
      // 拖拽的时候，不用删除原来的 
      event.target.appendChild(obj)
      obj.parentId = ulDom.id
      // 或者直接使用 dom, 注释上面三行
      // ulDom.appendChild(obj)
    }

  },
}
</script>

<style lang="scss" scoped>
.native-drug {
  display: flex;
  .drug-cont {
    width: 200px;
    height: 200px;
    margin: 10px;
    li {
      color: #fff;
      line-height: 26px;
      text-align: center;
      border-bottom: 1px solid #fff;
    }
  }
  .drug-cont:nth-child(1) {
    border: 1px solid red;
  }
  .drug-cont:nth-child(2) {
    border: 1px solid green;
  }
  .drug-cont:nth-child(3) {
    border: 1px solid blue;
  }
}
</style>
