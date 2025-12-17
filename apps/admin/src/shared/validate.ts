import type { FormItemRule } from 'element-plus'

// 密码正则（基础强度）大小写特殊字符字母包含至少3种，长度8-32
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,32}$/;
// 名称至少包含一个字符
const NAME_REGEX = /^[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].{1,32}$/;

export function validateName(): FormItemRule {
  return { 
    message: '名称包含大小写特殊字符，1-32位', 
    validator(rule, value) {
      return NAME_REGEX.test(value)
    } 
  }
}

export function validatePassword(): FormItemRule {
  return { 
    message: '密码包含大小写特殊字符至少3种，8-32位', 
    validator(rule, value) {
      return PASSWORD_REGEX.test(value)
    } 
  }
}