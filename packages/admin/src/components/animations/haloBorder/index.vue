<template>
  <div class="halo-border-container" :style="style">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, CSSProperties } from 'vue'

interface Props {
  color?: string[]
  hoverColor?: string[]
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: () => ['#00a1ff', 'blue'],
  hoverColor: () => ['lime', 'green'],
  width: '4px',
})

const style = computed<CSSProperties>(() => {
  return {
    '--color0': props?.color?.[0],
    '--color1': props?.color?.[1],
    '--hover-color0': props?.hoverColor?.[0],
    '--hover-color1': props?.hoverColor?.[1],
    '--width': props.width,
  }
})
</script>
<style scoped lang="scss">
@property --d {
  syntax: '<angle>';
  inherits: true;
  initial-value: 0deg;
}

@keyframes halo {
  0% {
    --d: 0deg;
  }
  100% {
    --d: 3600deg;
  }
}
.halo-border-container {
  width: 100%;
  color: #fff;
  border: none;
  border-radius: 20px;
  position: relative;
  z-index: 0;
  cursor: pointer;
}
.halo-border-container:before {
  content: '';
  position: absolute;
  inset: calc(0px - var(--width));
  padding: var(--width);
  border-radius: 28px;
  background: conic-gradient(
    from var(--d, 0deg),
    var(--color0),
    #0000 30deg 120deg,
    var(--color1) 150deg 180deg,
    #0000 210deg 300deg,
    var(--color0) 330deg
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: subtract;
  pointer-events: none;
  animation-name: halo;
  animation-timing-function: linear;
  animation-duration: 60s;
  animation-iteration-count: infinite;
  animation-direction: normal;
}

.halo-border-container:hover:before {
  --color0: var(--hover-color0);
  --color1: var(--hover-color1);
  animation-direction: reverse;
  animation-duration: 40s;
  padding: calc(var(--width) - 1px);
}
</style>
