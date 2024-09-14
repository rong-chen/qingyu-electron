<template>
  <div class="chat-container">
    <search-mod></search-mod>
    <div class="history-chat">
      <ul>
        <li
          class="chat-item"
          :class="{
            checked: true
          }"
        >
          121232
        </li>
        <li class="chat-item" v-for="item in chatStore.ChatMessage">{{ item.message }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import SearchMod from '../../components/searchMod/index.vue'
import { onMounted, ref } from 'vue'
import { useChatMessage } from '../../store/chatMessage'

const chatStore = useChatMessage()
onMounted(async () => {
  await chatStore.getChatMessageList()
})
</script>

<style scoped>
.chat-container {
  width: 250px;
  height: 100%;
  background: white;
}

.history-chat {
  overflow: auto;
  width: 250px;
  height: calc(100% - 60px);
}

.chat-item {
  height: 60px;
  cursor: pointer;
  padding: 10px;
  box-sizing: border-box;
}

.chat-item.checked {
  background: #c4e4fb;
}
</style>
