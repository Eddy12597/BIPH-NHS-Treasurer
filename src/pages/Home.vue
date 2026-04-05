<script setup lang="ts">
import Header from "../components/Header.vue";
import SubSection from "../components/SubSection.vue";

import { ref } from "vue";
import { getUpcomingEvents, getStats } from "../components/main.vue"

let upcomingEvents = ref(getUpcomingEvents());
let stats = ref(getStats());

</script>

<template>
  <Header></Header>
  <div id="hero">
		<h1>BIPH NHS Treasury</h1>
		<p>An organized, systemized, and traceable approach to NHS event financials.</p>
		<!-- <p>
			
		</p> -->
  </div>

  <div id="section-1">
		<h2>Actions</h2>
		<div id="section-1-subsections">
			<SubSection title="Submit Budget Proposal">
				<a href="https://youtube.com/">Fill out form</a>
			</SubSection>
			<SubSection title="Request Reimbursement">
				<a href="https://youtube.com/">Fill out form</a>
			</SubSection>
		</div>
  </div>

  <div id="section-2">
		<h2>Upcoming Events | Stats</h2>
		<div id="events-and-stats">
			<div id="events">
				<SubSection 
					v-for="event in upcomingEvents" 
					:key="event.eventName"
					:title="event.eventName"
					color="white"
				>
					<p><strong>Chair:</strong> {{ event.eventChair }}</p>
					<p v-if="event.approxTotalBudget">
						<strong>Budget:</strong> ￥{{ event.approxTotalBudget.toLocaleString() }}
					</p>
					<p v-else>
						<strong>Budget:</strong> TBD
					</p>
				</SubSection>
			</div>

			<div id="events-stats-sep-line"></div>

			<div id="stats">
				<p><strong>Current Balance:</strong> ￥{{ stats.balance }}</p>
				<p><strong>Pending Proposals:</strong> {{ stats.pending_proposals }}</p>
				<p><strong>Pending Reimbursements:</strong> {{ stats.pending_reimbursements }}</p>
				<p><strong>Approved Proposals:</strong> {{ stats.approved_proposals }}</p>
				<p><strong>Approved Reimbursements:</strong> {{ stats.approved_reimbursements }}</p>
			</div>
		</div>
  </div>
</template>

<style lang="css" scoped>

/* * {
	outline: green 1px dashed;
} */

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
	/* height: 50vh; */
	animation: fadeIn 2s ease-in-out;

	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5vh;
	margin-bottom: 7.5vh;
}

#section-1-subsections {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10vw;
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

#section-2 {
	width: 100%;
	height: 50vh;
	animation: fadeIn 2s ease-in-out;

	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5vh;
	padding-top: 5vh;
	color: white;

	background-color: var(--blue1);
	gap: 3vh;
}

#events-and-stats {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5vw;
}

#events-stats-sep-line {
	border: 1px white solid;
	height: 90%;
	width: 0;
}

#stats {
	margin-left: 4vw;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 50px;
}

</style>