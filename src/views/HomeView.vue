<template>
  <div>123</div>
</template>
<script lang="ts" setup>
import router from '@/router/index'
import { onBeforeMount, onBeforeUnmount } from 'vue'

let timerId: number | null = null

onBeforeMount(() => {
  routing()
})

onBeforeUnmount(() => {
  if (timerId !== null) clearTimeout(timerId)
})

const routing = () => {
  timerId = setTimeout(() => {
    router.push({ name: 'map' })
  }, 3000)
}
</script>
