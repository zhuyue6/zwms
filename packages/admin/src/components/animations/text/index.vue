<template>
  <canvas ref="canvasRef" class="storm-container"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DotText from './lib'

interface Props {
  text?: string | string[]
  color?: {
    r: number
    g: number
    b: number
  }
  infinite?: boolean
  size?: number
  cycleTime?: number
}

const props = withDefaults(defineProps<Props>(), {
  text: '网上农博',
  size: 150,
  infinite: true,
  cycleTime: 3000,
})

const emit = defineEmits(['finish'])

const canvasRef = ref(null)
let dt: any

async function text(texts: string | string[]) {
  if (typeof texts === 'string') {
    dt.text(texts, {
      dotSize: '3',
      dotColor: props.color,
      textSize: props.size,
      gap: 8,
    })
  } else {
    for (const i of texts) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          dt.text(i, {
            dotSize: '3',
            dotColor: props.color,
            textSize: props.size,
            gap: 8,
          })
          resolve()
        }, props.cycleTime)
      })
    }
  }
  if (props.infinite) {
    setTimeout(() => {
      text(texts)
    }, props.cycleTime)
  } else {
    setTimeout(() => {
      dt.clear()
      emit('finish')
    }, props.cycleTime)
  }
}

onMounted(() => {
  dt = new DotText(canvasRef.value)
  text(props.text)
})

defineExpose({
  text(texts: string) {
    text(texts)
  },
})
</script>

<style lang="scss" scoped>
.storm-container {
  width: 100%;
  height: 100%;
}
</style>
