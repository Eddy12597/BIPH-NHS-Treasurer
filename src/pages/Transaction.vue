<template>
<Header></Header>

<div class="trans-hero">
	<h1>Add Transaction</h1>
</div>

<div class="trans-section">

</div>

<div v-show="!confirmed" class="confirm-btn">
	<button @click="confirmTransaction()">

	</button>
</div>

<div v-show="confirmed" class="confirmation">

</div>

<Footer></Footer>
</template>

<style scoped>
.trans-hero {
	background-color: var(--black1);
	height: 20vh;

	display: flex;
	align-items: center;
	padding-top: 10vh;
	flex-direction: column;

	color: white;
}    
</style>

<script setup lang="ts">
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import { ref } from 'vue';
    
let confirmed = ref(false);

function confirmTransaction() {
	
}

</script>