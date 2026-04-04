<template>
<header>
	<div id="header-left">
		<router-link to="/" id="logo-pic">
			<picture>
				<source srcset="../assets/nhs-logo.png">
				<img src="../assets/nhs-logo.png" alt="NHS-LOGO">
			</picture>
		</router-link>
	</div>
	<div id="header-menubar" v-if="isLargeScreen">
		<!--Normal-->
		<MenubarItem text="Home" to="/"></MenubarItem>
		<MenubarItem text="About" to="/about"></MenubarItem>
	</div>
	<div id="header-menubar-small" v-else>
		<!--Small-->

	</div>
</header>
</template>

<style scoped>

header {
	margin-top: 1vh;
	margin-bottom: 1vh;
	height: 7.5vh;
	display: flex;
	align-items: center;
	border-bottom: 1px solid var(--blue-1-);
}  

#header-left {
	display: flex;
	align-items: center; 
	justify-content: center;
	height: 100%;
	width: 35%;
}

#header-menubar {
	margin-left: 10%;
	width: 65%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
}

.menubar-item {
	font-size: 1.25em;
}

#logo-pic {
	height: 105%;
	display: block;
}

#logo-pic img {
	height: 100%;
	width: auto;
	display: block;
	object-fit: contain;
}
</style>

<script setup lang="ts">
import MenubarItem from "./MenubarItem.vue"
import { ref, onMounted, onUnmounted, computed } from 'vue'

const windowWidth = ref(window.innerWidth);

const isLargeScreen = computed(() => windowWidth.value > 700);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', updateWidth);
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
})
</script>