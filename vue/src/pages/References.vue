<template>
  <div>
    <Navbar />
    <div class="pt-20">
      <!-- Hero Section -->
      <section class="bg-psyco-black-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="text-center">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">My Projects</h1>
            <p class="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100 max-w-3xl mx-auto">
              A showcase of my work in modern web development, scalable backend systems, and innovative technology solutions. 
              Each project demonstrates expertise in creating efficient, maintainable software.
            </p>
          </div>
        </div>
      </section>

      <!-- Filter Section -->
      <section class="py-8 px-6 md:px-12 border-b border-green-500/10">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-wrap justify-center gap-4">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="cn(
                'px-6 py-2 rounded-full font-medium transition-all duration-300',
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-psyco-black-light text-gray-300 hover:text-white hover:bg-green-500/20'
              )"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </section>

      <!-- Loading State -->
      <div v-if="loading" class="py-20 flex items-center justify-center">
        <div class="text-white text-lg">Loading projects...</div>
      </div>

      <!-- Projects Section -->
      <section v-else class="py-16 px-6 md:px-12">
        <div class="max-w-7xl mx-auto">
          <!-- Featured Projects - Projects with Awards/Recognition -->
          <div v-if="featuredProjects.length > 0" class="mb-16">
            <h2 class="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
              <Award :size="32" class="text-yellow-400" />
              Featured Projects
            </h2>
            <div class="space-y-12">
              <div 
                v-for="(project, index) in featuredProjects"
                :key="project.id"
                class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-psyco-black-light to-psyco-black border-2 border-yellow-400/30 animate-fade-in hover:scale-[1.01] transition-all duration-500 shadow-2xl"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <!-- Award Badge - Floating -->
                <div class="absolute top-6 left-6 z-30">
                  <div class="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black font-bold px-6 py-3 rounded-full text-lg flex items-center gap-3 shadow-2xl animate-pulse-glow">
                    <Award :size="24" />
                    <span>Featured</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">
                  <!-- Image Section -->
                  <div class="relative h-80 lg:h-full overflow-hidden">
                    <img
                      :src="project.image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80'"
                      :alt="project.title"
                      class="object-cover h-full w-full transition-transform duration-700 hover:scale-110"
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

                    <!-- Categories Section - Bottom Left -->
                    <div class="absolute bottom-6 left-6 z-20 flex flex-wrap gap-2">
                      <div 
                        v-for="(cat, idx) in getProjectCategories(project)"
                        :key="idx"
                        :class="cn(
                          'backdrop-blur-md px-3 py-2 rounded-full text-sm font-medium flex items-center shadow-lg',
                          getCategoryColor(cat)
                        )"
                      >
                        <component :is="getIconComponent(cat)" />
                        <span class="ml-2">{{ cat }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Content Section -->
                  <div class="p-8 lg:p-12 flex flex-col justify-center">
                    <div class="mb-6">
                      <h3 class="text-4xl font-bold text-white leading-tight mb-4">{{ project.title }}</h3>
                      
                      <!-- Award Details -->
                      <div class="mb-6">
                        <div class="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 text-yellow-400 font-bold px-6 py-3 rounded-xl text-lg flex items-center gap-3 backdrop-blur-sm">
                          <Award :size="20" />
                          {{ project.award }}
                        </div>
                      </div>
                    </div>
                    
                    <p class="text-gray-300 mb-8 text-lg leading-relaxed">{{ project.description }}</p>
                    
                    <div v-if="project.technologies && project.technologies.length > 0" class="mb-8">
                      <h4 class="text-lg font-semibold text-white mb-4">Technologies Used:</h4>
                      <div class="flex flex-wrap gap-3">
                        <span 
                          v-for="(tech, idx) in project.technologies"
                          :key="idx"
                          class="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm font-medium border border-green-500/30 backdrop-blur-sm"
                        >
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                    
                    <div class="flex gap-6">
                      <a
                        v-if="project.github_url"
                        :href="project.github_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center text-green-400 hover:text-green-300 transition-all duration-300 font-medium text-lg group"
                      >
                        <Github class="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                        Source Code
                        <ExternalLink class="ml-2 h-4 w-4" />
                      </a>
                      <a
                        v-if="project.demo_url"
                        :href="project.demo_url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 font-medium text-lg group"
                      >
                        <ExternalLink class="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Regular Projects Grid -->
          <div v-if="regularProjects.length > 0">
            <h2 v-if="featuredProjects.length > 0" class="text-2xl font-bold text-white mb-8">Other Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                v-for="(project, index) in regularProjects"
                :key="project.id"
                class="glassmorphism overflow-hidden animate-fade-in hover:scale-105 transition-transform duration-300"
                :style="{ animationDelay: `${(index + featuredProjects.length) * 100}ms` }"
              >
                <div class="relative h-48 overflow-hidden">
                  <img
                    :src="project.image_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80'"
                    :alt="project.title"
                    class="object-cover h-full w-full transition-transform duration-500 hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <!-- Categories -->
                  <div class="absolute top-4 left-4 z-10 flex flex-wrap gap-1">
                    <div 
                      v-for="(cat, idx) in getProjectCategories(project).slice(0, 2)"
                      :key="idx"
                      :class="cn(
                        'backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center shadow-lg',
                        getCategoryColor(cat)
                      )"
                    >
                      <component :is="getIconComponent(cat)" />
                      <span class="ml-1">{{ cat }}</span>
                    </div>
                    <div 
                      v-if="getProjectCategories(project).length > 2"
                      class="backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium bg-gray-500 text-white shadow-lg"
                    >
                      +{{ getProjectCategories(project).length - 2 }}
                    </div>
                  </div>
                  
                  <!-- Status - only show if exists -->
                  <div v-if="project.status" class="absolute top-4 right-4 z-10">
                    <div :class="cn('px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg', getStatusColor(project.status))">
                      {{ project.status }}
                    </div>
                  </div>
                </div>
                
                <div class="p-6">
                  <h3 class="text-xl font-semibold text-white mb-3">{{ project.title }}</h3>
                  <p class="text-gray-300 mb-4 text-sm leading-relaxed">{{ project.description }}</p>
                  
                  <div v-if="project.technologies && project.technologies.length > 0" class="mb-4">
                    <h4 class="text-sm font-medium text-white mb-2">Technologies Used:</h4>
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="(tech, idx) in project.technologies"
                        :key="idx"
                        class="bg-psyco-black-light text-green-400 px-2 py-1 rounded text-xs font-medium border border-green-500/20"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="flex gap-4">
                    <a
                      v-if="project.github_url"
                      :href="project.github_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center text-green-400 hover:text-green-300 transition-colors font-medium text-sm"
                    >
                      <Github class="mr-2 h-4 w-4" />
                      Source
                      <ExternalLink class="ml-1 h-3 w-3" />
                    </a>
                    <a
                      v-if="project.demo_url"
                      :href="project.demo_url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
                    >
                      <ExternalLink class="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Single GitHub CTA - strategically placed -->
      <section class="py-20 px-6 md:px-12 bg-psyco-black-light">
        <div class="max-w-7xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-white mb-4">Explore More Projects</h2>
          <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
            Visit my GitHub profile to see additional projects, code contributions, and open source work.
          </p>
          <a
            v-if="personalInfo?.github_url"
            :href="personalInfo.github_url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 btn-glow"
          >
            <Github class="mr-2 h-5 w-5" />
            Visit GitHub Profile
            <ExternalLink class="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ExternalLink, Github, Code, Database, BarChart3, Award, Globe, Cpu, Monitor, Server } from 'lucide-vue-next'
