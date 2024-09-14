<template>
  <div class="login-container">
    <AppTabBar @close="closeWindow"></AppTabBar>
    <div class="login-form background">
      <div class="moveWindows">
        <img class="Logo" src="@/assets/qinyulogo.png" alt="清语" />
      </div>
      <form style="margin-top: 20px" @submit="submit">
        <div class="login-form-item">
          <div
            class="input-container"
            style="width: 80%; height: 40px; border-radius: 5px; margin: auto"
          >
            <input
              v-model="form.username"
              style="text-align: center; font-size: 16px"
              class="input"
              placeholder="输入帐号"
            />
          </div>
        </div>
        <div class="login-form-item" style="margin-top: 13px">
          <div
            class="input-container"
            style="width: 80%; height: 40px; border-radius: 5px; margin: auto"
          >
            <input
              v-model="form.password"
              class="input"
              type="password"
              style="text-align: center; font-size: 16px"
              placeholder="输入密码"
            />
          </div>
        </div>
        <div
          class="login-form-item"
          style="margin-top: 13px; display: flex; justify-content: center"
        >
          <input type="checkbox" />
          <div style="font-size: 15px; color: #80bff8; margin-left: 10px">自动登录</div>
        </div>
        <div class="login-form-item" style="margin-top: 25px">
          <button class="loginBtn disabled" type="submit">登录</button>
        </div>
      </form>
      <div style="height: calc(100% - 300px)" class="moveWindows"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { Login } from '../../api/user'
import router from '../../router'
import { useUserStore } from '../../store/user'

const closeWindow = () => {
  qingyu.CloseWindow('login-windows')
}
const form = ref({
  username: '',
  password: ''
})

watch(
  () => form.value,
  () => {
    let loginBtn = document.querySelector('.loginBtn')
    if (!loginBtn) return
    if (form.value.username && form.value.password) {
      if (loginBtn.classList.contains('disabled')) {
        loginBtn.classList.remove('disabled')
      }
    } else {
      loginBtn.classList.add('disabled')
    }
  },
  {
    deep: true
  }
)
const userStore = useUserStore()
const submit = async (e) => {
  e.preventDefault()
  if (form.value.username && form.value.password) {
    userStore.Login(form.value)
  }
}
onMounted(() => {})
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.login-form {
  width: 100%;
  height: 100%;
  padding: 65px 0 0 0;
  margin: 0 auto;
  text-align: center;
  position: fixed;
  top: 65px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #fbd3d3, #d7f4f4, #f8d7d7, #e1fbeb);
  background-size: 200% 300%;
  animation: gradientAnimation 10s ease infinite;
}

.Logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.loginBtn {
  width: 80%;
  color: #fff;
  background: #0092fd;
  height: 36px;
  border-radius: 5px;
  cursor: pointer;
}

.loginBtn.disabled {
  cursor: not-allowed !important;
  background: #a3d5ff !important;
}

.loginBtn:hover {
  background: #4fabff;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
