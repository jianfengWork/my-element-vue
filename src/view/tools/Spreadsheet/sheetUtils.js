import * as XLSX from 'xlsx'
import * as Excel from 'exceljs/dist/exceljs'
import * as tinycolor from 'tinycolor2'
import _ from 'lodash'

// 导出 x-data-spreadsheet
export function exportSheet(xs, http = false) {
return new Promise((resolve, reject) => {
  const exceljsWorkbook = new Excel.Workbook()
  exceljsWorkbook.modified = new Date()
  xs.getData().forEach(function (xws) {
    let rowobj = xws.rows
    // 构造exceljs文档结构
    const exceljsSheet = exceljsWorkbook.addWorksheet(xws.name)
    // 读取列宽
    let sheetColumns = []
    // 1.先导出excel sheetColumns = []  2.再导入导出的excel sheetColumns = [...]
    let colIndex = 0
    for (let col in xws.cols) {
      if (xws.cols[col].width) {
        sheetColumns.push({ header: '', key: colIndex + '', width: xws.cols[col].width / 8})
      }
      colIndex++
    }
    exceljsSheet.columns = sheetColumns
    for (let ri = 0; ri < rowobj.len; ++ri) {
      let row = rowobj[ri]
      if (!row) continue
      // 构造exceljs的行(如果尚不存在，则将返回一个新的空对象)
      const exceljsRow = exceljsSheet.getRow(ri + 1)
      Object.keys(row.cells).forEach(function (k) {
        let idx = +k
        if (isNaN(idx)) return
        const exceljsCell = exceljsRow.getCell(Number(k) + 1)
        exceljsCell.value = row.cells[k].text
        if (xws.styles[row.cells[k].style]) {
          // 垂直对齐方式
          if (xws.styles[row.cells[k].style].valign) {
            if (exceljsCell.alignment == undefined || exceljsCell.alignment == null) {
              exceljsCell.alignment = {}
            }
            exceljsCell.alignment.vertical = xws.styles[row.cells[k].style].valign
          }
          // 水平对齐方式
          if (xws.styles[row.cells[k].style].align) {
            if (exceljsCell.alignment == undefined || exceljsCell.alignment == null) {
              exceljsCell.alignment = {}
            }
            exceljsCell.alignment.horizontal = xws.styles[row.cells[k].style].align
          }
          // 边框
          if (xws.styles[row.cells[k].style].border) {
            exceljsCell.border = {}
            // bottom
            if (xws.styles[row.cells[k].style].border.bottom) {
              exceljsCell.border.bottom = {}
              exceljsCell.border.bottom.style = xws.styles[row.cells[k].style].border.bottom[0]
              exceljsCell.border.bottom.color = xws.styles[row.cells[k].style].border.bottom[1]
            }
            // left
            if (xws.styles[row.cells[k].style].border.left) {
              exceljsCell.border.left = {}
              exceljsCell.border.left.style = xws.styles[row.cells[k].style].border.left[0]
              exceljsCell.border.left.color = xws.styles[row.cells[k].style].border.left[1]
            }
            // right
            if (xws.styles[row.cells[k].style].border.right) {
              exceljsCell.border.right = {}
              exceljsCell.border.right.style = xws.styles[row.cells[k].style].border.right[0]
              exceljsCell.border.right.color = xws.styles[row.cells[k].style].border.right[1]
            }
            // top
            if (xws.styles[row.cells[k].style].border.top) {
              exceljsCell.border.top = {}
              exceljsCell.border.top.style = xws.styles[row.cells[k].style].border.top[0]
              exceljsCell.border.top.color = xws.styles[row.cells[k].style].border.top[1]
            }
          }
          // 背景色
          if (xws.styles[row.cells[k].style].bgcolor) {
            let rgb = tinycolor(xws.styles[row.cells[k].style].bgcolor).toRgb()
            let rHex = parseInt(rgb.r).toString(16).padStart(2, '0')
            let gHex = parseInt(rgb.g).toString(16).padStart(2, '0')
            let bHex = parseInt(rgb.b).toString(16).padStart(2, '0')
            let aHex = parseInt(rgb.a).toString(16).padStart(2, '0')
            let _bgColor = aHex + rHex + gHex + bHex
            // 设置exceljs背景色
            exceljsCell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: _bgColor }
            }
          }
          // 字体
          exceljsCell.font = xws.styles[row.cells[k].style].font || {}
          // 字体颜色
          if (xws.styles[row.cells[k].style].color) {
            let rgb = tinycolor(xws.styles[row.cells[k].style].color).toRgb()
            let rHex = parseInt(rgb.r).toString(16).padStart(2, '0')
            let gHex = parseInt(rgb.g).toString(16).padStart(2, '0')
            let bHex = parseInt(rgb.b).toString(16).padStart(2, '0')
            let aHex = parseInt(rgb.a).toString(16).padStart(2, '0')
            let _fontColor =  aHex + rHex + gHex + bHex
            exceljsCell.font.color = { argb: _fontColor }
          }
          // 合并单元格
          if (row.cells[k].merge) {
            // 开始行
            let startRow = ri + 1
            // 结束行,加上Y轴跨度
            let endRow = startRow + row.cells[k].merge[0]
            // 开始列
            let startColumn = Number(k) + 1
            // 结束列,加上X轴跨度
            let endColumn = startColumn + row.cells[k].merge[1]
            // 按开始行，开始列，结束行，结束列合并
            exceljsSheet.mergeCells(startRow,startColumn,endRow,endColumn)
          }

        }
      })
    }
  })
  // return
  // writeBuffer 把写好的excel 转换成 ArrayBuffer 类型
  exceljsWorkbook.xlsx.writeBuffer().then((data) => {
    const link = document.createElement('a')
    // Blob 实现下载excel
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    })
    if (http == true) {
      // blob转文件类型，用于上传
      const file = new window.File([blob], new Date().getTime() + '.xlsx', {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      })
      resolve(file)
    } else {
      link.href = window.URL.createObjectURL(blob)
      link.download = '表格.xlsx'
      link.click()
    }
  })
})
}

