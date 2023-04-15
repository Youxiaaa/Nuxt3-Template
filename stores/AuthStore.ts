import { defineStore } from 'pinia'
import { FETCH_AUTH } from '~/api'

export const AuthStore = defineStore('auth-store', () => {
  const TOKEN_REF = ref(useCookie('authorization'))

  const TOKEN_GETTER = computed(() => TOKEN_REF.value || '')

  function FN_SET_TOKEN (token: string) {
    TOKEN_REF.value = token
  }

  const REFRESH_TOKEN_REF = ref(useCookie('refreshToken'))

  const REFRESH_TOKEN_GETTER = computed(() => REFRESH_TOKEN_REF.value)

  function FN_SET_REFRESH_TOKEN (refreshToken: string) {
    REFRESH_TOKEN_REF.value = refreshToken
  }

  const USER_INFO = ref({}) as any

  const USER_INFO_GETTER = computed(() => USER_INFO.value)

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

  async function FN_GET_USER_INFO () {
    const { result } = await FETCH_AUTH.getUserInfo({})

    USER_INFO.value = result
  }

  return {
    TOKEN_GETTER,
    FN_SET_TOKEN,
    FN_LOGOUT,
    FN_REMOVE_TOKEN,
    REFRESH_TOKEN_GETTER,
    FN_SET_REFRESH_TOKEN,
    USER_INFO_GETTER,
    FN_GET_USER_INFO
  }
})
