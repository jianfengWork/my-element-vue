/**
 * 深克隆
 * 入参类型检查
 * 当数据量较大并层次很深时，使用递归函数会导致栈溢出
 * typeof Date,Math,RegExp,Function,Null 都返回Object 
 * Date,RegExp,Function 应该如何克隆
 * 当对象的两个属性v,s引用同一个对象时，克隆之后也应该引用同一个对象
 * 对象的原型 prototype 如何克隆
 * 属性的 getOwnPropertyDescriptor 如何克隆
 * for-in遍历的是原型链，需要用 hasOwnProperty 判断是否是自有属性
 */

// 定义函数获取数据类型
function _getDataType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

// 定义函数克隆RegExp类型
function copyRegExp(regExp) {
  let attrs = '';
  if (regExp.global) attrs += 'g';
  if (regExp.ignoreCase) attrs += 'i';
  if (regExp.multiline) attrs += 'm';
  let newRegExp = new RegExp(regExp, attrs);
  newRegExp.lastIndex = regExp.lastIndex;
  return newRegExp;
}

// 定义深克隆函数
export function cloneObj(x) {
  // String Number Boolean Undefined Null 返回自身
  if (x == null || typeof x !== 'object') return x;
  // RegExp Date Function 克隆
  let type = _getDataType(x);
  let root;
  switch (type) {
    case 'RegExp':
      return copyRegExp(x);
    case 'Date':
      return new Date(x.getTime());
    case 'Function':
      return x;
    case 'Array':
      root = [];
      break;
    default:
      root = Object.create(Object.getPrototypeOf(x));
  }
  // Array Object 克隆
  // 用来去重 解决原数据中多个属性引用同一对象克隆后不相同问题
  const uniqueList = [];
  // 使用栈结构解决递归爆栈问题
  const stack = [
    {
      parent: root,
      key: undefined,
      data: x,
    }
  ];
  // 深度优先循环
  while (stack.length) {
    const {parent, key, data} = stack.pop();
    // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent;
    if (typeof key !== 'undefined') {
      let type = _getDataType(data);
      switch (type) {
        case 'RegExp':
          parent[key] = copyRegExp(data);
          continue;
        case 'Date':
          parent[key] = new Date(data.getTime());
          continue;
        case 'Function':
          parent[key] = data;
          continue;
        case 'Array':
          res = parent[key] = [];
          break;
        default:
          let proto = Object.getPrototypeOf(data);
          res = parent[key] = Object.create(proto);
      }
    }
    //数据引用已经存在则赋值并退出本次循环,不存在则缓存
    let uniqueData = uniqueList.find(item => item.source === data);
    if (uniqueData) {
      parent[key] = uniqueData.target;
      continue;
    } else {
      uniqueList.push({
        source: data,
        target: res,
      });
    }
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        if (data[k] == null || typeof data[k] !== 'object') {
          // 基础类型克隆
          let descriptor=Object.getOwnPropertyDescriptor(data,k);
          Object.defineProperty(res,k,descriptor);
        } else {
          // 引用类型加入stack循环处理
          stack.push({
            parent: res,
            key: k,
            data: data[k],
          });
        }
      }
    }
  }
  return root;
}

/**
 * @method 深拷贝-easy
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
