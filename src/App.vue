<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :permanent="!mobile" :width="400">
      <div class="side-menu-content">
        <div class="d-flex flex-column ga-3 pa-3 border-b">
          <div class="d-flex justify-space-between">
            <v-btn icon="mdi-theme-light-dark" variant="tonal" @click="themeToggle" />
            <v-btn
              v-if="mobile"
              icon="mdi-close"
              color="error"
              variant="text"
              @click="drawer = false"
            />
          </div>

          <v-btn block size="large" variant="tonal" @click="createNewChatHandler">
            Create new chat</v-btn
          >

          <v-card class="mt-3" flat>
            <v-card-text class="d-flex justify-space-between align-center pa-3">
              <div class="d-flex align-center">
                <v-icon size="small" class="mr-2">mdi-incognito</v-icon>
                <span class="text-body-2">Incognito mode</span>
              </div>
              <v-switch
                v-model="anonymousMode"
                color="orange"
                hide-details
                density="compact"
                inset
              ></v-switch>
            </v-card-text>
          </v-card>
        </div>

        <v-list nav>
          <v-list-item
            v-for="chat in chats"
            :key="chat.id"
            :to="`/${chat.id}`"
            :active="chat.id === activeChatId"
            border
          >
            <v-list-item-title>{{ chat.title }}</v-list-item-title>

            <template #append>
              <v-chip v-if="chat.isAnonymous" size="small" color="orange">Incognito mode</v-chip>
              <v-btn
                icon="mdi-delete"
                color="error"
                variant="text"
                @click.prevent="removeChatHandler(chat.id)"
              />
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main class="d-flex overflow-hidden">
      <router-view v-slot="{ Component }">
        <component :is="Component" @open="drawer = true" />
      </router-view>
    </v-main>

    <v-snackbar v-model="snackbar.state.show" :color="snackbar.state.color" :timeout="3000">
      {{ snackbar.state.message }}
    </v-snackbar>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete chat?</v-card-title>
        <v-card-text>
          This action cannot be undone. All messages will be permanently deleted.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import { useChatStore } from './store/useChatStore.ts'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { router } from './router/router.ts'
import { useSnackbar } from './composables/useSnackbar'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const drawer = ref(!mobile.value)

const snackbar = useSnackbar()

const route = useRoute()
const activeChatId = computed(() => route.params.id)

const store = useChatStore()
const { chats } = storeToRefs(store)
const { createChat, loadChatsFromStorage } = store
loadChatsFromStorage()

const theme = useTheme()
const themeToggle = () => theme.toggle()

const anonymousMode = ref(false)

const createNewChatHandler = () => {
  const { id } = createChat(anonymousMode.value)
  router.push(`/${id}`)
}

const deleteDialog = ref(false)
const chatToDelete = ref<string | null>(null)

const confirmDelete = () => {
  if (chatToDelete.value) {
    store.deleteChat(chatToDelete.value)
  }
  deleteDialog.value = false
  chatToDelete.value = null
}

const removeChatHandler = (chatId: string) => {
  deleteDialog.value = true
  chatToDelete.value = chatId
}
</script>
