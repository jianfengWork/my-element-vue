/**
 * @method 一维数组去重
 * @param Array 支持数组、对象数组
 * @returns {[...item]}
 * var arr = [1, 2, 3, 3, 2, 1]
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
  // {'123', '321'}
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
