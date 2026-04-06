import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import NotFound from '../pages/NotFound.vue'
import SubmitProposal from '../pages/SubmitProposal.vue'
import Log from '../pages/Log.vue'
import RequestReimbursement from '../pages/RequestReimbursement.vue'

const routes = [ 
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/submit-proposal',
    name: 'SubmitProposal',
    component: SubmitProposal
  },
  {
    path: '/logs',
    name: 'TransactionLog',
    component: Log
  },
  {
    path: '/request-reimbursement',
    name: 'RequestReimbursement',
    component: RequestReimbursement
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router