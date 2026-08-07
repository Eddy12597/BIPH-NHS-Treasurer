<template>
<Header></Header>

<div id="log-hero">
    <h1>Logs</h1>
    <!-- <p>Transparency and verifiability using blockchain-like structures. </p> -->
		<!-- <p>This ledger uses a Cryptographic Linked List. Each entry contains a digital signature of the previous record, ensuring that any unauthorized change to past data will immediately break the chain's integrity.</p> -->
<!--     
    <div :class="['status-badge', verified === true ? 'valid' : verified === false ? 'invalid' : 'checking']">
			<span v-if="verified === true">🔒 Integrity Verified</span>
			<span v-else-if="verified === false">🔓 Ledger Tampered</span>
			<span v-else>Verifying Records...</span>
		</div> -->

    <div id="bal-and-refresh">
			<p id="bal-text">Current Balance: {{ balance }}</p>
			<div id="refresh-btn-div">
				<button @click="() => fetchData()" id="refresh-btn">
					Refresh
				</button>
			</div>
		</div>
</div>

<div id="log-section">
	<div id="tools-log">
		<div id="log-switch-format">

		</div>
		<div id="log-searchbar-div">

		</div>
		<div id="log-export-btn-div">
			<button @click="() => downloadCSV()" id="export-btn">
				Export as .csv
			</button>
		</div>
	</div>
	<DataPlaceholder :target="transactions">
			<LogItem v-for="tx in displayTransactions" :transaction="tx">
			</LogItem>
	</DataPlaceholder>
</div>
<!-- <div id=gs-log-iframe-div>
	<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS-gfTYwixpbqnhDOpZPVQruQvwD-dEygWhxnCFntwKAFdiV3BjitAmOa27j6Awg5mvTGGFdgqatvCZ/pubhtml?gid=164586908&amp;single=true&amp;widget=true&amp;headers=false" id="gs-log-iframe"></iframe>
</div> -->
<Footer></Footer>
</template>

<style scoped>

#gs-log-iframe-div {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin: 20px;
	height: 50vh;
}

#gs-log-iframe {
	width: 100%;
	height: 100%;
}

#export-btn {
	cursor: pointer;
	padding: 1.1vh 2.15vh 1.1vh 2.15vh;
	border-radius: 5px;
	outline: black solid 1px;
	border: none;
	background-color: white;
	outline-offset: -3px;
	font-size: 1em;
}

#export-btn:hover {
	background-color: var(--blue1);
	color: white;
	outline-color: white;
	outline-offset: -3px;
}

#export-btn:active {
	background-color: var(--blue2);
}

#tools-log {
	display: flex;
	justify-content: center;
	align-items: center;
}

#bal-and-refresh {
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 1.75vh;
}

#refresh-btn {
	cursor: pointer;
	padding: 1.1vh 2.15vh 1.1vh 2.15vh;
	border-radius: 5px;
	outline: black solid 1px;
	border: none;
	background-color: white;
	outline-offset: -3px;
	font-size: 1em;
}

#refresh-btn:hover {
	background-color: var(--blue1);
	color: white;
	outline-color: white;
	outline-offset: -3px;
}

#refresh-btn:active {
	background-color: var(--blue2);
}

#log-hero {
    height: 20vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 3vh;
    /* background-image: url("../assets/blockchain-diagram.png"); */
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    /* background-color: #7B7B7B; */
	background-color: var(--blue1);
    gap: 2vh;
    color: white;
    font-family: Roboto;
}


/* Badge Styles */
.status-badge {
    padding: 10px 25px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 1.2em;
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
    font-size: 1.25em;
    font-family: Roboto;
		margin-left: 15vw;
		margin-right: 15vw;
}

#log-section {
	margin-top: 3vh;
	margin-left: 12vw;
	margin-right: 12vw;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	gap: 3vh;
}
</style>

<script setup lang="ts">
function exportToCSV(data: Array) {
  if (!data || !data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  csvRows.push(headers.join(','));
  
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header] || '';
      if (typeof val === 'string' && (val.includes(',') || val.includes('"'))) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
}

