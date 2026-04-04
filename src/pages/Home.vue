<script setup lang="ts">
import Header from "../components/Header.vue";
</script>

<template>
  <Header></Header>
  <div id="hero">
		<h1>BIPH NHS Treasury</h1>
		<p>An organized, systemized, and traceable approach to NHS event financials.</p>
  </div>

  <div id="section-1">
		ABCDEFG
  </div>
</template>

<style lang="css" scoped>

#hero {
	width: 100%;
	height: 50vh;


	display: flex;
	flex-direction: column;
	align-items: center;

	background-image: url("../assets/induction-ceremony-group-pic.png");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;	
	position: relative;

	font-weight: bold;
	color: white;

	padding-top: 20vh;
	gap: 5vh;

}

#hero h1,
#hero p {
    animation: fadeIn 0.75s ease-in-out;
}

#hero h1 {
	padding-top: 2vh;
	font-size: 3.5em;
}

#hero p {
	font-size: 1.3em;
	font-weight: normal;
}

#section-1 {
	width: 100%;
	height: 50vh;
	animation: fadeIn 2s ease-in-out;

	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10vh;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
	}
}

</style>