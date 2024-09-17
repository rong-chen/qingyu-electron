<template>
  <div class="chat-page-container">
    <div class="title">
      {{ info.nickname }}
    </div>
    <div
      ref="messageRef"
      class="message-container"
      style="overflow: auto; height: calc(100% - 155px)"
    >
      <div v-for="item in chatList" :key="item.id" class="content">
        <div v-show="item.sender === user.userInfo.ID" class="left-message">
          <el-avatar
            style="min-width: 40px; min-height: 40px"
            shape="square"
            :src="friendInfo.avatar"
          />
          <div class="message-content multi-line-ellipsis">
            {{ item.message }}
          </div>
        </div>
        <div v-show="item.receiver === user.userInfo.ID" class="right-message">
          <div class="message-content">
            {{ item.message }}
          </div>
          <el-avatar shape="square" :src="friendInfo.avatar" />
        </div>
      </div>
    </div>
    <div v-show="info.ID" class="chat-input">
      <el-input
        v-model="sendParams"
        placeholder="原神启动"
        class="sendInput"
        @keyup.enter="handleEnter"
      />
      <el-button style="height: 40px; margin-left: 10px; width: 40px" @click="audioHandler">
        <div class="iconfont icon-yuyin"></div>
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref, toRefs, watch, watchEffect } from 'vue'
import qingyulogo from '@/assets/qinyulogo.png'
import { useChatMessage } from '../../store/chatMessage'
import { useUserStore } from '../../store/user'
import { useSocketStore } from '../../store/websocketHandler/websocket'

const user = useUserStore()
const messageRef = ref(null)
let friendInfo = ref({
  avatar: qingyulogo
})
onMounted(() => {})
const scrollToBottom = () => {
  nextTick(() => {
    messageRef.value.scrollTop = messageRef.value.scrollHeight
  })
}
const prop = defineProps({
  info: {
    type: String,
    required: true
  }
})
const socketStore = useSocketStore()
const audioHandler = async () => {}
const handleEnter = () => {
  if (sendParams.value) {
    let params = {
      type: 'text',
      message: sendParams.value,
      description: '',
      sender: user.userInfo.ID,
      receiver: info.value.ID
    }
    socketStore.send(params)
    sendParams.value = ''
  }
}
const { info } = toRefs(prop)
watchEffect(() => {
  scrollToBottom()
})
const chatStore = useChatMessage()
const chatList = computed(() =>
  chatStore.ChatMessage.filter(
    (item) => item.sender === info.value.ID || item.receiver === info.value.ID
  )
)
watch(
  () => chatList,
  (newValue) => {
    scrollToBottom()
  },
  {
    deep: true
  }
)

let sendParams = ref('')
</script>
<style scoped lang="scss">
.chat-page-container {
  width: 100%;
  height: 100%;
  position: relative;

  .title {
    height: 55px;
    border-bottom: 1px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 10px;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 16px;

    .mediaSetting {
      position: absolute;
      right: 10px;
    }
  }

  .chat-input {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;

    .sendInput {
      height: 40px;
      width: 60%;
      font-size: 18px;
    }
  }

  .content {
    color: white;
    box-sizing: border-box;
    padding: 10px;
    min-height: 60px;
    display: flex;

    .left-message {
      display: flex;
      width: 100%;

      .message-content {
        max-width: 60%;
        margin-left: 10px;
        border: 1px solid #ffffff;
        padding: 10px;
        border-radius: 10px;
        color: #000000;
        background: #ffffff;
        display: flex;
        flex-wrap: wrap;
        user-select: text !important;
      }
    }

    .right-message {
      display: flex;
      justify-content: right;
      width: 100%;

      .message-content {
        max-width: 60%;
        margin-right: 10px;
        border: 1px solid #ffffff;
        padding: 10px;
        border-radius: 10px;
        color: #000000;
        background: white;
        user-select: text !important;
      }
    }
  }
}
</style>

<style>
.el-input__wrapper.is-focus {
  box-shadow: none;
}
</style>
