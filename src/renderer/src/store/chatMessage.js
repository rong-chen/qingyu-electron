import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getChatList } from '../api/chat'

export const useChatMessage = defineStore('useChatMessage', () => {
  const ChatMessage = ref([])
  const getChatMessageList = async () => {
    const res = await getChatList()
    if (res['code'] === 0) {
      ChatMessage.value = res.data
    }
  }
  return {
    ChatMessage,
    getChatMessageList
  }
})
