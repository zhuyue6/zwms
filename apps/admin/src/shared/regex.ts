// 密码正则（基础强度）大小写特殊字符字母包含至少3种，长度8-32
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,32}$/;
// 名称至少包含一个字符
const NAME_REGEX = /^[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].{1,32}$/;

// 数字正则
const NUMBER_REGEX = /^[0-9]+$/;

const AVATAR_TYPE_REGEX = /^image\/(png|jpeg|jpg)$/

export {
  PASSWORD_REGEX,
  NAME_REGEX,
  AVATAR_TYPE_REGEX,
  NUMBER_REGEX
}