<template>
  <div ref="contextMenuRef">
    <slot></slot>
    <Teleport to="body">
      <div
        v-show="show"
        class="menu"
        :style="{
          top: `${Y}px`,
          left: `${X}px`
        }"
      >
        <div v-for="item in prop.menu" :key="item" class="item" @click="$emit('select', item)">
          {{ item }}
        </div>
      </div>
    </Teleport>
  </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from 'vue'
import useContextMenu from './useContextMenu'

onMounted(() => {})
const contextMenuRef = ref(null)
const prop = defineProps({
  menu: {
    type: Array,
    default: () => []
  }
})
const { X, Y, show } = useContextMenu(contextMenuRef)
</script>
<script>
export default {
  name: 'ContextMenu'
}
</script>

<style scoped>
.menu {
  position: fixed;
  z-index: 9999;
  border: 1px solid rgba(0, 0, 0, 0.31);
  background-color: #f6f6f6;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}

.menu .item {
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 5px;
  font-size: 10px;
}
.menu .item:hover {
  background-color: #efefef;
}
</style>
