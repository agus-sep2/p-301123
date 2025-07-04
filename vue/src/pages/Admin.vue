<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-psyco-black-light to-black">
    <!-- Redirect to login if not authenticated -->
    <div v-if="!authStore.isAuthenticated" class="flex items-center justify-center min-h-screen">
      <div class="text-white text-xl">Redirecting to login...</div>
    </div>

    <!-- Admin Dashboard -->
    <div v-else class="p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button
            @click="handleSignOut"
            variant="outline"
            class="border-red-500 text-red-500 hover:bg-red-500/10"
          >
            Sign Out
          </Button>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card class="glassmorphism border-green-500/20">
            <CardContent class="p-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-green-400">{{ stats.projects }}</div>
                <div class="text-gray-300">Projects</div>
              </div>
            </CardContent>
          </Card>
          
          <Card class="glassmorphism border-green-500/20">
            <CardContent class="p-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-400">{{ stats.services }}</div>
                <div class="text-gray-300">Services</div>
              </div>
            </CardContent>
          </Card>
          
          <Card class="glassmorphism border-green-500/20">
            <CardContent class="p-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-400">{{ stats.experiences }}</div>
                <div class="text-gray-300">Experiences</div>
              </div>
            </CardContent>
          </Card>
          
          <Card class="glassmorphism border-green-500/20">
            <CardContent class="p-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-yellow-400">{{ stats.education }}</div>
                <div class="text-gray-300">Education</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Management Sections -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Content Management -->
          <Card class="glassmorphism border-green-500/20">
            <CardHeader>
              <CardTitle class="text-white">Content Management</CardTitle>
              <CardDescription class="text-gray-300">
                Manage your portfolio content
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <Button class="w-full justify-start" variant="ghost">
                <Database class="mr-2 h-4 w-4" />
                Manage Projects
              </Button>
              <Button class="w-full justify-start" variant="ghost">
                <Code class="mr-2 h-4 w-4" />
                Manage Services
              </Button>
              <Button class="w-full justify-start" variant="ghost">
                <User class="mr-2 h-4 w-4" />
                Personal Information
              </Button>
              <Button class="w-full justify-start" variant="ghost">
                <Briefcase class="mr-2 h-4 w-4" />
                Experience & Education
              </Button>
            </CardContent>
          </Card>

          <!-- Site Settings -->
          <Card class="glassmorphism border-green-500/20">
            <CardHeader>
              <CardTitle class="text-white">Site Settings</CardTitle>
              <CardDescription class="text-gray-300">
                Configure site behavior and visibility
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="text-white">Show Experience Menu</label>
                <input 
                  type="checkbox" 
                  :checked="settings.show_experience_menu"
                  @change="updateSetting('show_experience_menu', $event.target.checked)"
                  class="rounded"
                />
              </div>
              <div class="flex items-center justify-between">
                <label class="text-white">Show Experience Section</label>
                <input 
                  type="checkbox" 
                  :checked="settings.show_experience_section"
                  @change="updateSetting('show_experience_section', $event.target.checked)"
                  class="rounded"
                />
              </div>
              <div class="flex items-center justify-between">
                <label class="text-white">Show Education Section</label>
                <input 
                  type="checkbox" 
                  :checked="settings.show_education_section"
                  @change="updateSetting('show_education_section', $event.target.checked)"
                  class="rounded"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/integrations/supabase/client'
import { useAuthStore } from '@/stores/auth'
import { Database, Code, User, Briefcase } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const stats = ref({
  projects: 0,
  services: 0,
  experiences: 0,
  education: 0
})

const settings = ref({
  show_experience_menu: true,
  show_experience_section: true,
  show_education_section: true
})

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/admin/login')
    return
  }
  
  fetchStats()
  fetchSettings()
})

watch(() => authStore.isAuthenticated, (isAuth) => {
  if (!isAuth) {
    router.push('/admin/login')
  }
})

const fetchStats = async () => {
  try {
    const [projectsResult, servicesResult, experiencesResult, educationResult] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact' }),
      supabase.from('services').select('id', { count: 'exact' }),
      supabase.from('experiences').select('id', { count: 'exact' }),
      supabase.from('education').select('id', { count: 'exact' })
    ])

    stats.value = {
      projects: projectsResult.count || 0,
      services: servicesResult.count || 0,
      experiences: experiencesResult.count || 0,
      education: educationResult.count || 0
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const fetchSettings = async () => {
  try {
    const { data } = await supabase
      .from('site_settings')
      .select('*')

    if (data) {
      data.forEach(setting => {
        if (setting.setting_key in settings.value) {
          settings.value[setting.setting_key as keyof typeof settings.value] = setting.setting_value
        }
      })
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
  }
}

const updateSetting = async (key: string, value: boolean) => {
  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        setting_key: key,
        setting_value: value
      }, {
        onConflict: 'setting_key'
      })

    if (error) throw error

    settings.value[key as keyof typeof settings.value] = value
  } catch (error) {
    console.error('Error updating setting:', error)
  }
}

const handleSignOut = async () => {
  await authStore.signOut()
  router.push('/admin/login')
}
</script>