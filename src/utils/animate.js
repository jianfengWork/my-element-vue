export function animate(obj, json) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function() {
    // 先假设，这一次执行完所有的属性都到达目标了
    var flag = true

    for (var k in json) {
      var leader = parseInt(getStyle(obj, k)) || 0
      var target = json[k]
      var step = (target - leader) / 10
      step = step > 0 ? Math.ceil(step) : Math.floor(step)
      leader = leader + step
      obj.style[k] = leader + 'px'

      // 告诉标记，当前这个属性还没到达
      if (leader != target) {
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
