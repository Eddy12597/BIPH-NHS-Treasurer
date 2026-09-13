<template>
  <div class="budget-form-container">
    
    <form @submit.prevent="submitReimbursement">
      <fieldset>
				<legend>Reimbursement Info</legend>
        <div class="field">
          <label>Proposal ID (Found in Email for Proposal)</label>
          <input v-model="form.propid" type="text" required />
        </div>
        <div class="field">
          <label>Item Name</label>
          <input v-model="form.itemname" type="text" required />
        </div>
        <div class="field">
          <label>Images</label>
          <input @change="onFiles" type="file" required accept="image/*" multiple/>
        </div>
				<div class='field'>
					<label>Notes</label>
					<input v-model="form.notes" type="text" required />
				</div>
      </fieldset>

      <button 
        type="submit" 
        class="submit-btn" 
        :class="{ 'btn-submitting': isSubmitting, 'btn-error': hasError }"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit Reimbursement' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
// @ts-ignore
const BACKEND_URL = window.__APP_CONFIG__?.API_URL || import.meta.dev.BACKEND_URL;
//const BACKEND_URL = "http://127.0.0.1:5000"

const isSubmitting = ref(false);
const hasError = ref(false);

// Sectioned form data
const form = reactive<{
  propid: string;
  itemname: string;
  images: File[] | string[];
  notes: string;
  filenames: string[];
}>({
  propid: "",
  itemname: "",
  images: [],
  notes: "",
  filenames: []
});

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Unable to read file as base64"));
        return;
      }
      resolve(reader.result.split(",", 2)[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function onFiles(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!input.files) return;
  form.images = Array.from(input.files);
}

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
  return null;
};

const submitReimbursement = async () => {

  	const files = form.images as File[];                          
	const filenames = files.map(f => f.name);                
	const images = await Promise.all(files.map(fileToBase64));
	form.images = images;
	form.filenames = filenames;

  isSubmitting.value = true;
  hasError.value = false;

  const validationError = validateFormData(form);
  if (validationError) {
    alert(validationError);
    return;
  }

  let payload = JSON.stringify(form, null, 2);
  let xhr = new XMLHttpRequest();
  
  xhr.open("POST", `${BACKEND_URL}/request-reimbursement`);
//   xhr.open("POST", "http://localhost:5000/reqest-reimbursement");
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
  console.log(`Payload: ${payload}`);
  
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