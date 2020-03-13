<template>
  <div class="my-goods">
    <div class="box">
      <!-- 商品 -->
      <ul class="box_top" :style="{'width': 130 * imgList.length + 'px'}">
        <li v-for="(item, $index) in imgList" :key="$index">
          <el-image :src="item" fit="contain" />
        </li>
      </ul>
      <!-- 底部 -->
      <div class="box_bottom">
        <span class="mask" :style="{'background': $store.state.themeColor}"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        'https://img.alicdn.com/imgextra/i3/1055530397/TB1kNMegyCYBuNkHFCcXXcHtVXa_!!0-item_pic.jpg',
        'http://img.alicdn.com/imgextra/i2/1666952063/O1CN01arfGwX1R6tec9bqqc_!!1666952063.jpg',
        'https://img.alicdn.com/imgextra/i1/67422402/O1CN01a3MIhV1Tc9syINiWE_!!67422402.jpg',
        'https://img.alicdn.com/imgextra/i1/752144829/O1CN01pnY8FJ1lXjBURgckl_!!752144829.jpg',
        'http://img.alicdn.com/imgextra/i3/2400758027/O1CN018pdN3W29APn9P5dDC_!!0-item_pic.jpg',
        'http://img.alicdn.com/imgextra/i3/2768808186/O1CN01bah6op2ALElA42tEC_!!2768808186.jpg',
        'https://img.alicdn.com/imgextra/i3/2794538083/O1CN01zsUX7U29a3whvdszb_!!2794538083.jpg',
        'https://img.alicdn.com/imgextra/i1/1591665776/O1CN01fUQDXz1sXSFh2Jshw_!!0-item_pic.jpg',
        'http://img.alicdn.com/imgextra/i2/2200554932955/O1CN01xUACBx1XhQwK1aAMj_!!2200554932955.jpg',
        'https://img.alicdn.com/imgextra/i3/2921409858/O1CN01K9PKjr2Mh0zn1RH49_!!2921409858.jpg',
        'https://img.alicdn.com/bao/uploaded/i2/2454077880/O1CN01tDOY092855aLznXUC_!!0-item_pic.jpg',
        'https://img.alicdn.com/bao/uploaded/i2/897258160/O1CN014F6oIZ2A9KU6uNrdU_!!0-item_pic.jpg',
        'https://img.alicdn.com/bao/uploaded/i1/877603842/O1CN0195Iucf1eFgGvkZCUJ_!!877603842-0-pixelsss.jpg',
        'https://img.alicdn.com/bao/uploaded/i1/2187138540/O1CN01orJyhF2CxMuLgsRd0_!!0-item_pic.jpg',
        'https://img.alicdn.com/bao/uploaded/i3/2793799007/O1CN010c9I532GPFw63cYpW_!!0-item_pic.jpg',
        'https://img.alicdn.com/bao/uploaded/i1/1652860755/O1CN01nQ2i971HRpcHLfsIb_!!1652860755-0-pixelsss.jpg',
        'https://img.alicdn.com/bao/uploaded/i4/2206573316203/O1CN01OEXdr01vh1NpRz03U_!!0-item_pic.jpg',
        'https://img.alicdn.com/bao/uploaded/i2/202224264/O1CN01B0qCyB1hMxPgK8ldi_!!0-item_pic.jpg',
        'https://img.alicdn.com/bao/uploaded/i1/2862609975/O1CN01L6XCMw2NYbEP9sURV_!!0-item_pic.jpg',
        'https://img.alicdn.com/bao/uploaded/i3/1633803546/O1CN01WCUi0T1c472NFhx9d_!!0-item_pic.jpg',
      ]
    }
  },
  mounted() {
    // 1. 获取需要的标签
    let box = document.querySelector('.box')
    let box_top = document.querySelector('.box_top')
    let box_bottom = document.querySelector('.box_bottom')
    let mask = box_bottom.children[0]

    // 2. 设置滚动条的长度
    // 滚动条长度 = ( 盒子的宽度 / 内容的宽度) * 盒子的宽度
    let mask_len = (box.offsetWidth / box_top.offsetWidth) * box.offsetWidth
    mask.style.width = mask_len + 'px'

    // 3. 鼠标操作
    box.onmousedown = function(event) {
      let e = event || window.event
      // 3.1 求出初始值
      let beginX = e.clientX - mask.offsetLeft
      // 3.2 移动
      document.onmousemove = function(event) {
        let e = event || window.event

        // 3.3 求出移动的距离
        let endX = event.clientX - beginX

        // 边界值
        if (endX < 0) {
            endX = 0
        } else if (endX >= box.offsetWidth - mask.offsetWidth) {
          endX = box.offsetWidth - mask.offsetWidth
        }

        // 3.4 动起来
        mask.style.left = endX + 'px'

        // 内容走的距离 =（内容的长度 - 盒子的长度）\/ (盒子长度 - 滚动条的长度) * 滚动条走的距离
        let content_len = (box_top.offsetWidth - box.offsetWidth) / (box.offsetWidth - mask.offsetWidth) * endX
        box_top.style.left = -content_len + 'px'

        return false
      }

      document.onmouseup = function() {
        document.onmousemove = null
      }
    }
  },
}
</script>

<style lang="scss">
.my-goods {
  .box {
    width: 800px;
    height: 200px;
    border: 1px solid #ddd;
    position: relative;
    margin: 100px auto;
    overflow: hidden;
  }
  .box_top {
    position: absolute;
    left: 0;
    top: 20px;
    li {
      float: left;
    }
    .el-image {
      width: 130px;
      height: 130px;
    }
  }
  .box_bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #e8e8e8;
    width: 100%;
    height: 25px;
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    height: 25px;
    border-radius: 12px;
    cursor: pointer;
  }
}
</style>
