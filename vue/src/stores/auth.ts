import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const loading = ref(true)

  const isAuthenticated = computed(() => !!user.value)

  const initialize = async () => {
    try {
      // Get initial session
      const { data: { session: initialSession } } = await supabase.auth.getSession()
      session.value = initialSession
      user.value = initialSession?.user ?? null
      
      // Set up auth state listener
      supabase.auth.onAuthStateChange((event, newSession) => {
        session.value = newSession
        user.value = newSession?.user ?? null
        loading.value = false
      })
    } catch (error) {
      console.error('Error initializing auth:', error)
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return {
    user,
    session,
    loading,
    isAuthenticated,
    initialize,
    signOut
  }
})