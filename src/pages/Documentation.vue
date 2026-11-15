<template>
<Header></Header>


<div id="docs-overall">
	<div class="docs-header">
		<h1>Documentation</h1>
	</div>

	<p class="docs-description">Site in development</p>
	<p class="docs-description">Will contain things like /api/logs, /api/submit-proposal, /api/request-reimbursement</p>
</div>


<Footer></Footer>
</template>

<style scoped>

#docs-overall {
	display: flex;
	align-items: center;
	flex-direction: column;
}

.docs-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	height: 20vh;
	width: 100vw;
	size: 100%;
	background: var(--blue1);
	color: white;
}

.docs-description {
	font-family: consolas;
	font-size: 1.25em;
	color: rgb(58, 58, 58);
	margin: 2%;
}

</style>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'



</script>