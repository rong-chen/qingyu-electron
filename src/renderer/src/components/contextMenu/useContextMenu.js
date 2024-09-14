import { onMounted, onUnmounted, ref } from "vue";

export default function(containerRef) {
  let show = ref(false)
  let X = ref(0)
  let Y = ref(0)

  function contextMenuHandler(e) {
    X.value =e.clientX
    Y.value = e.clientY
    show.value = true
  }

  onMounted(() => {
    const div = containerRef.value
    div.addEventListener('contextmenu', contextMenuHandler)
  });
  onUnmounted(() => {
    const div = containerRef.value
    div.removeEventListener("contextmenu", contextMenuHandler);
  });
  return {
    show,
    X,
    Y
  };
}
