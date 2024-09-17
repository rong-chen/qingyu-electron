import { onMounted, onUnmounted, ref } from 'vue'

export default function (containerRef) {
  let show = ref(false)
  let X = ref(0)
  let Y = ref(0)

  const contextMenuHandler = (e) => {
    X.value = e.clientX
    Y.value = e.clientY
    show.value = true
  }
  const removeOtherEle = () => {
    show.value = false
  }

  onMounted(() => {
    const div = containerRef.value
    window.addEventListener('contextmenu', removeOtherEle, true)
    div.addEventListener('contextmenu', contextMenuHandler)
    window.addEventListener('click', removeOtherEle, true)
  })

  onUnmounted(() => {
    const div = containerRef.value
    window.removeEventListener('contextmenu', removeOtherEle, true)
    div.removeEventListener('contextmenu', contextMenuHandler)
    window.removeEventListener('click', removeOtherEle, true)
  })
  return {
    show,
    X,
    Y
  }
}
