/**
 * 项目中 通用校验规则
 */
export default {
  ZeroOrInteger(rule, value, callback) { // 0 || 正整数
    const regExp = /^(0|\+?[1-9][0-9]*)$/
    if (!value) {
      callback(rule.msg || '不为空')
    } else if (!regExp.test(value)) {
      callback('请输入0或正整数')
    } else {
      callback()
    }
  },
  ZeroOrIntegerLimit(rule, value, callback) { // (0 || 正整数) 有上限
    const regExp = /^(0|\+?[1-9][0-9]*)$/
    if (!value) {
      callback(rule.msg || '不为空')
    } else if (!regExp.test(value)) {
      callback('请输入0或正整数')
    } else if (Number(value) > rule.limit) {
      callback('超过上限 ' + rule.limit)
    } else {
      callback()
    }
  },
  checkAccount(rule, value, callback) { // 账号格式
    const regExp = /^[A-z][A-z0-9]{3,19}$/
    if (value === '') {
      callback(rule.msg || '请输入账号')
    } else if (regExp.test(value) === false) {
      callback('大小写字母或数字，并且以英文字母开头，长度4~20位')
    } else {
      callback()
    }
  },
  checkNickname(rule, value, callback) { // 昵称格式
    const regExp = /^[A-z\u4e00-\u9fa5][A-z0-9\u4e00-\u9fa5]{1,19}$/
    if (value === '') {
      callback(rule.msg || '请输入昵称')
    } else if (regExp.test(value) === false) {
      callback('大小写字母、中文或数字，并且以英文字母或中文开头，长度2~20位')
    } else {
      callback()
    }
  },
  checkPhone(rule, value, callback) { // 手机号码
    const regExp = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
    if (value === '') {
      callback(rule.msg || '请输入手机号码')
    } else if (regExp.test(value) === false) {
      callback(rule.msg || '手机号码格式错误')
    } else {
      callback()
    }
  },
  checkPassword(rule, value, callback) { // 校验密码输入
    const regExp = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{8,30}$/
    if (value === '') {
      callback(rule.msg || '请输入密码')
    } else if (regExp.test(value) === false) {
      callback('大小写字母，特殊字符，数字中的三种，长度8~30位')
    } else {
      callback()
    }
  }
}
