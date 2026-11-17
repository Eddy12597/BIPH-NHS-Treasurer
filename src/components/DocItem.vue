<!--DocItem.vue-->
<template>
  <article class="doc-item">
    <header class="doc-header">
      <div class="doc-title-row">
        <h2 class="doc-name">{{ doc.name }}</h2>
        <button
          class="copy-btn copy-btn--endpoint"
          type="button"
          @click="copy(doc.endpoint)"
        >
          {{ copiedKey === 'endpoint' ? 'Copied' : 'Copy' }}
        </button>
      </div>

      <div class="doc-endpoint">
        <span class="method" :class="methodClass">{{ doc.method.toUpperCase() }}</span>
        <code class="endpoint">{{ doc.endpoint }}</code>
      </div>

      <p v-if="doc.description" class="doc-description">{{ doc.description }}</p>
    </header>

    <section v-if="paramEntries.length" class="doc-section">
      <h3 class="section-title">Parameters</h3>
      <div class="table-wrap">
        <table class="param-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[paramName, param] in paramEntries" :key="paramName">
              <td><code class="param-name">{{ paramName }}</code></td>
              <td><span class="type">{{ param.type }}</span></td>
              <td class="param-desc">{{ param.description }}</td>
              <td>
                <code v-if="param.default !== undefined && param.default !== null">{{ param.default }}</code>
                <span v-else class="muted">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section v-if="doc.returntype" class="doc-section">
      <h3 class="section-title">Returns</h3>
      <p class="returns"><span class="type">{{ doc.returntype }}</span></p>
    </section>

    <section v-if="codeEntries.length" class="doc-section">
      <h3 class="section-title">Examples</h3>

      <div v-if="codeEntries.length > 1" class="code-tabs" role="tablist">
        <button
          v-for="[lang] in codeEntries"
          :key="lang"
          type="button"
          role="tab"
          class="code-tab"
          :class="{ 'code-tab--active': lang === currentLang }"
          :aria-selected="lang === currentLang"
          @click="activeLang = lang"
        >
          {{ lang }}
        </button>
      </div>

      <div class="code-block">
        <button
          class="copy-btn copy-btn--code"
          type="button"
          @click="copy(activeCode, 'code')"
        >
          {{ copiedKey === 'code' ? 'Copied' : 'Copy' }}
        </button>
        <pre><code>{{ activeCode }}</code></pre>
      </div>
    </section>
  </article>
</template>

<style scoped>
.doc-item {
  border: 1px solid var(--doc-border, #e2e4e9);
  border-radius: 8px;
  background: var(--doc-bg, #ffffff);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--doc-fg, #1f2430);
  font-size: 0.925rem;
  line-height: 1.55;
}

/* Header */
.doc-header {
  border-bottom: 1px solid var(--doc-border, #e2e4e9);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.doc-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.doc-name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.doc-endpoint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.6rem;
  flex-wrap: wrap;
}

.method {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #fff;
  background: #6b7280;
}
.method--get    { background: #1a9d55; }
.method--post   { background: #2563eb; }
.method--put    { background: #d97706; }
.method--patch  { background: #7c3aed; }
.method--delete { background: #dc2626; }

.endpoint {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.85rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  background: var(--doc-code-bg, #f3f4f6);
  word-break: break-all;
}

.doc-description {
  margin: 0.75rem 0 0;
  color: var(--doc-muted, #4b5563);
}

/* Sections */
.doc-section {
  margin-top: 1.25rem;
}

.section-title {
  margin: 0 0 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--doc-muted, #6b7280);
}

/* Parameters table */
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--doc-border, #e2e4e9);
  border-radius: 6px;
}

.param-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.param-table th,
.param-table td {
  text-align: left;
  padding: 0.55rem 0.75rem;
  vertical-align: top;
}

.param-table thead th {
  background: var(--doc-code-bg, #f9fafb);
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--doc-muted, #6b7280);
  border-bottom: 1px solid var(--doc-border, #e2e4e9);
  white-space: nowrap;
}

.param-table tbody tr + tr td {
  border-top: 1px solid var(--doc-border, #eef0f3);
}

.param-name {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.83rem;
  font-weight: 600;
  white-space: nowrap;
}

.param-desc {
  color: var(--doc-muted, #4b5563);
}

.type {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.8rem;
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.08);
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
  white-space: nowrap;
}

.returns {
  margin: 0;
}

.muted {
  color: var(--doc-muted, #9ca3af);
}

/* Code examples */
.code-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.code-tab {
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--doc-border, #e2e4e9);
  border-radius: 6px;
  background: transparent;
  color: var(--doc-muted, #4b5563);
  font-size: 0.8rem;
  cursor: pointer;
}

.code-tab:hover {
  background: var(--doc-code-bg, #f3f4f6);
}

.code-tab--active {
  border-color: #2563eb;
  color: #2563eb;
  font-weight: 600;
  background: rgba(37, 99, 235, 0.06);
}

.code-block {
  position: relative;
  border-radius: 6px;
  background: #1e222b;
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 0.9rem 1rem;
  overflow-x: auto;
}

.code-block code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.82rem;
  line-height: 1.6;
  color: #e6e8eb;
  white-space: pre;
}

/* Copy button */
.copy-btn {
  font-size: 0.72rem;
  padding: 0.25rem 0.55rem;
  border: 1px solid var(--doc-border, #d1d5db);
  border-radius: 5px;
  background: transparent;
  color: var(--doc-muted, #6b7280);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.copy-btn:hover {
  background: var(--doc-code-bg, #f3f4f6);
  color: var(--doc-fg, #1f2430);
}

.copy-btn--endpoint {
  flex-shrink: 0;
}

.copy-btn--code {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border-color: rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.06);
}

.copy-btn--code:hover {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}
</style>

<script setup lang="ts">
/*
export interface DocType {
    name: string;
    description: string;
    endpoint: string;
    method: string;
    parameters: Map<string, {
        type: string;
        description: string;
        default: any;
    }> | null;
    returntype: string;
    code: Map<string, string> // e.g. { cURL: "curl https://..." }
}
*/

import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import type { DocType } from './main.ts'

const props = defineProps({
  doc: {
    type: Object as PropType<DocType>,
    required: true,
    validator: (value: DocType): boolean => {
      return !!(value.name && value.endpoint && value.method)
    }
  }
})

/* ---- Parameters: object -> array of [name, definition] tuples ---- */
const paramEntries = computed(
  () => Object.entries(props.doc.parameters ?? {})
)

/* ---- Code examples: object -> array of [language, source] tuples ---- */
const codeEntries = computed(
  () => Object.entries(props.doc.code)
)

/* Selected language for the code tabs (null = default to first entry) */
const activeLang = ref<string | null>(null)

const currentLang = computed(
  () => activeLang.value ?? codeEntries.value[0]?.[0] ?? ''
)

const activeCode = computed(
  () => props.doc.code[currentLang.value] ?? ''
)

/* ---- Method badge colour mapping ---- */
const methodClass = computed(() => {
  const map: Record<string, string> = {
    get: 'method--get',
    post: 'method--post',
    put: 'method--put',
    patch: 'method--patch',
    delete: 'method--delete'
  }
  return map[props.doc.method?.toLowerCase()] ?? ''
})

/* ---- Copy-to-clipboard with per-button feedback ---- */
const copiedKey = ref<string | null>(null)
let resetTimer: ReturnType<typeof setTimeout> | undefined

async function copy(text: string, key = 'endpoint') {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    /* Clipboard API unavailable (e.g. insecure context) — fail silently */
    return
  }
  copiedKey.value = key
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    copiedKey.value = null
  }, 1500)
}
</script>