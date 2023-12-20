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
