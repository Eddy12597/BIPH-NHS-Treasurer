<template>
  <div class="data-placeholder-wrapper">
    <template v-if="isLoading">
      <div class="placeholder-container">
        <slot name="placeholder">
          <div class="default-spinner">
            <div class="spinner"></div>
            <p>Loading data...</p>
          </div>
        </slot>
      </div>
    </template>

    <template v-else>
      <slot :data="(target as T)"></slot>
    </template>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
/** * Adding `generic="T"` makes this component accept any data type 
 * without throwing the "not assignable to null" error.
 */
const props = defineProps<{
  target: T | null | undefined;
}>();

const isLoading = computed(() => {
  // Checks if target is null, undefined, or an empty array
  return props.target === null || 
         props.target === undefined || 
         (Array.isArray(props.target) && props.target.length === 0);
});
</script>

<style scoped>
.placeholder-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>