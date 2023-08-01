<template>
  <div class="online-excel">
    <div class="spreadsheet-btn TC">
      <el-button type="primary" size="mini" @click="saveSheet">保存</el-button>
      <el-button type="primary" size="mini" @click="updateSheet">更新</el-button>
      <el-button type="primary" size="mini" @click="uploadSheet">导入</el-button>
      <el-button type="primary" size="mini" @click="downSheet">导出</el-button>
    </div>
    <div class="spreadsheet-wrap">
      <div id="x-spreadsheet-demo" v-if="showSheet"></div>
    </div>
  </div>
</template>

<script>
// https://hondrytravis.com/x-spreadsheet-doc/
import Spreadsheet from 'x-data-spreadsheet'
import zhCN from 'x-data-spreadsheet/src/locale/zh-cn'
Spreadsheet.locale('zh-cn', zhCN)
import { baseOptions, dataOptions } from './spreadsheet.js'
import throttle from 'lodash/throttle' // 节流

let xs
export default {
  data() {
    return {
      showSheet: true
    }
  },
  mounted() {
    this.initSpreadsheet()
    window.addEventListener('resize', this.refreshSheet)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.refreshSheet)
  },
  methods: {
    initSpreadsheet() {
      const spreadsheetWrap = document.querySelector('.spreadsheet-wrap').getBoundingClientRect()
      xs = new Spreadsheet('#x-spreadsheet-demo', {
        ...baseOptions,
        view: {
          height: () => spreadsheetWrap.height,
          width: () => spreadsheetWrap.width,
        },
      })
      .loadData(JSON.parse(JSON.stringify(dataOptions)))
      .change(data => {
        // console.log('change', data)
      })

      xs.on('cell-selected', (cell, ri, ci) => {
        console.log('cell-selected', ri, ci, cell)
      })

      xs.validate()
    },
    saveSheet() {
      const data = xs.getData()
      console.log('最终数据：', data[0])
    },
    updateSheet() {
      // cellText(ri, ci, text, sheetIndex)
      xs.cellText(0, 2, '全省法院概况数据-更新')
      xs.reRender() // 更新
    },
    refreshSheet: throttle(function() {
      this.showSheet = false
      setTimeout(() => {
        this.showSheet = true
        this.$nextTick(() => { this.initSpreadsheet() })
      }, 300)
    }, 500, {
      leading: true, // 等待前被调用
      trailing: false // 等待后被调用
    }),
    uploadSheet() {},
    downSheet() {},
  }
}
</script>

<style lang="scss" scoped>
.online-excel {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  .spreadsheet-wrap {
    flex: 1;
    width: 100%;
  }
 }
</style>
