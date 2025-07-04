<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-black via-psyco-black-light to-black pt-24">
      <div class="container mx-auto px-6 py-16">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span class="text-green-400">Journey</span>
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive look at my professional experience and educational background
          </p>
        </div>

        <div v-if="loading" class="text-center">
          <div class="text-white text-xl">Loading...</div>
        </div>

        <div v-else class="max-w-4xl mx-auto space-y-16">
          <!-- Experience Section -->
          <section v-if="showExperience && experiences.length > 0">
            <div class="flex items-center mb-8">
              <Building class="h-6 w-6 text-green-400 mr-3" />
              <h2 class="text-3xl font-bold text-white">Professional Experience</h2>
            </div>
            <div class="space-y-8">
              <div 
                v-for="experience in experiences" 
                :key="experience.id" 
                class="glassmorphism p-8 rounded-lg"
              >
                <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div class="flex-1">
                    <h3 class="text-2xl font-bold text-white mb-2">
                      {{ experience.title }}
                    </h3>
                    <div class="flex items-center text-green-400 text-lg font-semibold mb-4">
                      <Building class="h-5 w-5 mr-2" />
                      {{ experience.company }}
                    </div>
                  </div>
                  <div class="flex flex-col md:items-end space-y-2">
                    <div class="flex items-center text-gray-300">
                      <component :is="getEmploymentTypeIcon(experience.employment_type)" />
                      <span class="ml-2 text-sm font-medium">
                        {{ experience.employment_type }}
                      </span>
                    </div>
                    <div v-if="experience.location" class="flex items-center text-gray-400">
                      <MapPin class="h-4 w-4 mr-2" />
                      <span class="text-sm">{{ experience.location }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center text-gray-400 mb-4">
                  <Calendar class="h-4 w-4 mr-2" />
                  <span class="text-sm">
                    {{ formatDate(experience.start_date) }} - {{ 
                      experience.is_current 
                        ? 'Present' 
                        : experience.end_date 
                          ? formatDate(experience.end_date)
                          : 'Present'
                    }}
                  </span>
                </div>

                <p v-if="experience.description" class="text-gray-300 mb-6 leading-relaxed">
                  {{ experience.description }}
                </p>

                <div v-if="experience.skills && experience.skills.length > 0">
                  <h4 class="text-white font-semibold mb-3">Skills & Technologies:</h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(skill, skillIndex) in experience.skills"
                      :key="skillIndex"
                      class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30"
                    >
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Education Section -->
          <section v-if="showEducation && education.length > 0">
            <div class="flex items-center mb-8">
              <GraduationCap class="h-6 w-6 text-green-400 mr-3" />
              <h2 class="text-3xl font-bold text-white">Education</h2>
            </div>
            <div class="space-y-8">
              <div 
                v-for="edu in education" 
                :key="edu.id" 
                class="glassmorphism p-8 rounded-lg"
              >
                <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div class="flex-1">
                    <h3 class="text-2xl font-bold text-white mb-2">
                      {{ edu.degree }}
                    </h3>
                    <div class="flex items-center text-green-400 text-lg font-semibold mb-2">
                      <GraduationCap class="h-5 w-5 mr-2" />
                      {{ edu.institution }}
                    </div>
                    <p v-if="edu.field_of_study" class="text-gray-300 mb-4">{{ edu.field_of_study }}</p>
                  </div>
                  <div class="flex flex-col md:items-end space-y-2">
                    <div v-if="edu.grade" class="flex items-center text-gray-300">
                      <Award class="h-4 w-4 mr-2" />
                      <span class="text-sm font-medium">{{ edu.grade }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center text-gray-400 mb-4">
                  <Calendar class="h-4 w-4 mr-2" />
                  <span class="text-sm">
                    {{ formatDate(edu.start_date) }} - {{ 
                      edu.is_current 
                        ? 'Present' 
                        : edu.end_date 
                          ? formatDate(edu.end_date)
                          : 'Present'
                    }}
                  </span>
                </div>

                <p v-if="edu.description" class="text-gray-300 mb-4 leading-relaxed">
                  {{ edu.description }}
                </p>

                <div v-if="edu.activities">
                  <h4 class="text-white font-semibold mb-2">Activities:</h4>
                  <p class="text-gray-300">{{ edu.activities }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Show message if both sections are hidden -->
          <div v-if="!showExperience && !showEducation" class="text-center py-16">
            <h2 class="text-2xl font-bold text-gray-400 mb-4">No Content Available</h2>
            <p class="text-gray-500">
              Experience and education sections are currently disabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/integrations/supabase/client'
import type { Experience, Education, SiteSetting } from '@/types/database'
import { Calendar, MapPin, Building, Users, ExternalLink, GraduationCap, Award } from 'lucide-vue-next'
import Navbar from '@/components/Navbar.vue'

const experiences = ref<Experience[]>([])
const education = ref<Education[]>([])
const settings = ref<SiteSetting[]>([])
const loading = ref(true)

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  try {
    const [experiencesResult, educationResult, settingsResult] = await Promise.all([
      supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false }),
      supabase
        .from('education')
        .select('*')
        .order('start_date', { ascending: false }),
      supabase
        .from('site_settings')
        .select('*')
    ])

    if (experiencesResult.error) throw experiencesResult.error
    if (educationResult.error) throw educationResult.error
    if (settingsResult.error) throw settingsResult.error

    experiences.value = experiencesResult.data || []
    education.value = educationResult.data || []
    settings.value = settingsResult.data || []
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
}

const getEmploymentTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'full-time':
      return Users
    case 'part-time':
      return Users
    case 'internship':
      return ExternalLink
    case 'freelance':
      return ExternalLink
    default:
      return Building
  }
}

const getSetting = (key: string) => {
  return settings.value.find(s => s.setting_key === key)?.setting_value ?? true
}

const showExperience = computed(() => getSetting('show_experience_section'))
const showEducation = computed(() => getSetting('show_education_section'))
</script>