import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWebRTCStore } from '@/store/webrtc.js'
import { ElNotification } from 'element-plus'
import { useAudioStore } from '@/store/audio.js'
import { audioSocketEvent } from '@/store/websocketHandler/audio_handler.js'
import { useUserStore } from '../user'
import { useChatMessage } from '../chatMessage'

export const useSocketStore = defineStore('SocketStore', () => {
  let socket = ref(null)
  let user = useUserStore()
  let webrtcStore = useWebRTCStore()
  const chatMessageStore = useChatMessage()
  let audioStore = useAudioStore()

  const openSocket = () => {
    if (socket.value) {
      socket.value.close()
    }
    socket.value = new WebSocket(`/socket/conn/ws/${user.userInfo.ID}`)
    socketEvent()
  }
  const socketEvent = () => {
    // websocket 打开的时候执行获取历史聊天记录
    socket.value.onopen = async () => {
      chatMessageStore.ChatMessage = []
      const { data, code } = await chatMessageStore.getChatMessageList()
      if (code === 0) {
        chatMessageStore.ChatMessage = data
      }
    }
    // websocket 接收消息
    socket.value.onmessage = async (event) => {
      let data = JSON.parse(event.data)
      // 交换audio通信凭证
      if (data.type === 'audio') {
        await webrtcStore.onMessageFromServer(data)
        return
      }
      if (data.type === 'text') {
        chatMessageStore.ChatMessage.push(data)
        return
      }
      // 系统通知
      if (data.type === 'broadcast') {
        ElNotificationEvent(data.message)
        return
      }
      // audio申请请求
      if (data.type === 'audio_conn') {
        audioStore.currentFriendId = data.sender
        await audioSocketEvent(data)
      }
    }
    socket.value.onerror = (event) => {}
  }
  const send = (val) => {
    if (val.type === 'text') {
      chatMessageStore.ChatMessage.push(val)
    }
    socket.value.send(JSON.stringify(val))
  }
  let elNotification = ref(null)
  const ElNotificationEvent = (msg) => {
    if (!elNotification.value) {
      elNotification.value = ElNotification({
        title: msg,
        dangerouslyUseHTMLString: true,
        duration: 5000
      })
      setTimeout(() => {
        elNotification.value = null
      }, 5000)
    }
  }

  return {
    socket,
    openSocket,
    send
  }
})
