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
 * @method 00:00:00
 * @param {Number} num 100
 * @returns {00:02:40}
 */
export function formatHour(time) {
  let h = Math.floor(time / 3600)
  let m = Math.floor(time % 3600 / 60)
  let s = Math.floor(time % 60)
  return repairZero(h) + ':' + repairZero(m) + ':' + repairZero(s)
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

/**
 * @method 获取两个日期的时间差
 * @param {start: 时间戳, end: 时间戳}
 * @returns {Object}
 */
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

/**
 * @method uuid
 * @param {null}
 * @returns {String}
 */
export function getUUId() {
  const arr = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    const str = Math.floor(Math.random() * 0x10)
    arr[i] = hexDigits.substring(str, str + 1)
  }
  arr[14] = 4
  const astr = (arr[19] & 0x3) | 0x8
  arr[19] = hexDigits.substring(astr, astr + 1)
  arr[8] = arr[13] = arr[18] = arr[23] = '-'
  return arr.join('').replaceAll('-', '')
}
