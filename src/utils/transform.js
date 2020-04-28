/**
 * 补零
 * @param num 支持数字、字符串
 * @returns {'09'||10}
 */
export function repairZero(num) {
  return num = num > 9 ? num : '0' + num
}

/**
 * 数组去重
 * @param Array 支持数组、对象数组
 * @returns {[...item]}
 */
export function uniqueArray(arr) {
  let temp = []
  let obj = {}
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let v = arr[i]
    if (!obj[v]) {
      obj[v] = 1
      temp.push(arr[i])
    }
  }
  return temp
}

/**
 * 二维数组去重
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
 * 字节长度
 * @param String 支持字符串
 * @returns {Number}
 */
export function getBytes(val) {
  let len = val.length
  for (let i in val) {
    if (val.charCodeAt(i) > 255) len++
  }
  return len
}
