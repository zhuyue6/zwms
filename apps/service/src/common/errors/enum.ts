export enum ErrorCode {
  // 通用错误 (1xxxx)
  UNKNOWN_ERROR = 1000,
  VALIDATION_ERROR = 10001, 
  UNAUTHORIZED = 10002, // 未授权
  FORBIDDEN = 10003, // 禁止访问
  NOT_FOUND = 10004, // 未找到
  ALREADY_EXISTS = 10005, // 已存在

  // 业务错误 (11xxx)
  // 用户错误 (111xx)
  USER_ALREADY_EXISTS = 11000,   // 用户已存在
  USER_NOT_FOUND = 11001,   // 用户不存在
  USER_NAME_OR_PASSWORD_ERROR = 11002,   // 用户名或密码错误
  USER_ORIGINAL_PASSWORD_ERROR = 11003,   // 原始密码错误
}