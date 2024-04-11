import { onMounted, onUnmounted, reactive, ref, nextTick, Ref } from 'vue'

function getTimeString(timeStamp: number | Date) {
  const time = new Date(timeStamp)
  const year = `${time.getFullYear()}`.padStart(4, '0')
  const month = `${time.getMonth() + 1}`.padStart(2, '0')
  const day = `${time.getDate()}`.padStart(2, '0')
  return `${year}${month}${day}`
}

export function useDaysTimeRange(days: number) {
  const nowTime = new Date()
  const interval = nowTime.getTime() - 1000 * 60 * 60 * 24 * days
  const intervalTime = new Date(interval)
  const timeRange = reactive<string[]>([
    getTimeString(intervalTime),
    getTimeString(nowTime),
  ])
  return timeRange
}

export function useListenWindowOnresize(cb: () => void) {
  onMounted(() => window.addEventListener('resize', cb))
  onUnmounted(() => window.removeEventListener('resize', cb))
}

export function useThemeInfo() {
  return themeInfo
}

const themeInfo = reactive<{
  colorScheme: string
  styles: Record<string, string>
}>({
  colorScheme: '',
  styles: {},
})

export function useDomGeometry(parentDomRef: Ref<HTMLElement>) {
  const height = ref()
  const width = ref()
  let observer: ResizeObserver | null = new ResizeObserver(
    (list: ResizeObserverEntry[]) => {
      list.forEach((entry) => {
        width.value = entry.contentRect.width
        height.value = entry.contentRect.height
      })
    }
  )
  onMounted(() => {
    ;(observer as ResizeObserver).observe(
      (parentDomRef.value as any).parentElement
    )
  })
  onUnmounted(() => {
    observer = null
  })
  return { height, width }
}

export function useWindowGeometry(domRef: Ref<HTMLElement>) {
  const height = ref()
  const width = ref()
  function resize() {
    nextTick(() => {
      height.value = domRef.value?.clientHeight
      width.value = domRef.value?.clientWidth
    })
  }
  onMounted(() => {
    window.addEventListener('resize', resize)
    resize()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', resize)
  })
  return { height, width }
}
