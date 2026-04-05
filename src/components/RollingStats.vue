<template>
  <div ref="containerRef" class="stat-box">
    <p>
      <strong>{{ title }}: </strong> 
      <span :style="{ color: color }">{{ animatedValue }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  title?: string
  target: number
  color?: string
  duration?: number
  threshold?: number // Intersection threshold (0-1)
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  color: 'white',
  duration: 2000,
  threshold: 0.1 // Start animation when 10% of element is visible
})

const containerRef = ref<HTMLElement | null>(null)
const animatedValue = ref('0')
let animationStarted = false
let observer: IntersectionObserver | null = null
let animationFrameId: number | null = null

const animateNumber = () => {
  if (animationStarted) return
  
  animationStarted = true
  const start = 0
  const end = props.target
  const range = end - start
  const startTime = performance.now()
  
  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // Easing function for smooth deceleration
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const current = Math.floor(start + range * easeOutCubic)
    
    animatedValue.value = current.toLocaleString()
    
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(update)
    } else {
      animatedValue.value = end.toLocaleString()
      animationFrameId = null
    }
  }
  
  animationFrameId = requestAnimationFrame(update)
}

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !animationStarted) {
      animateNumber()
      // Optional: unobserve after animation starts to save resources
      if (observer && containerRef.value) {
        observer.unobserve(containerRef.value)
      }
    }
  })
}

onMounted(() => {
  if (!containerRef.value) return
  
  // Create Intersection Observer
  observer = new IntersectionObserver(handleIntersection, {
    threshold: props.threshold,
    rootMargin: '0px' // Can be adjusted to trigger earlier/later
  })
  
  observer.observe(containerRef.value)
})

onUnmounted(() => {
  // Clean up observer
  if (observer) {
    observer.disconnect()
  }
  
  // Cancel animation if component unmounts
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>