<template>
  <div>
    <Navbar />
    <HeroSection />
    <AboutSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>