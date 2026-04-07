<template>
<Header></Header>

<div id="log-hero">
    <h1>Logs | "Blockchain"</h1>
    <p>Transparency and verifiability using blockchain-like structures. </p>
		<p>Transaction data (before appending nonce) is the augmentation of Timestamp, From, To, Amount, Notes, and Previous Hash. Adding Nonce to Transaction data makes a hash starting with 6 leading 0s.</p>
    
    <div :class="['status-badge', verified === true ? 'valid' : verified === false ? 'invalid' : 'checking']">
        <span v-if="verified === true">✓ Chain Verified</span>
        <span v-else-if="verified === false">⚠ Chain Compromised</span>
        <span v-else>Searching for Genesis...</span>
    </div>

    <p>Current Balance: {{ balance }}</p>
</div>

<div id="log-section">
    <DataPlaceholder :target="transactions">
        <LogItem v-for="log in displayTransactions" :key="log.PrevHash" :transaction="log">
        </LogItem>
    </DataPlaceholder>
</div>

<Footer></Footer>
</template>

<style scoped>
#log-hero {
    height: 50vh; /* Increased slightly for the badge */
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 15vh;
    background-image: url("../assets/blockchain-diagram.png");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #7B7B7B;
    gap: 5vh;
    color: white;
    font-family: Roboto;
}

/* Badge Styles */
.status-badge {
    padding: 10px 25px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 1.1em;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.valid {
    background-color: #2ecc71;
    color: white;
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.4);
}

.invalid {
    background-color: #e74c3c;
    color: white;
    box-shadow: 0 0 15px rgba(231, 76, 60, 0.4);
    animation: shake 0.5s;
}

.checking {
    background-color: #f1c40f;
    color: #2c3e50;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

#log-hero h1 {
    font-size: 2.5em;
}

#log-hero p {
    font-size: 1.5em;
    font-family: Roboto;
		margin-left: 15vw;
		margin-right: 15vw;
}

#log-section {
	margin-top: 3vh;
}
</style>

<script setup lang="ts">
// @ts-ignore
const BACKEND_URL = window.__APP_CONFIG__?.API_URL || import.meta.env.BACKEND_URL; 

import { ref, onMounted, computed } from 'vue';
import LogItem from '../components/LogItem.vue';
import CryptoJS from 'crypto-js';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import DataPlaceholder from '../components/DataPlaceholder.vue';

let balance = ref("Loading ...");

interface Transaction {
  Timestamp: string,
  From: string,
  To: string,
  Amount: number,
  PropID: string,
  Balance: number,
  Notes: string,
  PrevHash: string,
  Nonce: string
}

const transactions = ref<Transaction[]>([]);

const displayTransactions = computed(() => {
  return [...transactions.value].reverse();
});

const verified = ref<boolean | null>(null);

const verifyChain = (): void => {
  // Use '0' if that was your initial genesis input in Python
  let expectedPrevHash = '0'; 
  
  for (let i = 0; i < transactions.value.length; i++) {
    const tx = transactions.value[i];
    
    // Exact match of your Python base_data order
    const baseData = tx.Timestamp + tx.From + tx.To + tx.Amount + tx.Notes + expectedPrevHash;
    const computedHash = CryptoJS.SHA256(baseData + tx.Nonce).toString();
    
    // Check Proof of Work (6 zeros)
    if (!computedHash.startsWith("000000")) {
        verified.value = false;
        console.error(`PoW failed at index ${i}. Hash: ${computedHash}`);
        return;
    }

    // Check Linkage
    if (computedHash !== tx.PrevHash) {
      verified.value = false;
      console.error(`Integrity failed at index ${i}. Got ${computedHash} but expected ${tx.PrevHash}`);
      return;
    }
    
    expectedPrevHash = tx.PrevHash;
  }
  
  verified.value = true;
};

onMounted(async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/get-logs`);
    const result = await res.json();
    transactions.value = result.data;
    
    verifyChain();
    
    if (transactions.value.length > 0) {
      balance.value = String(transactions.value[transactions.value.length - 1].Balance);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    balance.value = "Error";
  }
});
</script>