import { repairZero } from './transform'

/**
 * @method 时间戳(秒)=>年月日时分秒
 * @param {Number, String} timestamp 1586361600
 * @returns {'2020-04-09 00:00:00'}
 */
import dayjs from 'dayjs'
export function formatDate(timestamp, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return timestamp ? dayjs(timestamp * 1000).format(fmt) : '-'
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
 * @method 获取两个日期的时间差
 * @param {start: 时间戳, end: 时间戳}
 * @returns {Object}
 */
export function getDateInterval(start, end) {
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
 * @method 获取当前月的日期
 * @returns {2024-01-01,2024-01-31}
 */
export function getCurrentMonthDate() {
  let currentDate = new Date()
  let currentYear = currentDate.getFullYear()
  let currentMonth = currentDate.getMonth() // 获取当前月份（注意，月份从0开始，0表示1月，11表示12月）

  // 构造当前月份的第一天
  let firstDay = formatDate(new Date(currentYear, currentMonth, 1) / 1000, 'YYYY-MM-DD')
  // 构造当前月份的最后一天
  let lastDay = formatDate(new Date(currentYear, currentMonth + 1, 0) / 1000, 'YYYY-MM-DD')

  return { firstDay, lastDay }
}
