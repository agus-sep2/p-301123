<template>
  <div 
    :class="cn(
      'glassmorphism overflow-hidden group card-hover transition-all duration-500',
      className
    )"
    :style="style"
  >
    <div class="relative h-48 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-psyco-black-DEFAULT to-transparent z-10"></div>
      <ImageSkeleton
        :src="imageSrc"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        container-class-name="w-full h-full"
      />
      <div class="absolute top-4 left-4 z-20 bg-psyco-black-card p-2 rounded-lg">
        <div class="text-psyco-green-DEFAULT">
          <component :is="icon" />
        </div>
      </div>
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-semibold text-white mb-2">{{ title }}</h3>
      <p class="text-gray-300 mb-4 text-sm">{{ description }}</p>
      <router-link 
        :to="link"
        class="inline-flex items-center text-psyco-green-light hover:text-psyco-green-DEFAULT transition-colors duration-300 text-sm font-medium"
      >
        Learn more
        <ArrowRight class="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-vue-next'
import ImageSkeleton from '@/components/ui/ImageSkeleton.vue'
import type { Component } from 'vue'

interface Props {
  title: string
  description: string
  icon: Component
  imageSrc: string
  link: string
  className?: string
  style?: Record<string, any>
}

withDefaults(defineProps<Props>(), {
  className: '',
  style: () => ({})
})
</script>