import { defineStore } from 'pinia'
import { ref } from 'vue'
import { httpClient } from '../api'
import type { Role, Chat } from '../types'

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([])
  const isLoading = ref<boolean>(false)

  function createChat(isAnonymous: boolean) {
    const chat: Chat = {
      id: crypto.randomUUID(),
      title: 'New chat',
      isAnonymous,
      messages: [],
    }

    chats.value.push(chat)
    saveToStorage()

    return chat
  }

  function addMessage(chatId: string, role: Role, content: string) {
    const chat = chats.value.find(c => c.id === chatId)
    if (!chat) return

    chat.messages.push({
      role,
      content,
    })
    saveToStorage()
  }

  function saveToStorage() {
    const nonAnonymous = chats.value.filter(c => !c.isAnonymous)
    localStorage.setItem('chats', JSON.stringify(nonAnonymous))
  }

  function loadChatsFromStorage() {
    const data = localStorage.getItem('chats')
    if (data) {
      chats.value = JSON.parse(data)
    }
  }

  function deleteChat(chatId: string) {
    chats.value = chats.value.filter(c => c.id !== chatId)
    saveToStorage()
  }

  async function sendChatMessage(message: string, chatId: string): Promise<void> {
    try {
      isLoading.value = true

      addMessage(chatId, 'user', message)

      const chat = chats.value.find(c => c.id === chatId)
      if (!chat) return

      const res = await httpClient.post('/chat/completions', {
        model: 'zai-glm-4.6',
        messages: chat.messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      })

      if (chat.messages.length === 1) {
        await generateChatTitle(message, chat)
      }

      const responseMessage = res.data.choices[0].message.content
      addMessage(chatId, 'assistant', responseMessage)
    } finally {
      isLoading.value = false
    }
  }

  async function generateChatTitle(message: string, chat: Chat): Promise<void> {
    try {
      const res = await httpClient.post('/chat/completions', {
        model: 'zai-glm-4.6',
        messages: [
          {
            role: 'system',
            content:
              'Create a short title (2-3 words) for a chat based on the message. Reply with the title only.',
          },
          { role: 'user', content: message },
        ],
      })
      chat.title = res.data.choices[0].message.content.trim()
      saveToStorage()
    } catch {
      throw new Error('Failed to generate chat name')
    }
  }

  return {
    chats,
    createChat,
    addMessage,
    loadChatsFromStorage,
    isLoading,
    sendChatMessage,
    deleteChat,
  }
})
