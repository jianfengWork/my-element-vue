/**
 * @method 函数防抖，在事件被触发n毫秒后再执行回调，连续触发会一直等待
 * @param {func, wait, immediate<是否立即执行>}
 * @returns {func}
 */
export function debounce(func, wait = 500, immediate = true) {

  var timeout

  var debounced = function () {
    // 修复this和参数
    var context = this
    var args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var callNow = !timeout // 第一次 callNow 为true
      timeout = setTimeout(function () {
        timeout = null // 再次触发 timeout 有值，一段时间后重置
      }, wait)
      if (callNow) func.apply(context, args)
    }
    else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }

  // 取消
  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

var count = 1
var container = document.getElementsByTagName('body')[0]

function getUserAction(...args) {
  console.log(args) // 至少有一个 event
  container.innerHTML = count++
}

container.onmousemove = debounce(getUserAction)
/* 
// 带参数
var setUseAction = debounce(function(event) {
  getUserAction.call(this, event, 1, 2)
})
container.onmousemove = setUseAction
document.getElementById('button').addEventListener('click', function(){
  setUseAction.cancel()
})
 */



/**
 * @method 函数节流，在事件被触发n毫秒后再执行回调，连续触发会定期执行
 * @param {func, wait, options{leading<首次是否执行>,trailing<结束后是否执行>}}
 * @returns {func}
 * leading：false 和 trailing: false不能同时设置
 * 将鼠标移出的时候，因为 trailing 设置为 false，停止触发的时候不会设置定时器，只要过了设置的时间，再移入的话，就会立刻执行，违反了 leading: false
 */
export function throttle(func, wait = 500, options = {}) {
  var timeout, context, args
  var previous = 0

  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function() {
    var now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  return throttled
}
container.onmousemove = throttle(getUserAction, 2000, {leading: true, trailing: false})
/* 
// 带参数
var setUseAction = throttle(function(event) {
  getUserAction.call(this, event, 1, 2)
}, 2000, {
  leading: true,
  trailing: false
})
container.onmousemove = setUseAction
 */
