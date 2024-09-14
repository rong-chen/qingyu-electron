<template>
  <div class="app-tab-bar">
    <div class="moveWindows" style="flex: 1; height: 100%"></div>
    <div class="iconfont icon-guanbi close-icon" @click="$emit('close')"></div>
  </div>
</template>
<script setup></script>
<script>
export default {
  name: 'AppTabBar'
}
</script>

<style scoped>
.app-tab-bar {
  width: 100%;
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  height: 30px;
  align-items: center;
  padding: 0 8px;
  position: fixed;
  top: 0;
  z-index: 999;
}

.close-icon {
  cursor: pointer;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 3px;
}

.close-icon:hover {
  color: white;
  background: red;
}
</style>
