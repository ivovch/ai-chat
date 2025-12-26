<template>
  <div class="chat-stub d-flex flex-column align-center justify-center position-relative">
    <div v-if="mobile" class="position-absolute left-0 top-0">
      <v-btn icon="mdi-menu" variant="text" @click="openDrawerHandler" />
    </div>

    <v-icon size="80" color="primary" class="mb-4">mdi-robot-outline</v-icon>

    <h1 class="text-h4 font-weight-medium mb-2">Welcome to AI Chat</h1>
    <p class="text-body-1 text-medium-emphasis mb-8">
      Select a chat or create a new one to get started
    </p>

    <v-card variant="tonal" rounded="lg" class="pa-4" max-width="400">
      <div class="d-flex align-center mb-3">
        <v-icon size="small" color="warning" class="mr-2">mdi-lightbulb-outline</v-icon>
        <span class="text-subtitle-2 font-weight-medium">Try asking:</span>
      </div>

      <div class="d-flex flex-column ga-2">
        <v-chip variant="outlined" size="small">"Explain TypeScript generics"</v-chip>
        <v-chip variant="outlined" size="small">"Write a Vue 3 composable"</v-chip>
        <v-chip variant="outlined" size="small">"How does async/await work?"</v-chip>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const emits = defineEmits(['open'])
const openDrawerHandler = () => emits('open')

const { mobile } = useDisplay()
</script>

<style scoped>
.chat-stub {
  height: 100vh;
  width: 100%;
}
</style>
