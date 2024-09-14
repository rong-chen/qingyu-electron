<template>
  <div ref="contextMenuRef">
    <slot></slot>
    <Teleport to="body">
      <div
        class="menu"
        v-show="show"
        :style="{
          top: y,
          left: x
        }"
      >
        <div v-for="item in prop.menu" class="item">
          {{ item }}
        </div>
      </div>
    </Teleport>
  </div>
</template>
<script setup>
import { onMounted, defineProps, ref } from 'vue'
import useContextMenu from './useContextMenu'

onMounted(() => {
  let contextMenu = document.getElementById('contextMenu')
  contextMenu.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    console.log(e)
  })
})
const contextMenuRef = ref(null)
const prop = defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})
const { x, y, show } = useContextMenu(contextMenuRef)
</script>
<script>
export default {
  name: 'contextMenu'
}
</script>

<style scoped></style>
