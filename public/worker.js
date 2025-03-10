// Worker 执行的代码
onmessage = function(evt) {
  console.log('Message received from main thread:', evt.data)
  const { type, data } = evt.data

  if (type == 'sum') {
    let sum = 0
    const [ startNum, endNum ] = data
    for (let i = startNum; i <= endNum; i++) {
      sum += i
    }
    
    // 将结果发送回主线程
    postMessage({ type: type, result: sum })
  }

}
