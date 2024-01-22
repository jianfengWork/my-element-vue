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

/**
 * @method 过滤数组的children，解决三级联动最后一级数据需要为null
 * @param Array 数组
 * @returns {Array}
 */
export function filterChildren(list) {
  const arr = []

  list.forEach(item => {
    const temp = { ...item }
    if (temp.children.length) {
      temp.children = this.filterChildren(temp.children)
    } else {
      temp.children = null
    }
    arr.push(temp)
  })

  return arr
}

/**
 * @method 数组扁平化，解决三级联动后端只返回任一级id
 * @param {TreeArray<树数组>, nodeId}
 * @returns {[...Number]}
 */
/* 
var tree = [
  {
    unitId: 1, unitName: '单位1', children: [
      { unitId: 2, unitName: '单位1-1', parentId: 1, children: null },
      {
        unitId: 3, unitName: '单位1-2', parentId: 1, children: [
          { unitId: 4, unitName: '单位1-2-1', parentId: 3, children: null }
        ]
      },
    ]
  },
  {
    unitId: 5, unitName: '单位2', children: null
  }
]
 */
export function getTreeIds(tree, nodeId) {
  const toFlatArray = (tree) => {
    return tree.reduce((t, _) => {
      const child = _['children']
      return [
        ...t,
        _,
        ...(child && child.length ? toFlatArray(child) : [])]
    }, [])
  }
  // console.log(toFlatArray(tree))

  const getIds = flatArray => {
    let ids = [nodeId]
    let child = flatArray.find(_ => _['unitId'] === nodeId)
    while (child && child.parentId) {
      ids = [child.parentId, ...ids]
      child = flatArray.find(_ => _['unitId'] === child.parentId)
    }
    return ids
  }

  return getIds(toFlatArray(tree))
}
// getTreeIds(tree, 3)

/**
 * @method 数组树化，解决平级数组生成级联
 * @param {Array, flag<过滤标识>}
 * @returns {[Tree]}
 */
/*
var arr = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]
*/
export function generateTree(arr, flag) {
  const temp = []
  arr.map(item => {
    const exist = temp.filter(val => val[flag] == item[flag])
    if (exist.length) {
      exist[0].children.push(item)
    } else {
      temp.push({
        ...item,
        children: [item]
      })
    }
  })
  return temp
}
// generateTree(arr, 'category')
