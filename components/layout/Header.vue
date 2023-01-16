<script setup>
const { AuthStore } = useStore()
</script>

<template>
  <header class="fixed top-20px left-1/2 -translate-x-1/2 min-w-170px min-h-38px shadow-lg p-10px md:p-6px bg-black text-white rounded-20px z-10 hover:min-w-280px hover:md:min-w-350px hover:min-h-150px duration-300 ease-[cubic-bezier(.55,-0.77,.23,1.64)]" />
  <button v-if="AuthStore().TOKEN_GETTER" class="fixed top-20px right-10px text-18px bg-white rounded-full border-4px border-black w-50px h-50px" @click.prevent="AuthStore().FN_LOGOUT">
    <fa icon="far fa-arrow-right-from-bracket" />
  </button>
</template>
