declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
declare module '*.less'
declare module '*.scss'
declare module '*.json'
declare module '*.{png,jpg,jpeg}' {
  export const str: string
}