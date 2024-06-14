export default {
  functional: true,
  props: {
    userProvidedHtml: {
      type: String,
      required: true
    }
  },
  render(h, ctx) {
    return h('div', {
      domProps: {
        innerHTML: ctx.props.userProvidedHtml
      }
    })
  }
}
