<script lang="ts" setup>
import { LoadingStore } from '~/stores'

const isOpen = ref(false)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(() => LoadingStore().LOADING_ARRAY_LENGTH_GETTER, (oldVal, newVal) => {
  if (newVal) {
    setTimeout(() => {
      if (LoadingStore().LOADING_ARRAY_LENGTH_GETTER) {
        isOpen.value = true
      }
    }, 500)
  }
  if (!newVal) {
    setTimeout(() => {
      if (!LoadingStore().LOADING_ARRAY_LENGTH_GETTER) { isOpen.value = false }
    }, 600)
    setTimeout(() => {
      if (!LoadingStore().LOADING_ARRAY_LENGTH_GETTER) { isOpen.value = false }
    }, 3000)
  }
})
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed top-0 left-0 w-full h-full bg-black/25 flex-center z-999">
      <h2 class="tracking-10px text-white fw-800 text-24px">
        LOADING ...
      </h2>
    </div>
  </transition>
</template>
