<script lang="ts" setup>
const { useBackTop } = useGsap()

const isShow = ref(false)
function goTop () {
  useBackTop()
}

onMounted(() => {
  window.onscroll = () => {
    if (window.scrollY >= 500) {
      isShow.value = true
    } else {
      isShow.value = false
    }
  }
})
</script>

<template>
  <section>
    <transition name="fade">
      <div v-if="isShow" class="z-99 fixed bottom-20px right-20px rounded-full w-60px h-60px border-4px border-black flex items-center justify-center bg-white cursor-pointer" @click="goTop">
        <fa icon="fas fa-angle-up" class="text-24px" />
      </div>
    </transition>
  </section>
</template>
