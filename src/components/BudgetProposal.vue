<template>
  <div class="budget-form-container">
    
    <form @submit.prevent="submitProposal">
      <fieldset>
        <legend>Section 1: Basic Information</legend>
        <div class="field">
          <label>Event Name</label>
          <input v-model="form.event_name" type="text" required />
        </div>
        <div class="field">
          <label>Event Chair</label>
          <input v-model="form.event_chair" type="text" required />
        </div>
        <div class="field">
          <label>Contact Email</label>
          <input v-model="form.contact_email" type="email" required />
        </div>
        <div class="field">
          <label>Event Date</label>
          <input v-model="form.event_start_date" type="date" required />
        </div>
        <div class="field">
          <label>Event Type</label>
          <select v-model="form.event_type">
            <option value="FUNDRAISER_CHARITY">Fundraiser / Charity</option>
            <option value="SPORTS">Sports Activities</option>
            <option value="THEME_BASED">Theme-based (e.g. Teacher's Day)</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </fieldset>

      <fieldset>
        <legend>Section 2: Budget & Revenue</legend>
        <div class="field">
          <label>Expected Revenue ($)</label>
          <input v-model.number="form.expected_revenue" type="number" min="0" step="0.01" />
        </div>

        <label>Itemized Budget</label>
        <div v-for="(item, index) in itemizedRows" :key="index" class="budget-row">
          <input v-model="item.name" placeholder="Item Name" type="text" />
          <input v-model.number="item.cost" placeholder="Cost" type="number" step="0.01" />
          <button type="button" @click="removeItem(index)" v-if="itemizedRows.length > 1">×</button>
        </div>
        <button type="button" @click="addItem" class="add-btn">+ Add Item</button>

        <div class="total-calc">
          <strong>Total Estimated Expenses: ￥{{ totalExpenses }}</strong>
        </div>
      </fieldset>

      <fieldset>
        <legend>Section 3: Justification</legend>
        <div class="field">
          <label>Purpose of Event</label>
          <textarea v-model="form.purpose" rows="3"></textarea>
        </div>
        <div class="field">
          <label>Justification</label>
          <textarea v-model="form.justification" rows="3"></textarea>
        </div>
        <div class="field">
          <label>Why should NHS fund this?</label>
          <textarea v-model="form.nhs_fund_reason" rows="3"></textarea>
        </div>
      </fieldset>

      <fieldset>
        <legend>Section 4: Execution</legend>
        <div class="field">
          <label>Estimated Attendance</label>
          <input v-model.number="form.estimated_attendance" type="number" />
        </div>
        <div class="field">
          <label>Vendors & Suppliers</label>
          <input v-model="form.vendors_suppliers" type="text" placeholder="Names of vendors" />
        </div>
        <div class="field">
          <label>Reimbursement Contact</label>
          <input v-model="form.reimbursement_contact" type="text" />
        </div>
      </fieldset>

      <button 
        type="submit" 
        class="submit-btn" 
        :class="{ 'btn-submitting': isSubmitting, 'btn-error': hasError }"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit Budget Proposal' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
// @ts-ignore
const BACKEND_URL = window.__APP_CONFIG__?.API_URL || import.meta.dev.BACKEND_URL;

const isSubmitting = ref(false);
const hasError = ref(false);

// Sectioned form data
const form = reactive({
  event_name: '',
  event_chair: '',
  contact_email: '',
  event_start_date: '',
  event_type: 'OTHER',
  expected_revenue: 0,
  justification: '',
  purpose: '',
  nhs_fund_reason: '',
  estimated_attendance: 0,
  vendors_suppliers: '',
  reimbursement_contact: '',
  itemized_budget: {} 
});

const itemizedRows = ref([
  { name: '', cost: 0 }
]);

const addItem = () => itemizedRows.value.push({ name: '', cost: 0 });
const removeItem = (index: any) => itemizedRows.value.splice(index, 1);

const totalExpenses = computed(() => {
  return itemizedRows.value.reduce((sum, item) => sum + (item.cost || 0), 0);
});

const validateFormData = (data: any): string | null => {
  const invalidPatterns = [
    /__/, /<script/i, /javascript:/i, /onload=/i, /--/, /\\/, /[\x00-\x1f]/,
  ];

  const checkValue = (value: any, fieldName: string): string | null => {
    if (typeof value === 'string') {
      for (const pattern of invalidPatterns) {
        if (pattern.test(value)) {
          return `Invalid characters found in field: ${fieldName}. Pattern: ${pattern.toString()}`;
        }
      }
    }
    return null;
  };

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      const error = checkValue(value, key);
      if (error) return error;
    } else if (typeof value === 'object' && value !== null) {
      for (const [itemKey, itemValue] of Object.entries(value)) {
        const error = checkValue(itemKey, `${key}.${itemKey}`);
        if (error) return error;
        if (typeof itemValue === 'string') {
          const error2 = checkValue(itemValue, `${key}.${itemKey}`);
          if (error2) return error2;
        }
      }
    }
  }

  for (let i = 0; i < itemizedRows.value.length; i++) {
    const row = itemizedRows.value[i];
    if (row.name) {
      const error = checkValue(row.name, `itemized_budget.item_${i+1}_name`);
      if (error) return error;
    }
  }
  return null;
};

const submitProposal = () => {
  const budgetJson: any = {};
  itemizedRows.value.forEach(row => {
    if (row.name) budgetJson[row.name] = row.cost;
  });
  
  form.itemized_budget = budgetJson;

  const validationError = validateFormData(form);
  if (validationError) {
    alert(validationError);
    return;
  }

  isSubmitting.value = true;
  hasError.value = false;

  let payload = JSON.stringify(form, null, 2);
  let xhr = new XMLHttpRequest();
  
  xhr.open("POST", `${BACKEND_URL}/submit-budget-proposal`);
//   xhr.open("POST", "http://localhost:5000/submit-budget-proposal");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function() {
    isSubmitting.value = false;
    if (xhr.status === 200) {
      alert('Proposal submitted successfully!');
    } else {
      triggerErrorState();
      alert('Submission failed: ' + xhr.statusText);
    }
  };
  
  xhr.onerror = function() {
    isSubmitting.value = false;
    triggerErrorState();
    alert('Network error occurred');
  };
  
  xhr.send(payload);
};

const triggerErrorState = () => {
  hasError.value = true;
  // Briefly show red, then transition back
  setTimeout(() => {
    hasError.value = false;
  }, 2000);
};
</script>

<style scoped>
.budget-form-container {
  max-width: 50%;
  min-width: 600px;
  margin: 20px auto;
  font-family: sans-serif;
}
fieldset {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}
legend {
  font-weight: bold;
  padding: 0 10px;
}
.field {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
  font-size: 0.9rem;
}
input, select, textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.budget-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.budget-row input:first-child { flex: 2; }
.budget-row input:last-of-type { flex: 1; }
.add-btn {
  background: #e0e0e0;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

/* Updated Button Styles */
.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: var(--blue1, #3498db); /* Fallback to a standard blue if variable missing */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.4s ease, cursor 0.2s ease;
}

.btn-submitting {
  background-color: #95a5a6 !important; /* Grey */
  cursor: not-allowed !important;
}

.btn-error {
  background-color: #e74c3c !important; /* Red */
}

.total-calc {
  margin-top: 15px;
  text-align: right;
  color: #2c3e50;
}
</style>