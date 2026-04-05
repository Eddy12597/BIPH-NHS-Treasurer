<script setup lang="ts">
import Header from "../components/Header.vue";
import SubSection from "../components/SubSection.vue";
import RollingStats from "../components/RollingStats.vue"

import { onMounted, onUnmounted, ref } from "vue";
import { getUpcomingEvents, getStats } from "../components/main.ts"

let upcomingEvents = ref(getUpcomingEvents());
let stats = ref(getStats());

const section2Ref = ref<HTMLElement | null>(null);
const isSection2Visible = ref(false);let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!section2Ref.value) return;
  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isSection2Visible.value) {
          isSection2Visible.value = true;
          // Optional: unobserve after animation starts
          if (observer && section2Ref.value) {
            observer.unobserve(section2Ref.value);
          }
        }
      });
    },
    { 
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Adjust this if needed
    }
  );
  
  observer.observe(section2Ref.value);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

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

  <div ref="section2Ref" id="section-2" :class="{ 'fade-in-visible': isSection2Visible}">
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
				<RollingStats title="Balance" :target="stats.balance"></RollingStats>
				<RollingStats title="Pending Proposals" :target="stats.pending_proposals"></RollingStats>
				<RollingStats title="Pending Reimbursements" :target="stats.pending_reimbursements"></RollingStats>
				<RollingStats title="Approved Proposals" :target="stats.approved_proposals"></RollingStats>
				<RollingStats title="Approved Reimbursements" :target="stats.approved_reimbursements"></RollingStats>
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
	justify-content: space-around;
	margin: 4vh 0 4vh 0;
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

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  padding-top: 5vh;
  color: white;

  background-color: var(--blue1);
  gap: 3vh;
  
  /* Initially hidden */
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.5s ease-out, transform 1s ease-out;
}

/* Class that triggers the fade in */
#section-2.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
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