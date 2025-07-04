<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-psyco-black-light to-black flex items-center justify-center">
    <div class="max-w-md w-full mx-4">
      <Card class="glassmorphism border-green-500/20">
        <CardHeader class="text-center">
          <CardTitle class="text-2xl text-white">Admin Login</CardTitle>
          <CardDescription class="text-gray-300">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit="handleLogin" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <Input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="bg-psyco-black-light border-green-500/30 text-white placeholder:text-gray-400"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <Input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="bg-psyco-black-light border-green-500/30 text-white placeholder:text-gray-400"
                placeholder="••••••••"
              />
            </div>
            
            <Button
              type="submit"
              :disabled="loading"
              class="w-full bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white"
            >
              <span v-if="loading">Signing in...</span>
              <span v-else>Sign In</span>
            </Button>
            
            <div v-if="error" class="text-red-400 text-sm text-center">
              {{ error }}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/integrations/supabase/client'
import { useAuthStore } from '@/stores/auth'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

onMounted(() => {
  // Redirect if already authenticated
  if (authStore.isAuthenticated) {
    router.push('/admin')
  }
})

const handleLogin = async (e: Event) => {
  e.preventDefault()
  loading.value = true
  error.value = ''

  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.value.email,
      password: form.value.password
    })

    if (signInError) {
      error.value = signInError.message
    } else {
      router.push('/admin')
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>