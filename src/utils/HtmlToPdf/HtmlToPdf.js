import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue, options) {
    Vue.prototype.getPdf = function (dom) {
      let title = Date.now()
      let pdfDom = document.querySelector(dom || 'pdfDom')
      html2Canvas(pdfDom, {
        allowTaint: true,
        scale: 2
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        // 一页pdf显示html页面生成的canvas高度;
        let pageHeight = contentWidth / 592.28 * 841.89
        // 未生成pdf的html页面高度
        let leftHeight = contentHeight
        // 页面偏移
        let position = 0
        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        let imgWidth = 547.28
        let imgHeight = 547.28 / contentWidth * contentHeight

        let pageData = canvas.toDataURL('image/jpeg', 1.0)

        let pdf = new JsPDF('', 'pt', 'a4')

        // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 24, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 24, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        pdf.save(title + '.pdf')
      })
    }
  }
}
