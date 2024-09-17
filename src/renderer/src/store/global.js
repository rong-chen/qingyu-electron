import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElLoading } from 'element-plus'

export const useLoadingStore = defineStore('useLoadingStore', () => {
  let ElLoadingEle = ref(null)
  const show = () => {
    ElLoadingEle.value = ElLoading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  const hidden = () => {
    if (ElLoadingEle.value) {
      ElLoadingEle.value.close()
    }
  }
  return {
    show,
    hidden
  }
})
