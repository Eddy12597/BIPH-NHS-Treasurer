<script setup lang="ts">
import Header from "../components/Header.vue";
import SubSection from "../components/SubSection.vue";
import RollingStats from "../components/RollingStats.vue"
import Footer from "../components/Footer.vue";

import { onMounted, onUnmounted, ref, computed } from "vue";
import { UpcomingEvent, getStatsAndUpcomingEvents } from "../components/main.ts"
import type { Stats } from "../components/main.ts"

let loadingPlaceholder = ref(" [ loading... ]")

// Replace your old stats ref with this one:
let stats = ref<{stats: Stats, upcoming_events: Array<UpcomingEvent>}>({
  "stats": {
    "balance": 0,
    "pending_proposals": 0,
    "pending_reimbursements": 0,
    "approved_proposals": 0,
    "approved_reimbursements": 0,
  },
  "upcoming_events": [
    {
      "event_name": "Loading ...",
      "event_chair": "Loading ...",
      "event_start_date": new Date().toISOString().split('T')[0] // Adds today's date as placeholder
    }
  ]
});

// Sorting Logic: Earliest date first
const sortedEvents = computed(() => {
  if (!stats.value.upcoming_events) return [];

  return [...stats.value.upcoming_events].sort((a, b) => {
    // If an event lacks a date, push it to the end
    if (!a.event_start_date) return 1;
    if (!b.event_start_date) return -1;
    
    return new Date(a.event_start_date).getTime() - new Date(b.event_start_date).getTime();
  });
});

// Helper function for the template to prevent "Invalid Date" text
const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return "TBD";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "TBD" : d.toLocaleDateString();
};

onMounted(async () => {
  stats.value = await getStatsAndUpcomingEvents();
  loadingPlaceholder.value = ""
//   console.log(`sortedEvents.value[0].event_date: ${sortedEvents.value[0].event_start_date}`)
})

const section2Ref = ref<HTMLElement | null>(null);
const isSection2Visible = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (!section2Ref.value) return;
  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isSection2Visible.value) {
          isSection2Visible.value = true;
          if (observer && section2Ref.value) {
            observer.unobserve(section2Ref.value);
          }
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  observer.observe(section2Ref.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <Header></Header>
  <div id="hero">
    <h1>BIPH NHS Treasury</h1>
    <p>An organized, systemized, and traceable approach to NHS event financials.</p>
  </div>

  <div id="section-1">
    <h2>Actions</h2>
    <div id="section-1-subsections">
      <SubSection title="Submit Budget Proposal">
        <router-link to="/submit-proposal">Fill out form</router-link>
      </SubSection>
      <SubSection title="Request Reimbursement">
        <router-link to="/request-reimbursement">Fill out form</router-link>
      </SubSection>
    </div>
  </div>

  <div ref="section2Ref" id="section-2" :class="{ 'fade-in-visible': isSection2Visible}">
    <h2>Upcoming Events | Stats{{ loadingPlaceholder }}</h2>
    <div id="events-and-stats">
      
      <div id="events-scroll-container">
        <div id="events">
          <SubSection 
            v-for="event in sortedEvents" 
            :key="event.event_name"
            :title="event.event_name"
            color="white"
          >
            <p><strong>Date:</strong> {{ formatDate(event.event_start_date) }}</p>
            <p><strong>Chair:</strong> {{ event.event_chair }}</p>
            <p v-if="event.approx_total_budget">
              <strong>Budget:</strong> ￥{{ event.approx_total_budget.toLocaleString() }}
            </p>
            <p v-else>
              <strong>Budget:</strong> TBD
            </p>
          </SubSection>
        </div>
      </div>

      <div id="events-stats-sep-line"></div>

      <div id="stats">
        <RollingStats title="Balance" :target="stats.stats.balance"></RollingStats>
        <RollingStats title="Pending Proposals" :target="stats.stats.pending_proposals"></RollingStats>
        <RollingStats title="Pending Reimbursements" :target="stats.stats.pending_reimbursements"></RollingStats>
        <RollingStats title="Approved Proposals" :target="stats.stats.approved_proposals"></RollingStats>
        <RollingStats title="Approved Reimbursements" :target="stats.stats.approved_reimbursements"></RollingStats>
      </div>
    </div>
  </div>

  <Footer></Footer>
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

#hero h1, #hero p { animation: fadeIn 0.75s ease-in-out; }
#hero h1 { padding-top: 2vh; font-size: 3.5em; }
#hero p { font-size: 1.3em; font-weight: normal; }

#section-1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 4vh 0 4vh 0;
  animation: fadeIn 2s ease-in-out;
}

#section-1-subsections {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10vw;
  margin-top: 10vh;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; }
}

#section-2 {
  width: 100%;
  min-height: 60vh; /* Changed from height to min-height */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
  padding: 5vh 0;
  color: white;
  background-color: var(--blue1);
  gap: 3vh;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.5s ease-out, transform 1s ease-out;
}

#section-2.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}

#events-and-stats {
  display: flex;
  align-items: flex-start; /* Align to top for better scrolling look */
  justify-content: center;
  gap: 5vw;
  width: 90%;
}

/* Scrollable Container Logic */
#events-scroll-container {
  max-height: 50vh; 
  overflow-y: auto;
  padding-right: 15px; /* Space for scrollbar */
}

/* Hide scrollbar for Chrome/Safari but keep functionality */
#events-scroll-container::-webkit-scrollbar {
  width: 6px;
}
#events-scroll-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

#events {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#events-stats-sep-line {
  border: 1px white solid;
  align-self: stretch; /* Line matches container height */
  width: 0;
}

#stats {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
}
</style>