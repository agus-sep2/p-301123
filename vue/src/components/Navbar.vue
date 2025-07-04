<template>
  <nav
    :class="cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12',
      scrolled ? 'glassmorphism bg-opacity-80' : 'bg-transparent'
    )"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <router-link 
        to="/" 
        class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500"
        @click="handleNavClick"
      >
        Muhammad Mahathir
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="handleNavClick"
          :class="cn(
            'text-white hover:text-green-400 transition-colors duration-300 link-hover text-sm font-medium tracking-wide',
            $route.path === link.path && 'text-green-500 after:w-full'
          )"
        >
          {{ link.name }}
        </router-link>
      </div>

      <!-- Mobile Navigation Toggle -->
      <button
        class="md:hidden text-white hover:text-green-400 transition-colors"
        @click="isOpen = !isOpen"
      >
        <X v-if="isOpen" :size="24" />
        <Menu v-else :size="24" />
      </button>
    </div>

    <!-- Mobile Navigation Menu -->
    <div
      :class="cn(
        'fixed inset-0 z-40 glassmorphism pt-24 px-8 transition-all duration-300 ease-in-out transform md:hidden',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )"
    >
      <div class="flex flex-col space-y-4">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="handleNavClick"
          :class="cn(
            'text-white hover:text-green-400 py-2 text-xl transition-colors duration-300',
            $route.path === link.path && 'text-green-500'
          )"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { supabase } from '@/integrations/supabase/client'
import type { SiteSetting } from '@/types/database'

const route = useRoute()
const isOpen = ref(false)
const scrolled = ref(false)
const settings = ref<SiteSetting[]>([])

const getSetting = (key: string) => {
  return settings.value.find(s => s.setting_key === key)?.setting_value ?? true
}

const baseNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Skills', path: '/services' },
  { name: 'Projects', path: '/references' },
  { name: 'Contact', path: '/booking' },
]

const navLinks = computed(() => {
  const links = [...baseNavLinks]
  if (getSetting('show_experience_menu')) {
    links.splice(3, 0, { name: 'Experience', path: '/experience' })
  }
  return links
})

const fetchSettings = async () => {
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
    
    if (data) settings.value = data
  } catch (error) {
    console.error('Error fetching settings:', error)
  }
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

const handleNavClick = () => {
  isOpen.value = false
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 100)
}

onMounted(() => {
  fetchSettings()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(() => route.path, () => {
  isOpen.value = false
  window.scrollTo(0, 0)
})
</script>