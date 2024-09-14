import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GetUserInfo, Login as LoginAPi } from '../api/user'
import router from '../router'
import { useSocketStore } from './websocketHandler/websocket'

export const useUserStore = defineStore('useUsersStore', () => {
  let token = ref(localStorage.getItem('token'))
  const SocketStore = useSocketStore()
  const userInfo = ref({
    ID: ''
  })
  const Login = async (data) => {
    const res = await LoginAPi(data)
    if (res['code'] === 0) {
      localStorage.setItem('token', res.data)
      token.value = res.data
      router
        .push({
          name: 'chat'
        })
        .then(async () => {
          await getUserInfo()
          await qingyu.GoToHomePage('login-windows')
          await SocketStore.openSocket()
        })
    }
  }
  const getUserInfo = async () => {
    const res = await GetUserInfo()
    if (res && res['code'] === 0) {
      userInfo.value = res.data
    }
  }
  return {
    token,
    Login,
    userInfo
  }
})
