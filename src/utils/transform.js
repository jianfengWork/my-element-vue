import moment from 'moment'
/**
 * @method 时间戳(秒)=>年月日时分秒
 * @param {Number, String} timestamp 1586361600
 * @returns {'2020-04-09 00:00:00'}
 */
export function formatDate(timestamp) {
  return timestamp ? moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
}

/**
 * @method 转换金额展示
 * @param {Number, String} val 1000000
 * @param {Number, String} digit 保留小数点位数
 * @returns {'10,000.00'}
 */
export function formatCash(val, digit) {
  if (!val) val = 0
  digit = digit >= 0 && digit <= 20 ? digit : 2
  val = parseFloat((val + '').replace(/[^\d\.-]/g, '')).toFixed(digit) + ''
  let l = val.split('.')[0].split('').reverse()
  let r = val.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) { 
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  } 
  return t.split('').reverse().join('') + '.' + r
}

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
 * @method 深拷贝
 * @param Object 支持对象、数组
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
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
export function minuteSecond(s, minuteUnit = ':', secondUnit = '') {
  let t = ''
  if (s >= 0) {
    const min = Math.floor(s / 60) % 60
    t += repairZero(min) + minuteUnit
    let sec = s % 60
    if (sec < 10) t += '0'
    t += parseInt(sec) + secondUnit
  }
  return t
}

/**
 * @method 数组的最小值及索引
 * @param Array 数组
 * @returns {obj.value, obj.index}
 * var arr = [97, 68, 72, 29, 51, 45]
 */
export function getArrayMin(arr) {
  const obj = {}
  obj.value = arr[0]
  obj.index = 0
  for (let i = 1, len = arr.length; i < len; i++) {
    if (obj.value > arr[i]) {
      obj.value = arr[i]
      obj.index = i
    }
  }
  return obj
}

/**
 * @method url转obj
 * @param {string} url
 * @returns {Object}
 */
 export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 获取两个日期的时间差 - 毫秒
export function getInterval(start, end) {
  // 两个日期对象，相差的毫秒数
  var interval = end - start
  // 求 相差的天数/小时数/分钟数/秒数
  var day, hour, minute, second

  // 两个日期对象，相差的秒数
  // interval = interval / 1000
  interval /= 1000

  day = Math.round(interval / 60 / 60 / 24)
  hour = Math.round(interval / 60 / 60 % 24)
  minute = Math.round(interval / 60 % 60)
  second = Math.round(interval % 60)

  return {
    day: day,
    hour: hour,
    minute: minute,
    second: second
  }
}
