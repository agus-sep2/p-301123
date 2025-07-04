<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-psyco-black-light to-black flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-white mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
      <p class="text-gray-400 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
      >
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>