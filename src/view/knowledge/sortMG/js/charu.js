function InsertionSort(array) {

  for (let i = 0; i < array.length; i += 1) {
    let currentIndex = i

    // 去检查前一个元素是否大于当前元素
    while (
      currentIndex > 0
      && array[currentIndex] < array[currentIndex - 1]
    ) {

      // 交换这两个元素
      const tmp = array[currentIndex - 1]
      array[currentIndex - 1] = array[currentIndex]
      array[currentIndex] = tmp

      // 向左移动当前索引
      currentIndex -= 1
    }
  }

  return array
}
