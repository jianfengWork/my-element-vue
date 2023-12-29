/* 
  1.选择一个基准元素，将列表分割成两个子序列；
  2.对列表重新排序，将所有小于基准值的元素放在基准值前面，所有大于基准值的元素放在基准值的后面；
  3.分别对较小元素的子序列和较大元素的子序列重复步骤1和2
*/
function quickSort(arr) {

  if (arr.length <= 1) {
    return arr
  }

  var midIndex = Math.floor(arr.length / 2)
  var mid = arr[midIndex]

  arr.splice(midIndex, 1)

  var leftArr = []
  var rightArr = []

  for (var i = 0; i < arr.length; i++) {

    if (arr[i] < mid) {
      leftArr.push(arr[i])
    } else {
      rightArr.push(arr[i])
    }

  }

  return quickSort(leftArr).concat([mid], quickSort(rightArr))

}
