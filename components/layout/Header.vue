<script setup>
const { AuthStore } = useStore()
</script>

<template>
  <header class="fixed top-0 left-0 w-full min-h-30px shadow-lg p-20px bg-white z-10 flex items-center justify-between">
    <h1>
      <nuxt-link to="/">
        LOGO
      </nuxt-link>
    </h1>
    <button @click.prevent="AuthStore().FN_LOGOUT" v-if="AuthStore().TOKEN_GETTER" class="border-4px border-black px-30px rounded-10px">登出</button>
  </header>
</template>
