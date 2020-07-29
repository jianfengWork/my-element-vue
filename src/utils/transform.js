/**
 * @method 补零
 * @param {Number, String} num
 * @returns {'09'||10}
 */
export function repairZero(num) {
  return num = num > 9 ? num : '0' + num
}

/**
 * @method 数组去重
 * @param Array 支持数组、对象数组
 * @returns {[...item]}
 */
export function uniqueArray(arr) {
  let temp = []
  let obj = {}
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let v = arr[i]
    // let v = arr[i].id
    if (!obj[v]) {
      obj[v] = 1
      temp.push(arr[i])
    }
  }
  return temp
}

/**
 * @method 二维数组去重
 * @param Array 支持数组
 * @returns {[[...item], [...item]]}
 * var arr = [[1, 2, 3], [3, 2, 1], [1, 2, 3]]
 */
export function multipleArray(arr) {
  const temp = Array.from(new Set(arr.map(item => {
    return item.join('')
  }))).map(item => {
    return item.split('')
  })
  // console.log(new Set(arr.map(item => {
  //   return item.join('')
  // })))
  return temp
}

/**
 * @method 一维数组转二维数组
 * @param Array 支持数组
 * @returns {[[...item], [...item]]}
 * var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
 */
export function dimensionArray(arr, chunkLength) {
  const chunkArr = []
  const len = arr.length
  chunkArr[0] = arr.slice(0, chunkLength)
  for (let i = chunkLength; i < len; i++) {
    if (chunkArr[chunkArr.length - 1].length === chunkLength) chunkArr.push([])
    chunkArr[chunkArr.length - 1].push(arr[i])
  }
  return chunkArr
}

/**
 * @method 字节长度
 * @param String 支持字符串
 * @returns {Number}
 */
export function getBytes(val) {
  if (!val) val = ''
  let len = val.length
  for (let i in val) {
    if (val.charCodeAt(i) > 255) len++
  }
  return len
}

/**
 * @method 时间戳(秒)=>年月日时分秒
 * @param {String} fmt 日期格式 'MM-dd hh:mm'
 * @param {Number, String} timestamp 时间戳 1589126400
 * @returns {yyyy || MM || dd || hh || mm || ss}
 */
export function dateFmt(timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let date = new Date(timestamp * 1000)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      )
    }
  }
  return fmt
}

/**
 * @method 0分00秒
 * @param {Number} num 100
 * @returns {1分40秒}
 */
export function minuteSecond(s) {
  let t = ''
  if (s >= 0) {
    const min = Math.floor(s / 60) % 60
    t += min + '分'
    let sec = s % 60
    if (sec < 10) t += '0'
    t += sec + '秒'
  }
  return t
}
