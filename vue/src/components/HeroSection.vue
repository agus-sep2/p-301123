<template>
  <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-psyco-black-light to-black overflow-hidden pt-32 pb-32">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse"></div>
      <div class="absolute w-80 h-80 bg-blue-500/10 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse animation-delay-1000"></div>
      <div class="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl top-1/2 right-1/3 animate-pulse animation-delay-2000"></div>
    </div>

    <div v-if="!personalInfo" class="relative z-10 text-center text-white">
      Loading...
    </div>

    <div v-else class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
      <div class="animate-fade-in">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-green-400 to-blue-400">
          {{ personalInfo.name }}
        </h1>
        
        <p class="text-2xl md:text-3xl text-green-400 font-medium mb-6 animate-fade-in animation-delay-200">
          {{ personalInfo.title }}
        </p>
        
        <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
          {{ personalInfo.description }}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in animation-delay-600">
          <router-link
            to="/booking"
            class="bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center btn-glow"
          >
            Get In Touch
            <ArrowRight class="ml-2 h-5 w-5" />
          </router-link>
          
          <router-link
            to="/references"
            class="bg-transparent border border-green-500 text-green-500 hover:bg-green-500/10 font-medium py-4 px-8 rounded-lg transition-all duration-300 flex items-center"
          >
            View My Work
          </router-link>
        </div>
        
        <div class="flex justify-center space-x-8 animate-fade-in animation-delay-800 mb-20">
          <a 
            v-if="personalInfo.github_url"
            :href="personalInfo.github_url"
            target="_blank" 
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-green-400 transition-colors p-3 glassmorphism rounded-full"
          >
            <Github :size="28" />
          </a>
          <a 
            v-if="personalInfo.linkedin_url"
            :href="personalInfo.linkedin_url"
            target="_blank" 
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-green-400 transition-colors p-3 glassmorphism rounded-full"
          >
            <Linkedin :size="28" />
          </a>
          <a 
            :href="`mailto:${personalInfo.email}`"
            class="text-gray-400 hover:text-green-400 transition-colors p-3 glassmorphism rounded-full"
          >
            <Mail :size="28" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-vue-next'
import { supabase } from '@/integrations/supabase/client'
import type { PersonalInfo } from '@/types/database'

const personalInfo = ref<PersonalInfo | null>(null)

const fetchPersonalInfo = async () => {
  try {
    const { data } = await supabase
      .from('personal_info')
      .select('*')
      .single()
    
    if (data) personalInfo.value = data
  } catch (error) {
    console.error('Error fetching personal info:', error)
  }
}

onMounted(() => {
  fetchPersonalInfo()
})
</script>