import type { FormItemRule } from 'element-plus'
import * as REGEX from './regex'
import { utils } from '@zwms/shared'

export function validateRequire(): FormItemRule {
  return { 
    message: '该项为必填项', 
    required: true
  }
}


export function validateNumber(min?: number, max?: number): FormItemRule {
  let rangeText: string = ''
  if (utils.isDef(min) && utils.isDef(max)) {
    rangeText = `，${min}-${max}`
  } else if (utils.isDef(min)) {
    rangeText = `，最小不低于${min}`
  } else if (utils.isDef(max)) {
    rangeText = `，最大不高于${max}`
  }
  
  return { 
    message: `请输入数字${rangeText}`, 
    validator(rule, value) {
      if (!REGEX.NUMBER_REGEX.test(value)) {
        return false
      }
      if (utils.isDef(min) && min > value) {
        return false
      }
      if (max && value > max) {
        return false
      }
      return true
    } 
  }
}

export function validateName(): FormItemRule {
  return { 
    message: '名称包含大小写特殊字符，1-32位', 
    validator(rule, value) {
      return REGEX.NAME_REGEX.test(value)
    } 
  }
}

export function validatePassword(): FormItemRule {
  return { 
    message: '密码包含大小写特殊字符至少3种，8-32位', 
    validator(rule, value) {
      return REGEX.PASSWORD_REGEX.test(value)
    } 
  }
}