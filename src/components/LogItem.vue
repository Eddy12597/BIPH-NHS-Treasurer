<template>
  <div class="log-container">
    <div class="log-header">
      <div class="log-type">
        <span class="type-badge" :class="{ 'incoming': isIncoming, 'outgoing': isOutgoing }">
          {{ transactionType }}
        </span>
        <span class="timestamp">{{ formattedTimestamp }}</span>
      </div>
      <div class="amount" :class="{ 'amount-in': isIncoming, 'amount-out': isOutgoing }">
        {{ formattedAmount }}
      </div>
    </div>

    <div class="log-details">
      <div class="detail-row">
        <span class="detail-label">From:</span>
        <span class="detail-value from-address">{{ transaction.From }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">To:</span>
        <span class="detail-value to-address">{{ transaction.To }}</span>
      </div>
      <div class="detail-row" v-if="transaction.PropID">
        <span class="detail-label">Prop ID:</span>
        <span class="detail-value">{{ transaction.PropID }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Balance:</span>
        <span class="detail-value">{{ formatNumber(transaction.Balance) }}</span>
      </div>
      <div class="detail-row" v-if="transaction.Notes">
        <span class="detail-label">Notes:</span>
        <span class="detail-value notes">{{ transaction.Notes }}</span>
      </div>
			<div class="detail-row hash-row">
					<span class="detail-label">Computed Block Hash:</span>
					<span class="detail-value hash" :class="{ 'text-error': transaction.ComputedHash !== transaction.Hash }">
						{{ truncateString(transaction.ComputedHash) }}
					</span>
			</div>
      <div class="detail-row hash-row">
        <span class="detail-label">Previous Hash:</span>
        <span class="detail-value hash">{{ truncatedHash }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Transaction } from './main.ts'

const props = defineProps({
  transaction: {
    type: Object as PropType<Transaction>,
    required: true,
    validator: (value: Transaction): boolean => {
      // Use !! to ensure a strict boolean return type
      return !!(value.Timestamp && value.From && value.To && typeof value.Amount === 'number')
    }
  }
})

// Determine if transaction is incoming or outgoing
const isIncoming = computed(() => {
  // You might want to compare with current user's address
  // For now, let's assume 'System' or empty From means incoming
  return props.transaction.From === 'System' || props.transaction.From === 'Treasurer' || props.transaction.From === '';
})

const isOutgoing = computed(() => {
  return !isIncoming.value && props.transaction.Amount < 0
})

const transactionType = computed(() => {
  if (isIncoming.value) return 'INCOMING'
  if (isOutgoing.value) return 'OUTGOING'
  return 'TRANSFER'
})

// Format timestamp
const formattedTimestamp = computed(() => {
  const date = new Date(props.transaction.Timestamp)
  return date.toLocaleString()
})

// Format amount
const formattedAmount = computed(() => {
  const absAmount = Math.abs(props.transaction.Amount)
  const prefix = isIncoming.value ? '+' : (isOutgoing.value ? '-' : '')
  return `${prefix}${formatNumber(absAmount)}`
})

// Truncate hash for display
const truncatedHash = computed(() => {
  const hash = props.transaction.PrevHash
  if (!hash || hash.length <= 16) return hash
  return `${hash.slice(0, 12)}...${hash.slice(-8)}`
})

// Helper function to format numbers
const formatNumber = (value: any) => {
  if (typeof value !== 'number') return value
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(value)
}

const truncateString = (value: string, length = 12, endlength = 8) => {
	return !value ? '' : (value.length > length ? value.slice(0, length) + '...' + value.slice(-endlength) : value);
}
</script>

<style scoped>
.log-container {
  background: white;
  color: black;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
}

.log-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-color: var(--blue1, #3b82f6);
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.log-type {
  display: flex;
  align-items: center;
  gap: 12px;
}

.type-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

.type-badge.incoming {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.type-badge.outgoing {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.type-badge:not(.incoming):not(.outgoing) {
  background: rgba(59, 130, 246, 0.1);
  color: var(--blue1, #3b82f6);
}

.timestamp {
  font-size: 12px;
  color: #6b7280;
}

.amount {
  font-size: 18px;
  font-weight: 600;
}

.amount-in {
  color: #16a34a;
}

.amount-out {
  color: #dc2626;
}

.amount:not(.amount-in):not(.amount-out) {
  color: var(--blue1, #3b82f6);
}

.log-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 13px;
}

.detail-label {
  min-width: 80px;
  font-weight: 500;
  color: #6b7280;
}

.detail-value {
  flex: 1;
  word-break: break-all;
  color: #1f2937;
}

.from-address, .to-address {
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.hash {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #6b7280;
}

.notes {
  font-style: italic;
  color: #4b5563;
}

.hash-row {
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px dashed #f0f0f0;
}

@media (max-width: 640px) {
  .log-container {
    padding: 12px;
  }
  
  .log-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .detail-row {
    flex-direction: column;
    gap: 4px;
  }
  
  .detail-label {
    min-width: auto;
  }
}

.text-error {
  color: #dc2626 !important;
  font-weight: bold;
}
</style>