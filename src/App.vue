<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
    </nav> -->
    
    <!-- This is where pages will appear -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// App logic
</script>

<style scoped>
nav {
  padding: 1rem;
  background-color: #f0f0f0;
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
}

nav a.router-link-active {
  color: #005eb8;
  font-weight: bold;
}
</style>