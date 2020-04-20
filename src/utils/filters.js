import moment from 'moment'
/**
 * 时间戳（秒） => 年月日 时分秒
 * @param timestamp 1586361600
 * @returns {'2020-04-09 00:00:00'}
 */
export function formatDate(timestamp) {
  return timestamp ? moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
}

/**
 * 转换金额展示
 * @param val 支持数字、字符串
 * @param digit 支持数字、字符串
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
