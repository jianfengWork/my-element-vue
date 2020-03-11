import store from '@/store/store'

export function changeStore() {
  console.log(store)
  store.dispatch('addCount', 1)
}
