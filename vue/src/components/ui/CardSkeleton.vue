<template>
  <div :class="cn('glassmorphism p-6 card-hover', $attrs.class)" :style="$attrs.style">
    <div class="animate-pulse">
      <div class="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
      <div class="flex items-center mb-4">
        <div class="w-8 h-8 bg-gray-700 rounded mr-3"></div>
        <div class="h-6 bg-gray-700 rounded w-3/4"></div>
      </div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-700 rounded w-full"></div>
        <div class="h-4 bg-gray-700 rounded w-5/6"></div>
        <div class="h-4 bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>