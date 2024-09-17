<template>
  <div style="width: 100%; height: 100%">
    <AppTabBar @close="closeWindow"></AppTabBar>
    <div class="layout-container">
      <div class="menu">
        <div>
          <img class="avatar" src="@/assets/qinyulogo.png" />
        </div>
        <div class="menu-item iconfont icon-liaotian" @click="iconfontClick('chat')"></div>
        <div class="menu-item iconfont icon-pengyoufill" @click="iconfontClick('friendPage')"></div>
        <div class="menu-item"></div>
      </div>
      <div class="chat">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useLoadingStore } from '../../store/global'

const closeWindow = () => {
  qingyu.CloseWindow('login-windows')
}

const router = useRouter()
const iconfontClick = (name) => {
  const loading = useLoadingStore()
  loading.show()
  router.push({
    name
  })
}
</script>
<style scoped>
.layout-container {
  height: 100%;
  display: flex;
}

.menu {
  width: 60px;
  height: 100%;
  background: #0099ff;
  padding-top: 60px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.menu-item {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
}

.menu-item:hover {
  background: #63b4fd;
}

.layout-container .chat {
  width: 100%;
  height: 100%;
  background: #e8e8e8;
}
</style>
