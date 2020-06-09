import ThemePicker from '@/components/ThemePicker'
import CountUp from '@/components/CountUp/countup'

export default {
  install(Vue) {
    Vue.component(ThemePicker.name, ThemePicker)
    Vue.component(CountUp.name, CountUp)
  }
}
