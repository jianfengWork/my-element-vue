/**
 * 项目中 通用校验规则
 */
export default {
  ZeroOrIntegerVoid(rule, value, callback) { // 0 || 正整数
    const regExp = /^(0|\+?[1-9][0-9]*)$/
    if (!value) {
      callback(rule.msg || '不为空')
    } else if (!regExp.test(value)) {
      callback('请输入0或正整数')
    } else {
      callback()
    }
  },
}
