<script setup>
definePageMeta({
  middleware: ['auth']
});
</script>

<template>
  <section>
    <h2>ID is{{ $route.params.id }}</h2>
    <nuxt-link to="/" class="border-4px border-black p-20px rounded-10px text-center flex-center inline-block">
      TO HOME
    </nuxt-link>
  </section>
</template>
