<template>
  <div>
    <Navbar />
    <div class="pt-20">
      <!-- Hero Section -->
      <section class="bg-psyco-black-light py-16 px-6 md:px-12">
        <div class="max-w-7xl mx-auto">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
              Let's Work Together
            </h1>
            <p class="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-100">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life with modern web technologies.
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Form and Info -->
      <section class="py-16 px-6 md:px-12">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Contact Form -->
            <Card class="glassmorphism border-green-500/20">
              <CardHeader>
                <CardTitle class="text-2xl text-white">Send me a message</CardTitle>
                <CardDescription class="text-gray-300">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form @submit="handleSubmit" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label for="name" class="block text-sm font-medium text-white mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        v-model="form.name"
                        type="text"
                        required
                        class="bg-psyco-black-light border-green-500/30 text-white placeholder:text-gray-400"
                        placeholder="Your name"
                      />
                    </div>
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
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label for="subject" class="block text-sm font-medium text-white mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      v-model="form.subject"
                      type="text"
                      required
                      class="bg-psyco-black-light border-green-500/30 text-white placeholder:text-gray-400"
                      placeholder="Project inquiry"
                    />
                  </div>
                  
                  <div>
                    <label for="message" class="block text-sm font-medium text-white mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      v-model="form.message"
                      required
                      rows="6"
                      class="bg-psyco-black-light border-green-500/30 text-white placeholder:text-gray-400"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    class="w-full bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white"
                  >
                    <Send class="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <!-- Contact Information -->
            <div class="space-y-8">
              <Card class="glassmorphism border-green-500/20">
                <CardHeader>
                  <CardTitle class="text-2xl text-white">Get in touch</CardTitle>
                  <CardDescription class="text-gray-300">
                    I'm always open to discussing new opportunities and interesting projects.
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                  <div class="flex items-center space-x-4">
                    <div class="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Mail class="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 class="text-lg font-medium text-white">Email</h3>
                      <a 
                        href="mailto:muhammad.mahathir.id@gmail.com"
                        class="text-gray-300 hover:text-psyco-green-DEFAULT transition-colors"
                      >
                        muhammad.mahathir.id@gmail.com
                      </a>
                    </div>
                  </div>

                  <div class="flex items-center space-x-4">
                    <div class="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Github class="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 class="text-lg font-medium text-white">GitHub</h3>
                      <a 
                        href="https://github.com/Mahathirrr"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-300 hover:text-psyco-green-DEFAULT transition-colors"
                      >
                        github.com/Mahathirrr
                      </a>
                    </div>
                  </div>

                  <div class="flex items-center space-x-4">
                    <div class="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Linkedin class="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 class="text-lg font-medium text-white">LinkedIn</h3>
                      <a 
                        href="https://www.linkedin.com/in/muhammad-mahathir/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-300 hover:text-psyco-green-DEFAULT transition-colors"
                      >
                        Muhammad Mahathir
                      </a>
                    </div>
                  </div>

                  <div class="flex items-center space-x-4">
                    <div class="bg-psyco-green-DEFAULT/20 p-3 rounded-lg">
                      <Clock class="h-6 w-6 text-psyco-green-DEFAULT" />
                    </div>
                    <div>
                      <h3 class="text-lg font-medium text-white">Response Time</h3>
                      <p class="text-gray-300">Usually within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card class="glassmorphism border-green-500/20">
                <CardHeader>
                  <CardTitle class="text-xl text-white">What I can help with</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul class="space-y-3 text-gray-300">
                    <li class="flex items-center space-x-3">
                      <div class="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>Vue.js Frontend Development</span>
                    </li>
                    <li class="flex items-center space-x-3">
                      <div class="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>Golang Backend Development</span>
                    </li>
                    <li class="flex items-center space-x-3">
                      <div class="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>Data Science & Analytics</span>
                    </li>
                    <li class="flex items-center space-x-3">
                      <div class="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>API Development & Integration</span>
                    </li>
                    <li class="flex items-center space-x-3">
                      <div class="w-2 h-2 bg-psyco-green-DEFAULT rounded-full"></div>
                      <span>Database Design & Optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Mail, Github, Linkedin, Clock, Send } from 'lucide-vue-next'
import Navbar from '@/components/Navbar.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Scroll to top on page load
onMounted(() => {
  window.scrollTo(0, 0)
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  // Handle form submission
  console.log('Form submitted', form.value)
}
</script>