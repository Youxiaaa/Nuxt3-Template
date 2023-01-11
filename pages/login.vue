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
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="flex items-center justify-center min-h-screen after-content-none after-bg-[url(/images/login/login.svg)] after-bg-no-repeat after-bg-contain after-bg-center relative after-absolute after-top-0 after-left-0 after-w-full after-h-full after-opacity-50 md:after-opacity-0">
        <button @click="handleLogin" class="border-4px border-black rounded-10px py-10px px-40px fw-800 text-20px bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static z-10 md:-translate-x-0 md:-translate-y-0">登入</button>
      </div>
      <div class="w-full min-h-screen bg-#c9c9c9 hidden md:block flex-center">
        <img src="/images/login/login.svg" alt="Login" class="w-full object-cover">
      </div>
    </div>
  </section>
</template>