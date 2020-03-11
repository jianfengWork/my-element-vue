import Clipboard from 'clipboard'
import { MessageBox, Message } from 'element-ui'

/**
 * clipboard - 复制
 *
 * @param {String} text - 复制的文本
 * @param {Event} event - 事件对象
 */
const clipboard = (text, event) => new Promise((resolve, reject) => {
  // 缺少复制内容
  if (!text) return resolve({
    status: false,
    message: 'Lack of copied content'
  })
  // 缺少事件对象
  if (!event.preventDefault) return resolve({
    status: false,
    message: 'arguments[1] is not event object'
  })
  // 初始化clipboard对象
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  // 成功回调
  clipboard.on('success', () => {
    // 释放缓存
    clipboard.destroy()
    // 弹框提示
    Message({
      message: '已复制到系统剪切板',
      type: 'success'
    })
    // return 状态
    resolve({
      status: true,
      message: 'Copy success'
    })
  })
  // 失败回调
  clipboard.on('error', () => {
    // 释放缓存
    clipboard.destroy()
    // 失败提示手动复制
    MessageBox.alert(text, '复制失败,请手动复制以下内容', {
      confirmButtonText: '确定',
    })
    // return状态
    reject({
      status: false,
      message: 'Copy the failure'
    })
  })
  // 触发事件
  clipboard.onClick(event)
})

export default clipboard
