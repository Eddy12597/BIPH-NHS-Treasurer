<template>
  <div class="menubar-item">
    <router-link :to="to" :class="{ active: isActive }">
      {{ text }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  to: string;
//   target?: '_blank' | '_self' | '_parent' | '_top';
  isActive?: boolean;
}

withDefaults(defineProps<Props>(), {
//   href: '#',
//   target: '_self',
  isActive: false
});
</script>

<style scoped>
.menubar-item {
  display: inline-block;
}

.menubar-item a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  display: inline-block;
  transition: all 0.3s ease;
}

.menubar-item a:hover {
  color: var(--blue1);
  background-color: #f0f0f0;
}

.menubar-item a.active {
  color: var(--blue1);
  font-weight: bold;
  border-bottom: 2px solid var(--blue1);;
}
</style>