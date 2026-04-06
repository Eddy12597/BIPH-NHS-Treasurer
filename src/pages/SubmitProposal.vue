<template>
  <Header></Header>

  <div id="hero-submit">
    Submit Proposal
  </div>

  <div id="verification" v-if="!isVerified">
    <!-- <vue-turnstile site-key="1x00000000000000000000AA" v-model="token"></vue-turnstile> -->
	 <vue-turnstile site-key="0x4AAAAAAC1OOWY-M8dbMzWN" v-model="token"></vue-turnstile>
  </div>

  <div v-else class="success-container">
    <div class="proposal-section" id="section-1-info">
			<BudgetProposal></BudgetProposal>	
		</div>
  </div>

  <Footer></Footer>
</template>

<style scoped>
#hero-submit {
  height: 20vh;
  background-color: var(--blue1);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 2em;
  color: white;
}

#verification {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.success-container {
  text-align: center;
  padding: 50px;

  padding-left: 10vw;
	padding-right: 10vw;
	
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 10vh;
}

.success-container h2 {
	color: var(--blue1);
}

</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Header from '../components/Header.vue';
import VueTurnstile from 'vue-turnstile';

import BudgetProposal from '../components/BudgetProposal.vue';
import Footer from '../components/Footer.vue';

const isVerified = ref(false);
const token = ref("");

// Watch the token. When Turnstile finishes, it updates 'token'.
watch(token, async (newToken) => {
  if (newToken) {
    const isValid = await verifyWithBackend(newToken);
    if (isValid) {
      isVerified.value = true;
    }
  }
});

// Mock backend verification logic
const verifyWithBackend = async (token: string) => {
  console.log("Verifying token:", token);
  // In production, send 'token' to your Node/Python/Go server via fetch/axios
  return true; 
};
</script>