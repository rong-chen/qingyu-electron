<template>
  <div id="contextMenu">
    <slot></slot>
    <div>
      <div class="menu">
        <div v-for="item in prop.menu" class="item">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, defineProps } from 'vue'

onMounted(() => {
  let contextMenu = document.getElementById('contextMenu')
  contextMenu.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    console.log(e)
  })
})
const prop = defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})
</script>
<script>
export default {
  name: 'contextMenu'
}
</script>

<style scoped></style>
