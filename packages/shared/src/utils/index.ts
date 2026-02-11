export function isDef<T=any>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

export function isUndef(value: unknown): value is undefined {
  return value === undefined || value === null;
}