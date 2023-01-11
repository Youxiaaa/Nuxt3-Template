<script setup>
  definePageMeta({
    middleware: ['auth'],
    layout: 'login',
  })

  const { $swal } = useNuxtApp()
  const router = useRouter()

  function handleLogin() {
    const { AuthStore } = useStore()

    AuthStore().FN_SET_TOKEN('5566')

    $swal.fire({
      html: '<p class="fw-800 text-20px">登入成功</p>',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      router.push('/')
    })
  }
</script>
<template>
  <section>
    <div class="grid grid-cols-2">
      <div class="flex items-center justify-center min-h-screen">
        <button @click="handleLogin" class="border-4px border-black rounded-10px py-10px px-40px fw-800 text-20px">登入</button>
      </div>
      <div class="w-full min-h-screen bg-black"></div>
    </div>
  </section>
</template>