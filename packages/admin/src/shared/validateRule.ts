import { regExpRule } from '@zwms/shared'

const required = { required: true, message: '此项为必填项' }

const phone = {
  validator(
    rule: RegExp,
    value: string,
    callback: (errMessage?: Error) => void
  ) {
    if (regExpRule.phone.test(value)) {
      return callback()
    }
    callback(new Error('请正确输入手机号'))
  },
}

const verificationCode = {
  validator(
    rule: RegExp,
    value: string,
    callback: (errMessage?: Error) => void
  ) {
    if (regExpRule.verificationCode.test(value)) {
      return callback()
    }
    callback(new Error('请正确输入验证码'))
  },
}

const checkIDCardRule = {
  validator(
    rule: RegExp,
    value: string,
    callback: (errMessage?: Error) => void
  ) {
    const result = regExpRule.checkIDCard(value)
    if (result) {
      callback()
    } else {
      callback(new Error('请输入正确的身份证号码'))
    }
  },
}

export {
  required,
  phone,
  verificationCode,
  checkIDCardRule,
}
