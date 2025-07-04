import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import Services from '@/pages/Services.vue'
import References from '@/pages/References.vue'
import Booking from '@/pages/Booking.vue'
import Experience from '@/pages/Experience.vue'
import Admin from '@/pages/Admin.vue'
import AdminLogin from '@/pages/AdminLogin.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    },
    {
      path: '/references',
      name: 'References',
      component: References
    },
    {
      path: '/booking',
      name: 'Booking',
      component: Booking
    },
    {
      path: '/experience',
      name: 'Experience',
      component: Experience
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router