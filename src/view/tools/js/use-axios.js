import {fetch} from '@/http/http'

export function getAxios() {
  fetch('/api/ratings', {}).then(res => {
    console.log(res)
  }).catch(err => {
    this.$message.error(err)
  })
}
