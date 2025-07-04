<template>
  <div id="app">
    <router-view v-if="!authStore.loading" />
    <div v-else class="min-h-screen flex items-center justify-center bg-black">
      <Loading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Loading from '@/components/ui/Loading.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>