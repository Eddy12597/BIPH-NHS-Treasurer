<template>
  <div ref="containerRef" class="stat-box">
    <p>
      <strong>{{ title }}: </strong> 
      <span :style="{ color: color }">{{ displayValue }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

interface Props {
  title?: string
  target: number
  color?: string
  duration?: number
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  color: 'white',
  duration: 750,
  threshold: 0.1
})

const containerRef = ref<HTMLElement | null>(null)
const currentValue = ref(0)
let animationFrameId: number | null = null
let observer: IntersectionObserver | null = null
let hasAnimated = false

// Use computed for display
const displayValue = computed(() => currentValue.value.toLocaleString())

const animateNumber = () => {
  // Cancel any existing animation
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  
  const start = currentValue.value
  const end = props.target
  const range = end - start
  const startTime = performance.now()
  
  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // Easing function
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const value = Math.floor(start + range * easeOutCubic)
    
    currentValue.value = value
    
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(update)
    } else {
      currentValue.value = end
      animationFrameId = null
    }
  }
  
  animationFrameId = requestAnimationFrame(update)
}

// Watch for target changes
watch(() => props.target, (newVal, oldVal) => {
//   console.log(`RollingStats "${props.title}" - Target changed:`, oldVal, '->', newVal);
  
  if (newVal !== oldVal) {
    // Reset animation flag for this component instance
    hasAnimated = false;
    
    // If the component is visible, animate immediately
    if (containerRef.value) {
      const rect = containerRef.value.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        animateNumber();
        hasAnimated = true;
      } else if (observer && containerRef.value) {
        // Re-observe if not visible
        observer.observe(containerRef.value);
      }
    }
  }
}, { immediate: true })

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !hasAnimated && props.target !== currentValue.value) {
    //   console.log(`RollingStats "${props.title}" - Starting animation for:`, props.target);
      animateNumber();
      hasAnimated = true;
      
      if (observer && containerRef.value) {
        observer.unobserve(containerRef.value);
      }
    }
  })
}

onMounted(() => {
  if (!containerRef.value) return
  
  // Set initial value
  currentValue.value = props.target
  
  // Create Intersection Observer
  observer = new IntersectionObserver(handleIntersection, {
    threshold: props.threshold,
    rootMargin: '0px'
  })
  
  observer.observe(containerRef.value)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>