<template>
  <div :class="containerClassName">
    <div v-if="loading" class="w-full h-full bg-gray-700 animate-pulse rounded"></div>
    <img
      v-show="!loading"
      :src="src"
      :alt="alt"
      :class="className"
      @load="loading = false"
      @error="loading = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string
  alt: string
  className?: string
  containerClassName?: string
}

withDefaults(defineProps<Props>(), {
  className: '',
  containerClassName: ''
})

const loading = ref(true)
</script>