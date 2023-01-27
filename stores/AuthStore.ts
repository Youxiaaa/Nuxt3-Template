import { defineStore } from 'pinia'

export const AuthStore = defineStore('auth-store', () => {
  const TOKEN_REF = ref(useCookie('authorization'))

  const TOKEN_GETTER = computed(() => TOKEN_REF.value || '')

  function FN_SET_TOKEN (token: string) {
    TOKEN_REF.value = token
  }

  function FN_LOGOUT () {
    TOKEN_REF.value = null

    const { $swal } = useNuxtApp()

    $swal.fire({
      html: '<p class="fw-800 text-20px">登出成功</p>',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      const router = useRouter()
      router.push('/login')
    })
  }

  function FN_REMOVE_TOKEN () {
    const authorization = useCookie('authorization')
    authorization.value = null
    const router = useRouter()
    router.push('/login')
  }

  return {
    TOKEN_GETTER,
    FN_SET_TOKEN,
    FN_LOGOUT,
    FN_REMOVE_TOKEN
  }
})
