import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// 密码正则（基础强度）大小写特殊字符字母包含至少3种，长度8-32
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,32}$/;
// 密码正则（基础强度）大小写特殊字符字母包含至少3种，长度8-32
const NAME_REGEX = /^[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].{1,32}$/;

@ValidatorConstraint({ name: 'isPassword', async: false })
export class IsPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string): boolean {
    // 空值不校验（如需必填，配合 @IsNotEmpty() 使用）
    if (!password) return false;
    return PASSWORD_REGEX.test(password);
  }

  defaultMessage(): string {
    return '密码必须包含大小写字母、数字和特殊字符（!@#$%^&*()_+-=[]{};:\'"\\|,.<>/?），长度8-32位';
  }
}

/**
 * 密码校验装饰器（基础强度）
 * @param validationOptions 可选：自定义校验配置
 */
export function IsPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isName', async: false })
export class IsNameConstraint implements ValidatorConstraintInterface {
  validate(password: string): boolean {
    // 空值不校验（如需必填，配合 @IsNotEmpty() 使用）
    if (!password) return false;
    return NAME_REGEX.test(password);
  }

  defaultMessage(): string {
    return '名称必须包含大小写字母、数字和特殊字符（!@#$%^&*()_+-=[]{};:\'"\\|,.<>/?），长度1-32位';
  }
}

/**
 * 名称校验装饰器
 * @param validationOptions 可选：自定义校验配置
 */
export function IsName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNameConstraint,
    });
  };
}
