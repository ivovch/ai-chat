<template>
  <div class="chat-view d-flex justify-center overflow-hidden px-3">
    <div class="chat-view__content d-flex flex-column">
      <header class="flex-shrink-0 text-h5 py-3">
        <v-btn v-if="mobile" icon="mdi-menu" variant="text" @click="openDrawerHandler" />
        {{ currentChat?.title }}
        <v-chip v-if="currentChat?.isAnonymous" size="small" color="orange" class="ml-2"
          >Incognito mode</v-chip
        >
      </header>

      <div
        ref="messagesContainer"
        class="chat-view__content flex-grow-1 d-flex flex-column ga-3 overflow-y-auto my-3"
      >
        <ChatMassage
          v-for="(m, i) in currentChatMessages"
          :key="i"
          :text="m.content"
          :role="m.role"
        />
      </div>
      <LoadingState v-if="isLoading" />

      <footer class="flex-shrink-0">
        <InputBox :disabled="isLoading" @send="sendMassageHandler" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import InputBox from './InputBox.vue'
import ChatMassage from './ChatMassage.vue'
import { useChatStore } from '../store/useChatStore.ts'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useSnackbar } from '../composables/useSnackbar.ts'
import LoadingState from './LoadingState.vue'
import { useDisplay } from 'vuetify'

const emits = defineEmits(['open'])
const openDrawerHandler = () => emits('open')

const { mobile } = useDisplay()

const { showError } = useSnackbar()

const route = useRoute()
const router = useRouter()
const currentChatId = computed(() => route.params.id as string)

const store = useChatStore()
const { chats, isLoading } = storeToRefs(store)

const currentChat = computed(() => chats.value.find(chat => chat.id === currentChatId.value))

const currentChatMessages = computed(
  () => chats.value.find(chat => chat.id === currentChatId.value)?.messages || []
)

const messagesContainer = ref<HTMLElement | null>(null)
watch(
  () => currentChatMessages.value?.length,
  () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTo({
          top: messagesContainer.value.scrollHeight,
          behavior: 'smooth',
        })
      }
    })
  }
)

const sendMassageHandler = async (value: string) => {
  try {
    await store.sendChatMessage(value, currentChatId.value)
  } catch (err) {
    showError(err)
  }
}

watch(
  currentChat,
  chat => {
    if (!chat && currentChatId.value) {
      router.replace('/')
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.chat-view {
  height: 100vh;
  width: 100%;
}

.chat-view__content {
  max-width: 1000px;
  width: 100%;
}
</style>