// 导入 excel
export function loadExcelFile(file) {
  return new Promise((resolve, reject) => {
  const wb = new Excel.Workbook()
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = () => {
    const buffer = reader.result
    // 微软的 Excel ColorIndex 一个索引数字对应一个颜色
    const indexedColors = ["000000", "FFFFFF", "FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF", "000000", "FFFFFF", "FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF", "800000", "008000", "000080", "808000", "800080", "008080", "C0C0C0", "808080", "9999FF", "993366", "FFFFCC", "CCFFFF", "660066", "FF8080", "0066CC", "CCCCFF", "000080", "FF00FF", "FFFF00", "00FFFF", "800080", "800000", "008080", "0000FF", "00CCFF", "CCFFFF", "CCFFCC", "FFFF99", "99CCFF", "FF99CC", "CC99FF", "FFCC99", "3366FF", "33CCCC", "99CC00", "FFCC00", "FF9900", "FF6600", "666699", "969696", "003366", "339966", "003300", "333300", "993300", "993366", "333399", "333333"]
    wb.xlsx.load(buffer).then(workbook => {
      let workbookData = []
      workbook.eachSheet((sheet, sheetIndex) => {
        // 构造x-data-spreadsheet 的 sheet 数据源结构
        let sheetData = { name: sheet.name, styles: [], rows: {}, merges: [] }
        // 收集合并单元格信息
        let mergeAddressData = []
        for (let mergeRange in sheet._merges) {
          sheetData.merges.push(sheet._merges[mergeRange].shortRange)
          let mergeAddress = {}
          // 合并单元格起始地址
          mergeAddress.startAddress = sheet._merges[mergeRange].tl
          // 合并单元格终止地址
          mergeAddress.endAddress = sheet._merges[mergeRange].br
          // Y轴方向跨度
          mergeAddress.YRange = sheet._merges[mergeRange].model.bottom - sheet._merges[mergeRange].model.top
          // X轴方向跨度
          mergeAddress.XRange = sheet._merges[mergeRange].model.right - sheet._merges[mergeRange].model.left
          mergeAddressData.push(mergeAddress)
        }
        sheetData.cols = {}
        for (let i = 0; i < sheet.columns.length; i++) {
          sheetData.cols[i.toString()] = {}
          if (sheet.columns[i].width) {
            // 不知道为什么从 exceljs 读取的宽度显示到 x-data-spreadsheet 特别小, 这里乘以8
            sheetData.cols[i.toString()].width = sheet.columns[i].width * 8
          } else {
            // 默认列宽
            sheetData.cols[i.toString()].width = 100
          }
        }
        // 遍历行
        sheet.eachRow((row, rowIndex) => {
          sheetData.rows[(rowIndex - 1).toString()] = { cells: {} }
          row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
            let cellText = ''
            if (cell.value && cell.value.result) {
              // Excel 单元格有公式
              cellText = cell.value.result
            } else if (cell.value && cell.value.richText) {
              // Excel 单元格是多行文本
              for (let text in cell.value.richText) {
                // 多行文本做累加
                cellText += cell.value.richText[text].text
              }
            } else {
              // Excel 单元格无公式
              cellText = cell.value
            }
            /* 解析单元格,包含样式 */
            // 单元格存在背景色
            let backGroundColor = null
            if (cell.style.fill && cell.style.fill.fgColor && cell.style.fill.fgColor.argb) {
              // 8位字符颜色先转rgb再转16进制颜色
              backGroundColor = ((val) => {
                val = val.trim().toLowerCase()  // 去掉前后空格
                let color = {}
                try {
                  let argb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val)
                  color.r = parseInt(argb[2], 16)
                  color.g = parseInt(argb[3], 16)
                  color.b = parseInt(argb[4], 16)
                  color.a = parseInt(argb[1], 16) / 255
                    return tinycolor(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`).toHexString()
                } catch (e) {
                  console.log(e)
                }
              })(cell.style.fill.fgColor.argb)
            }
            if (backGroundColor) cell.style.bgcolor = backGroundColor
            // 字体颜色
            let fontColor = null
            if (cell.style.font && cell.style.font.color && cell.style.font.color.argb) {
              // 8位字符颜色先转rgb再转16进制颜色
              fontColor = ((val) => {
                val = val.trim().toLowerCase()  // 去掉前后空格
                let color = {}
                try {
                  let argb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val)
                  color.r = parseInt(argb[2], 16)
                  color.g = parseInt(argb[3], 16)
                  color.b = parseInt(argb[4], 16)
                  color.a = parseInt(argb[1], 16) / 255
                  return tinycolor(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`).toHexString()
                } catch (e) {
                  console.log(e)
                }
              })(cell.style.font.color.argb)
            }
            if (fontColor) cell.style.color = fontColor
            // 对齐格式
            if (cell.style.alignment && cell.style.alignment.horizontal) {
              cell.style.align = cell.style.alignment.horizontal 
            }
            if (cell.style.alignment && cell.style.alignment.vertical) {
              cell.style.valign = cell.style.alignment.vertical
            }
            // 边框
            let xsCellStyle = _.cloneDeep(cell.style)
            xsCellStyle.border = {}
            if (cell.style.border && JSON.stringify(cell.style.border) != '') {
              let coloneStyle = cell.style.border
              if (coloneStyle.bottom) {
                xsCellStyle.border.bottom = []
                xsCellStyle.border.bottom[0] = coloneStyle.bottom.style
                if (_.isString(coloneStyle.bottom.color)) {
                  xsCellStyle.border.bottom[1] = coloneStyle.bottom.color
                } else {
                  xsCellStyle.border.bottom[1] = '#000000'
                }
              }
              if (coloneStyle.right) {
                xsCellStyle.border.right = []
                xsCellStyle.border.right[0] = coloneStyle.right.style
                if (_.isString(coloneStyle.right.color)) {
                  xsCellStyle.border.right[1] = coloneStyle.right.color
                } else {
                  xsCellStyle.border.right[1] = '#000000'
                }
              }
              if (coloneStyle.left) {
                xsCellStyle.border.left = []
                xsCellStyle.border.left[0] = coloneStyle.left.style
                if (_.isString(coloneStyle.left.color)) {
                  xsCellStyle.border.left[1] = coloneStyle.left.color
                } else {
                  xsCellStyle.border.left[1] = '#000000'
                }
              }
              if (coloneStyle.top) {
                xsCellStyle.border.top = []
                xsCellStyle.border.top[0] = coloneStyle.top.style
                if (_.isString(coloneStyle.top.color)) {
                  xsCellStyle.border.top[1] = coloneStyle.top.color
                } else {
                  xsCellStyle.border.top[1] = '#000000'
                }
              }
            }
            // 处理合并单元格
            let mergeAddress = _.find(mergeAddressData, function(o) { return o.startAddress == cell._address })
            if (mergeAddress) {
              // 遍历的单元格属于合并单元格
              if (cell.master.address != mergeAddress.startAddress) {
                // 不是合并单元格中的第一个单元格不需要计入数据源
                return
              }
              // 说明是合并单元格区域的起始单元格
              sheetData.rows[(rowIndex - 1).toString()].cells[(colNumber - 1).toString()] = { text: cellText, style: 0, merge: [mergeAddress.YRange, mergeAddress.XRange] }
              sheetData.styles.push(xsCellStyle)
              // 对应的style存放序号
              sheetData.rows[(rowIndex - 1).toString()].cells[(colNumber - 1).toString()].style = sheetData.styles.length - 1
            } else {
              // 非合并单元格
              sheetData.rows[(rowIndex - 1).toString()].cells[(colNumber - 1).toString()] = { text: cellText, style: 0 }
              // 解析单元格,包含样式
              sheetData.styles.push(xsCellStyle)
              // 对应的style存放序号
              sheetData.rows[(rowIndex - 1).toString()].cells[(colNumber - 1).toString()].style = sheetData.styles.length - 1
            }
            
          })
        })
        workbookData.push(sheetData)
      })
      resolve(workbookData)
    })
  }
  })
}
