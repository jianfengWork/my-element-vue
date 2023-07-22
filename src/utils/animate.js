/**
 * 
 * @param {*} obj 
 * @param {*} json 
 * current: 当前值
 * target: 目标值
 * 运动对象: width、height、left、top
 */
export function animateMove(obj, json) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function() {
    // 先假设，这一次执行完所有的属性都到达目标了
    var flag = true

    for (var k in json) {
      var current = parseInt(getStyle(obj, k)) || 0
      var target = json[k]
      var step = (target - current) / 10 // 除数越小，运动越快
      step = step > 0 ? Math.ceil(step) : Math.floor(step)
      current = current + step
      obj.style[k] = current + 'px'

      // 告诉标记，当前这个属性还没到达
      if (current != target) {
        flag = false
      }

    }
  
    // 如果此时仍然为 true，就说明真的都到达了
    if (flag) {
      clearInterval(obj.timer)
    }

  }, 15)
}

function getStyle(obj, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(obj, null)[attr]
  } else {
    return obj.currentStyle[attr]
  }
}

export function animateScroll() { // 封装 scrollTop
  if (window.pageYOffset != null) { // ie9+ 高版本浏览器
    // 因为 window.pageYOffset 默认的是 0 所以这里需要判断
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else if (document.compatMode === 'CSS1Compat') { // 标准浏览器，来判断有没有声明 DTD
    return {
      left: document.documentElement.scrollLeft,
      top: document.documentElement.scrollTop
    }
  }

  return { // 未声明 DTD
    left: document.body.scrollLeft,
    top: document.body.scrollTop
  }

}

// 获取鼠标在页面的位置，处理浏览器兼容性
export function getPage(evt) {
  var pageX = evt.pageX || evt.clientX + animateScroll().left
  var pageY = evt.pageY || evt.clientY + animateScroll().top
  return {
    pageX: pageX,
    pageY: pageY
  }
}

// 处理注册事件的兼容性问题
// eventName, 不带on, click、mouseover、mouseout
export function addEventListener(element, eventName, fn) {
  if (element.addEventListener) {
    element.addEventListener(eventName, fn) // 第三个参数,默认是false
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, fn)
  } else {
    // 相当于 element.onclick = fn
    element['on' + eventName] = fn
  }
}

// 处理移除事件的兼容性处理
export function removeEventListener(element, eventName, fn) {
  if (element.removeEventListener) {
    element.removeEventListener(eventName, fn)
  } else if (element.detachEvent) {
    element.detachEvent('on' + eventName, fn)
  } else {
    element['on' + eventName] = null
  }
}
