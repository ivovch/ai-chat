<template>
  <div class="input-box d-flex align-center ga-3 py-3">
    <v-text-field
      v-model="model"
      variant="outlined"
      hide-details
      :disabled="disabled"
      @keyup.enter="sendMessageHandler"
    />

    <v-btn
      icon="mdi-send-variant"
      variant="tonal"
      :disabled="disabled"
      @click="sendMessageHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  disabled: boolean
}>()

const emits = defineEmits(['send'])

const model = ref('')

const sendMessageHandler = () => {
  if (!model.value.trim()) return

  emits('send', model.value)
  model.value = ''
}
</script>
