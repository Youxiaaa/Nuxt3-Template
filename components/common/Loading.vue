<script lang="ts" setup>
const { LoadingStore } = useStore()

const loadiongArrRef = toRef(LoadingStore(), 'CHECK_LOADING_ARRAY_LEGNTH')
const isOpen = ref(false)

watch(() => loadiongArrRef.value, (oldVal, newVal) => {
  if (newVal) isOpen.value = true
  if (!newVal) {
    setTimeout(() => {
      if (!loadiongArrRef.value) isOpen.value = false
    }, 500);
    setTimeout(() => {
      if (!loadiongArrRef.value) isOpen.value = false
    }, 3000);
  }
})
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed top-0 left-0 w-full h-full bg-black/25 flex-center z-99">
      <h2 class="tracking-10px text-white fw-800 text-24px">LOADING ...</h2>
    </div>
  </transition>
</template>
