import dayjs from 'dayjs'

export function isDef<T=any>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

export function isUndef(value: unknown): value is undefined {
  return value === undefined || value === null;
}

// 日期转换函数
export function formatDate(value) {
  return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null 
}