function downloadCSV(data=transactions.value, filename = 'export.csv') {
	console.log(`data to be downloaded: ${data}`)
	const csvContent = exportToCSV(data);
	
	const blob = new Blob([csvContent ?? ''], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	const url = URL.createObjectURL(blob);
	
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

// @ts-ignore
const BACKEND_URL = window.__APP_CONFIG__?.API_URL || import.meta.env.BACKEND_URL; 
// const BACKEND_URL = "http://localhost:5000"

import { ref, onMounted, computed } from 'vue';
import LogItem from '../components/LogItem.vue';
import CryptoJS from 'crypto-js';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import DataPlaceholder from '../components/DataPlaceholder.vue';
import type { Transaction } from '../components/main';

let balance = ref("Loading ...");

const transactions = ref<Transaction[]>([]);


const displayTransactions = computed(() => {
	if (!transactions.value) return [];
	console.table(transactions.value)
  	return [...transactions.value.filter(tx => tx.From !== null && tx.From !== '' && tx.From !== undefined)].reverse();
});

const verified = ref<boolean | null>(null);

// const verifyChain = (): void => {
//   // This is the "Previous Hash" for the first-ever block
//   let rollingLink = '0000000000000000000000000000000000000000000000000000000000000000'; 
  
//   for (let i = 0; i < transactions.value.length; i++) {
//     const tx = transactions.value[i] as any; 
    
//     // 1. Reconstruct the base string using the link from the block BEFORE it
//     const baseData = tx.Timestamp + tx.From + tx.To + tx.Amount + tx.Notes + rollingLink;
//     const computed = CryptoJS.SHA256(baseData + tx.Nonce).toString();
    
//     tx.ComputedHash = computed;

//     // 2. Check: Does it have 6 zeros?
//     if (!computed.startsWith("000000")) {
//         verified.value = false;
//         console.error(`PoW Failure at Index ${i}`);
//         return;
//     }

//     // 3. Check: Does it match the 'Hash' column in your Sheet?
//     if (computed !== tx.Hash) { 
//       verified.value = false;
//       console.error(`Integrity Failure at Index ${i}. \nSheet has: ${tx.Hash}\nVue computed: ${computed}`);
//       return;
//     }
    
//     // 4. ROLL FORWARD: The current verified hash becomes the link for the NEXT block
//     rollingLink = tx.Hash; 
//   }
  
//   verified.value = true;
// };

const verifyChain = (): void => {
  // Same starting salt
  let rollingLink = '0000000000000000000000000000000000000000000000000000000000000000'; 
  
  for (let i = 0; i < transactions.value.length; i++) {
    const tx = transactions.value[i] as any; 
    
    // The baseData no longer needs a Nonce
    const baseData = tx.Timestamp + tx.From + tx.To + tx.Amount + tx.Notes + rollingLink;
    const computed = CryptoJS.SHA256(baseData).toString();
    
    tx.ComputedHash = computed;

    // We ONLY check if the computed hash matches what's in your sheet
    if (computed !== tx.Hash) { 
      verified.value = false;
      console.error(`Chain broken at index ${i}! Data has been modified.`);
      return;
    }
    
    rollingLink = tx.Hash; 
  }
  
  verified.value = true;
};


const fetchData = async (url: string = `${BACKEND_URL}/get-logs`) => {
	balance.value = "Loading...";
	transactions.value = [];
	try {
		console.log(`fetching from: ${url}`);
		let res = await fetch(url);
		let result = await res.json();
		transactions.value = result.data;
		transactions.value = transactions.value.filter(tx => tx.From !== null && tx.From !== '' && tx.From !== undefined)
		console.table(transactions.value);

		if (transactions.value.length > 0) {
			balance.value = String(transactions.value[transactions.value.length - 1].Balance);
		}
	} catch (err) {
		console.error("Fetch error:", err);
		balance.value = "Error";
	}
}

onMounted(async () => {
  	await fetchData();
});
</script>