<template>
<Header></Header>

<div id="log-hero">
	<h1>Logs | "Blockchain"</h1>
	<p>Transparency and verifiability using blockchain-like structures</p>
</div>

<div id="log-section">
	<LogItem v-for="log in transactions" :key="log.PrevHash" :transaction="log">
	</LogItem>
</div>

</template>

<style scoped>
#log-hero {
	height: 45vh;
	display: flex;
	align-items: center;
	flex-direction: column;

	padding-top: 20vh;
	background-image: url("../assets/blockchain-diagram.png");
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	background-color: #A0A0A0;

	gap: 10vh;
	color: white;
	font-family: Roboto;
}

#log-hero h1 {
	font-size: 2.5em;
}

#log-hero p{
	font-size: 1.5em;
	font-family: Roboto;
}

</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CryptoJS from 'crypto-js';
import Header from '../components/Header.vue';

interface Transaction {
  Timestamp: string,
  From: string,
  To: string,
  Amount: number,
  PropID: string,
  Balance: number,
  Notes: string,
  PrevHash: string
}

const transactions = ref<Transaction[]>([]);
const verified = ref<boolean | null>(null);

const verifyChain = (): void => {
  let prevHash = '0'; // Genesis
  
  for (let i = 0; i < transactions.value.length; i++) {
    const tx = transactions.value[i];
    const data = tx.Amount + tx.Notes + tx.Timestamp + prevHash;
    const computedHash = CryptoJS.SHA256(data).toString();
    
    if (computedHash !== tx.PrevHash) {
      verified.value = false;
      return;
    }
    
    prevHash = tx.PrevHash;
  }
  
  verified.value = true;
};

onMounted(async () => {
  const res = await fetch('https://eddy12598.pythonanywhere.com/get-logs');
//   const res = await fetch('http://localhos')
  transactions.value = await res.json();
  verifyChain();
});
</script>