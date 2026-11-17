<!--Docs.vue (or whatever your page is called)-->
<template>
  <Header />

  <div class="docs-overall" v-if="!siteDeveloped">
    <div class="docs-header">
      <h1>Documentation</h1>
    </div>
    <p class="docs-description">Site in development</p>
  </div>

  <div class="docs-overall" v-else>
    <div class="docs-header">
      <h1>Documentation</h1>
    </div>

    <div class="docs-main">
      <nav class="docs-sidebar" aria-label="Documentation categories">
        <h2 class="sidebar-title">Categories</h2>
        <ul class="sidebar-list">
          <li v-for="cat in categories" :key="cat">
            <button
              type="button"
              class="sidebar-item"
              :class="{ 'sidebar-item--active': cat === activeCategory }"
              :aria-current="cat === activeCategory ? 'page' : undefined"
              @click="activeCategory = cat"
            >
              {{ formatCategory(cat) }}
            </button>
          </li>
        </ul>
      </nav>

      <div class="sidebar-separator" aria-hidden="true"></div>

      <section class="docs-content" aria-live="polite">
        <DocItem
          v-for="dc in displayDocs"
          :key="dc.name"
          :doc="dc"
        />
        <p v-if="!displayDocs.length" class="docs-empty">
          No endpoints documented in this category yet.
        </p>
      </section>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.docs-overall {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.docs-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  width: 100%;
  background: var(--blue1);
  color: white;
}

.docs-description {
  font-family: consolas;
  font-size: 1.25em;
  color: rgb(58, 58, 58);
  margin: 2%;
}

/* ---- Layout: sidebar | separator | docs ---- */
.docs-main {
  width: 90vw;
  max-width: 1400px;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: 220px 1px minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
  min-height: 53.5vh;
}

/* ---- Sidebar ---- */
.docs-sidebar {
  position: sticky;
  top: 1.5rem;
  align-self: start;
}

.sidebar-title {
  margin: 0 0 0.75rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b7280;
}

.sidebar-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.sidebar-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #374151;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.sidebar-item:hover {
  background: #f3f4f6;
}

.sidebar-item:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

.sidebar-item--active {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  font-weight: 600;
}

/* ---- Separator ---- */
.sidebar-separator {
  width: 1px;
  align-self: stretch;
  min-height: 200px;
  background: #e2e4e9;
}

/* ---- Content column ---- */
.docs-content {
  min-width: 0; /* lets long code blocks shrink inside the grid track */
}

.docs-empty {
  color: #6b7280;
  font-style: italic;
}

/* ---- Small screens: stack sidebar above content ---- */
@media (max-width: 800px) {
  .docs-main {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .docs-sidebar {
    position: static;
  }

  .sidebar-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .sidebar-item {
    width: auto;
  }

  .sidebar-separator {
    display: none;
  }
}
</style>

<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import DocItem from '../components/DocItem.vue'
import type { DocType } from '../components/main'
import { ref, computed } from 'vue'
import docs_json from '../assets/docs.json'

const siteDeveloped = true

const docsRef = ref(docs_json)

/* All category keys, e.g. ['auth', 'users', 'billing', ...] */
const categories = computed<string[]>(
  () => docsRef.value.meta?.categories ?? []
)

/* Active category — seeded from the first available one */
const activeCategory = ref<string>(categories.value[0] ?? '')

/* Docs for the active category, recomputes on every click */
const displayDocs = computed(() => {
  const docsByCategory = docsRef.value.docs as Record<string, DocType[]>
  return docsByCategory[activeCategory.value] ?? []
})

/* Pretty label for a category key: "user_profile" -> "User Profile" */
function formatCategory(key: string): string {
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
</script>