import { supabase } from '@/integrations/supabase/client'
import { cn } from '@/lib/utils'
import type { Project, PersonalInfo } from '@/types/database'
import Navbar from '@/components/Navbar.vue'

const projects = ref<Project[]>([])
const personalInfo = ref<PersonalInfo | null>(null)
const selectedCategory = ref('All')
const loading = ref(true)

// Scroll to top on page load
onMounted(() => {
  window.scrollTo(0, 0)
  fetchData()
})

const fetchData = async () => {
  try {
    loading.value = true
    console.log('Fetching projects data...')
    
    const [projectsResult, personalResult] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('personal_info').select('*').single()
    ])

    console.log('Projects result:', projectsResult)
    console.log('Personal info result:', personalResult)

    if (projectsResult.data) {
      projects.value = projectsResult.data
      console.log('Projects loaded:', projectsResult.data.length)
    }
    if (personalResult.data) personalInfo.value = personalResult.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

// Get all unique categories from both categories array and category field
const getAllCategories = () => {
  const categoriesSet = new Set<string>()
  projects.value.forEach(project => {
    // Add from categories array
    if (project.categories) {
      project.categories.forEach(cat => categoriesSet.add(cat))
    }
    // Add from single category field (for backward compatibility)
    if (project.category) {
      categoriesSet.add(project.category)
    }
  })
  return Array.from(categoriesSet)
}

const categories = computed(() => ['All', ...getAllCategories()])

const filteredProjects = computed(() => {
  return selectedCategory.value === 'All' 
    ? projects.value 
    : projects.value.filter(project => {
        // Check in categories array or single category field
        return (project.categories && project.categories.includes(selectedCategory.value)) ||
               project.category === selectedCategory.value
      })
})

// Separate featured projects (with awards) from regular projects
const featuredProjects = computed(() => filteredProjects.value.filter(project => project.award))
const regularProjects = computed(() => filteredProjects.value.filter(project => !project.award))

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Frontend':
    case 'Web Development':
      return 'bg-blue-500 text-white'
    case 'Backend':
    case 'API Development':
      return 'bg-purple-500 text-white'
    case 'Full Stack':
      return 'bg-green-500 text-white'
    case 'Machine Learning':
    case 'AI':
      return 'bg-orange-500 text-white'
    case 'Mobile Development':
      return 'bg-pink-500 text-white'
    case 'DevOps':
    case 'Cloud':
      return 'bg-cyan-500 text-white'
    case 'Desktop':
      return 'bg-gray-500 text-white'
    case 'Database Design':
      return 'bg-indigo-500 text-white'
    case 'Automation':
      return 'bg-yellow-500 text-black'
    default:
      return 'bg-slate-500 text-white'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
    case 'Deployed':
      return 'bg-green-500/90 text-white'
    case 'In Progress':
      return 'bg-yellow-500/90 text-white'
    case 'On Hold':
      return 'bg-red-500/90 text-white'
    case 'Planning':
      return 'bg-blue-500/90 text-white'
    case 'Prototype':
      return 'bg-purple-500/90 text-white'
    default:
      return 'bg-gray-500/90 text-white'
  }
}

const getIconComponent = (category: string) => {
  switch (category) {
    case 'Frontend':
    case 'Web Development':
      return Monitor
    case 'Backend':
    case 'API Development':
      return Server
    case 'Full Stack':
      return Globe
    case 'Machine Learning':
    case 'AI':
      return Cpu
    case 'Mobile Development':
      return Monitor
    case 'DevOps':
    case 'Cloud':
      return Database
    case 'Database Design':
      return Database
    case 'Automation':
      return BarChart3
    default:
      return Code
  }
}

// Get all categories for a project
const getProjectCategories = (project: Project) => {
  if (project.categories && project.categories.length > 0) {
    return project.categories
  }
  return project.category ? [project.category] : []
}
</script>