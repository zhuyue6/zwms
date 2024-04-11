<template>
  <canvas ref="canvasRef" class="ripple-container"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#0d69d6',
  },
  speed: {
    type: Number,
    default: 8,
  },
  deg: {
    type: Number,
    default: Math.random() * 20,
  },
  lineWidth: {
    type: Number,
    default: 1,
  },
  streakNum: {
    type: Number,
    default: 2,
  },
  paneNum: {
    type: Number,
    default: 2,
  },
})

const canvasRef = ref()

let canvas
let context

const thetaA = (Math.PI * (360 - props.deg)) / 180.0
const thetaB = (Math.PI * props.deg) / 180.0
const cosA = Math.cos(thetaA)
const sinA = Math.sin(thetaA)
const cosB = Math.cos(thetaB)
const sinB = Math.sin(thetaB)

class Pane {
  constructor() {
    this.direction = Streak.generateDirection()
    this.speed = Streak.generateSpeed()
    this.radiusA = Streak.generateRadius()
    this.radiusB = Streak.generateRadius()
    this.y1 = Streak.generateY()
    this.x1 = this.direction === 1 ? -canvas.width : canvas.width
    this.cosA = this.direction === 1 ? cosA : cosB
    this.sinA = this.direction === 1 ? sinA : sinB
    this.cosB = this.direction === 1 ? cosB : cosA
    this.sinB = this.direction === 1 ? sinB : sinA
  }

  tick() {
    const cos = this.speed * this.cosA
    const sin = this.speed * this.sinA
    this.x1 = this.x1 + this.direction * cos
    this.y1 = this.y1 + this.direction * sin
    this.x2 = this.x1 + this.radiusA * this.cosA
    this.y2 = this.y1 + this.radiusA * this.sinA
    this.x3 = this.x1 + this.radiusB * this.cosB
    this.y3 = this.y1 + this.radiusB * this.sinB
    this.x4 = this.x2 + this.radiusB * this.cosB
    this.y4 = this.y2 + this.radiusB * this.sinB
    this.speed = Math.pow(this.speed, 1.0025)
    return this.isOffscreen()
  }

  isOffscreen() {
    if (this.direction === 1) {
      return this.y3 < 0 || this.x1 > canvas.width
    } else {
      return this.y2 < 0 || this.x4 < 0
    }
  }

  static generateDirection() {
    return Math.random() > 0.5 ? 1 : -1
  }

  static generateRadius() {
    const factor = canvas.width * 1
    return Math.round(Math.random() * factor * 0.75 + factor * 0.25)
  }

  static generateSpeed() {
    return Math.round(Math.random() * props.speed + props.speed + 8)
  }

  static generateY() {
    return Math.round(Math.random() * canvas.height * 2)
  }
}

class Streak {
  constructor() {
    this.direction = Streak.generateDirection()
    this.speed = Streak.generateSpeed()
    this.radius = Streak.generateRadius()
    this.y1 = Streak.generateY()
    this.x1 = this.direction === 1 ? -this.radius : canvas.width
    this.cos = this.direction === 1 ? cosA : cosB
    this.sin = this.direction === 1 ? sinA : sinB
  }

  tick() {
    const cos = this.speed * this.cos
    const sin = this.speed * this.sin
    this.x1 = this.x1 + this.direction * cos
    this.y1 = this.y1 + this.direction * sin
    this.x2 = this.x1 + this.radius * this.cos
    this.y2 = this.y1 + this.radius * this.sin
    this.speed = Math.pow(this.speed, 1.0025)
    return this.isOffscreen()
  }

  isOffscreen() {
    if (this.direction === 1) {
      return this.y1 < 0 || this.x1 > canvas.width
    }
    return this.y2 < 0 || this.x2 < 0
  }

  static generateDirection() {
    return Math.random() > 0.5 ? 1 : -1
  }

  static generateRadius() {
    const factor = canvas.width * 0.5
    return Math.round(Math.random() * factor * 0.75 + factor * 0.25)
  }

  static generateSpeed() {
    return Math.round(Math.random() * props.speed + props.speed)
  }

  static generateY() {
    return Math.round(Math.random() * canvas.height * 2)
  }
}

const streaks = []
const panes = []

function draw() {
  requestAnimationFrame(draw)
  tick()
}

function tick() {
  const offset = 12
  context.fillStyle = props.color
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.lineWidth = props.lineWidth
  const cleanupStreaks = []
  const cleanupPanes = []

  streaks.forEach((streak, i) => {
    const { x1, y1, x2, y2 } = streak

    context.strokeStyle = 'rgba(255,255,255,0.25)'
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()

    context.strokeStyle = 'rgba(255,255,255,0.125)'
    context.beginPath()
    context.moveTo(x1 - offset * streak.direction, y1 + offset)
    context.lineTo(x2 - offset * streak.direction, y2 + offset)
    context.stroke()

    const dead = streak.tick()
    if (dead) {
      cleanupStreaks.push(i)
    }
  })

  context.fillStyle = 'rgba(255,255,255,0.125)'
  context.strokeStyle = 'rgba(255,255,255,0.25)'
  panes.forEach((pane, i) => {
    const { x1, y1, x2, y2, x3, y3, x4, y4 } = pane
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineTo(x4, y4)
    context.lineTo(x3, y3)
    context.closePath()
    context.fill()

    context.beginPath()
    context.moveTo(x1 - offset * pane.direction, y1 + offset)
    context.lineTo(x2 - offset * pane.direction, y2 + offset)
    context.lineTo(x4 - offset * pane.direction, y4 + offset)
    context.lineTo(x3 - offset * pane.direction, y3 + offset)
    context.closePath()
    context.stroke()

    const dead = pane.tick()
    if (dead) {
      cleanupPanes.push(i)
    }
  })

  for (let i = cleanupStreaks.length - 1; i >= 0; i--) {
    streaks.splice(cleanupStreaks[i], 1)
  }
  for (let i = cleanupPanes.length - 1; i >= 0; i--) {
    panes.splice(cleanupPanes[i], 1)
  }
  if (streaks.length < props.streakNum) {
    streaks.push(new Streak())
  }
  if (panes.length < props.paneNum) {
    panes.push(new Pane())
  }
}

onMounted(() => {
  canvas = canvasRef.value
  context = canvas.getContext('2d')
  draw()
})
</script>

<style lang="scss" scoped>
.ripple-container {
  width: 100%;
  height: 100%;
}
</style>
