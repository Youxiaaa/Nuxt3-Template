<script setup>
const { AuthStore } = useStore()
</script>

<template>
  <header class="fixed top-20px left-1/2 -translate-x-1/2 min-w-160px md:min-w-250px flex flex-col gap-y-20px min-h-30px shadow-lg p-6px md:p-6px bg-black text-white min-h-0px rounded-20px z-10 hover:min-w-200px hover:md:min-w-350px hover:min-h-150px duration-300 ease-[cubic-bezier(.55,-0.77,.23,1.64)]">
    <h1 class="mx-auto">
      <nuxt-link to="/">
        ❤
      </nuxt-link>
    </h1>
    <button @click.prevent="AuthStore().FN_LOGOUT" v-if="AuthStore().TOKEN_GETTER">★</button>
  </header>
</template>
