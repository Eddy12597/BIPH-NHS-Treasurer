<template>
	<div class="subsection-item" :style="{ width: width, height: height, color: color, outlineColor: color }">
		<h2 class="subsection-title" :style="{ color: color }">{{ title }}</h2>
		<slot class="subsection-text"></slot>
	</div>
</template>

<style scoped>
.subsection-item {
	display: flex;
	align-items: center;
	flex-direction: column;
	box-shadow: lightgray;
	outline: black 2px solid;
	border-radius: 20px;
	padding: 2vh 1vw 2vh 1vw;
	gap: 2vh;

	margin: 30px;
}
.subsection-title {
	font-size: 2vh;
	color: black;
}
.subsection-text {
	color: black;
}

.subsection-item:hover,
.subsection-item:active {
  transform: translateY(-7.5px);
  transition: transform 0.3s ease-in-out;
}

</style>

<script setup lang="ts">

interface Props {
  title: string,
  width?: string,
  height?: string,
  color?: string
}

withDefaults(defineProps<Props>(), {
  title: "Title",
  width: "40vw",
  height: "auto",
  color: "black"
});

</script>