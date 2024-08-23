// 添加水印方法 
const id = '122222.23452384164.123412415'
export const setWaterMark = (str1, str2, str3) => {
  
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  const can = document.createElement('canvas')
  // 设置canvas画布大小
  can.width = 260
  can.height = 220

  const cans = can.getContext('2d')
  cans.rotate(-40 * Math.PI / 180) // 水印旋转角度
  cans.font = '15px Vedana'
  cans.fillStyle = '#666666'
  cans.textAlign = 'center'
  cans.textBaseline = 'Middle'
  cans.fillText(str1, can.width / 4, can.height - 22) // 水印在画布的位置x，y轴
  cans.fillText(str2, can.width / 4, can.height)
  cans.fillText(str3, can.width / 4, can.height + 22)

  const div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.opacity = '15'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = document.documentElement.clientWidth + 'px'
  div.style.height = document.documentElement.clientHeight + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}

// 移除水印方法
export const removeWatermark = () => {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
}
