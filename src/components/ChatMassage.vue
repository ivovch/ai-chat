<template>
  <div class="chat-massage d-flex justify-items-end align-center ga-3" :class="containerClasses">
    <v-avatar class="chat-massage__avatar" :color="avatarColor" size="40">
      {{ avatarText }}
    </v-avatar>
    <v-card
      class="chat-massage__text pa-3"
      :color="cardColor"
      :variant="cardVariant"
      rounded="lg"
      max-width="70%"
      v-html="renderedContent"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  text: string
  role: 'user' | 'assistant'
}>()

const isUser = computed(() => props.role === 'user')

const containerClasses = computed(() => ({
  'flex-row-reverse': isUser.value,
}))

const avatarText = computed(() => (isUser.value ? 'U' : 'AI'))
const avatarColor = computed(() => (isUser.value ? 'success' : 'primary'))

const cardColor = computed(() => (isUser.value ? 'primary' : 'neutral'))
const cardVariant = computed(() => (isUser.value ? 'flat' : 'tonal'))

const renderedContent = computed(() => marked.parse(props.text))
</script>

<style scoped>
.chat-massage__text {
  max-width: 800px;
}
</style>
