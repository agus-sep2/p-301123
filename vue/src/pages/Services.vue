<template>
  <div>
    <Navbar />
    <div class="pt-20">
      <!-- Hero Section -->
      <section class="bg-psyco-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">My Skills & Expertise</h1>
            <p class="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100">
              Specialized in modern web development, scalable backend systems, and data science. 
              I create efficient, scalable solutions that drive business value.
            </p>
            <a
              v-if="personalInfo?.github_url"
              :href="personalInfo.github_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 btn-glow animate-fade-in animation-delay-200"
            >
              View Projects
              <MoveRight class="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <!-- Loading State -->
      <div v-if="loading" class="py-20 flex items-center justify-center">
        <Loading />
      </div>

      <template v-else>
        <!-- Main Services -->
        <section class="py-20 px-6 md:px-12">
          <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-3xl font-bold text-white mb-2">What I Offer</h2>
              <p class="text-gray-400 max-w-2xl mx-auto">
                Comprehensive development solutions using modern technologies
              </p>
            </div>
            
            <div 
              v-for="(service, index) in services"
              :key="service.id"
              :id="service.category.toLowerCase()"
              :class="cn(
                'flex flex-col gap-8 mb-20 last:mb-0 animate-fade-in',
                index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              )"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="w-full lg:w-1/2">
                <div class="glassmorphism p-1 rounded-2xl h-full">
                  <div class="relative w-full h-full overflow-hidden rounded-xl">
                    <ImageSkeleton
                      :src="service.image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80'"
                      :alt="service.title"
                      class="object-cover w-full h-full aspect-video lg:aspect-auto transition-transform duration-10000 hover:scale-110"
                      container-class-name="w-full h-full"
                    />
                  </div>
                </div>
              </div>
              
              <div class="w-full lg:w-1/2 flex flex-col justify-center">
                <div class="text-psyco-green-DEFAULT mb-4">
                  <component :is="getIconComponent(service.icon)" />
                </div>
                <h3 class="text-2xl font-semibold text-white mb-4">{{ service.title }}</h3>
                <p class="text-gray-300 mb-6">{{ service.description }}</p>
                
                <div class="bg-psyco-black-light rounded-xl p-6">
                  <h4 class="text-lg font-medium text-white mb-4">Technologies & Skills:</h4>
                  <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li v-for="(feature, idx) in service.features" :key="idx" class="flex items-start">
                      <div class="text-psyco-green-DEFAULT mt-1 mr-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.66675 10.1148L12.7947 3.98608L13.7381 4.92875L6.66675 12.0001L2.42675 7.76008L3.36941 6.81741L6.66675 10.1148Z" fill="currentColor" />
                        </svg>
                      </div>
                      <span class="text-gray-300">{{ feature }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <!-- Additional Services -->
        <section class="py-20 px-6 md:px-12 bg-psyco-black-light">
          <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
              <h2 class="text-3xl font-bold text-white mb-2">Additional Services</h2>
              <p class="text-gray-400 max-w-2xl mx-auto">
                Supporting services to enhance your digital projects
              </p>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="(service, index) in additionalServices"
                :key="index"
                class="glassmorphism p-6 card-hover animate-fade-in"
                :style="{ animationDelay: `${index * 50}ms` }"
              >
                <div class="text-psyco-green-DEFAULT mb-4">
                  <component :is="service.icon" />
                </div>
                <h3 class="text-xl font-medium text-white mb-2">{{ service.title }}</h3>
                <p class="text-gray-300">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- CTA Section -->
        <section class="py-20 px-6 md:px-12 relative overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute w-96 h-96 bg-psyco-green-DEFAULT/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          <div class="max-w-7xl mx-auto relative z-10">
            <div class="glassmorphism p-8 md:p-12 text-center">
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
              <p class="text-gray-300 max-w-2xl mx-auto mb-8">
                Let's collaborate to bring your ideas to life using modern web technologies and data science expertise.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <router-link
                  to="/booking"
                  class="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center btn-glow"
                >
                  Contact Me
                  <MoveRight class="ml-2 h-5 w-5" />
                </router-link>
                <a
                  v-if="personalInfo?.github_url"
                  :href="personalInfo.github_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-transparent border border-psyco-green-DEFAULT text-psyco-green-DEFAULT hover:bg-psyco-green-DEFAULT/10 font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Code, Database, BarChart3, Server, Globe, MoveRight } from 'lucide-vue-next'
import { supabase } from '@/integrations/supabase/client'
import { cn } from '@/lib/utils'
import type { Service, PersonalInfo } from '@/types/database'
import Navbar from '@/components/Navbar.vue'
import Loading from '@/components/ui/Loading.vue'
import ImageSkeleton from '@/components/ui/ImageSkeleton.vue'

const services = ref<Service[]>([])
const personalInfo = ref<PersonalInfo | null>(null)
const loading = ref(true)

// Scroll to top on page load
onMounted(() => {
  window.scrollTo(0, 0)
  fetchData()
})

const fetchData = async () => {
  try {
    loading.value = true
    const [servicesResult, personalResult] = await Promise.all([
      supabase.from('services').select('*').order('created_at'),
      supabase.from('personal_info').select('*').single()
    ])

    if (servicesResult.data) services.value = servicesResult.data
    if (personalResult.data) personalInfo.value = personalResult.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Code':
      return Code
    case 'Database':
      return Database
    case 'BarChart3':
      return BarChart3
    default:
      return Code
  }
}

const additionalServices = [
  {
    icon: Server,
    title: "API Development",
    description: "RESTful APIs and microservices using modern frameworks."
  },
  {
    icon: Globe,
    title: "Web Optimization",
    description: "Performance optimization and SEO improvements."
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Efficient database architecture and optimization."
  }
]
</script>