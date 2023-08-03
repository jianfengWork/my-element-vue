import * as XLSX from 'xlsx'
import * as Excel from 'exceljs/dist/exceljs'
import * as tinycolor from 'tinycolor2'

// 导出 x-data-spreadsheet
export function exportSheet(xs) {
  const exceljsWorkbook = new Excel.Workbook()
  exceljsWorkbook.modified = new Date()
  xs.getData().forEach(function (xws) {
    let rowobj = xws.rows
    // 构造exceljs文档结构
    const exceljsSheet = exceljsWorkbook.addWorksheet(xws.name)
    // 读取列宽
    let sheetColumns = []
    let colIndex = 0
    for (let col in xws.cols) {
      if (xws.cols[col].width) {
        sheetColumns.push({ header: colIndex + '', key: colIndex + '', width: xws.cols[col].width / 8})
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
  // writeBuffer 把写好的excel 转换成 ArrayBuffer 类型
  exceljsWorkbook.xlsx.writeBuffer().then((data) => {
    const link = document.createElement('a')
    // Blob 实现下载excel
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    })
    link.href = window.URL.createObjectURL(blob)
    link.download = '表格.xlsx'
    link.click()
  })
}
