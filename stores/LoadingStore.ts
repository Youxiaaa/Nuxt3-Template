import { defineStore } from 'pinia'

export const LoadingStore = defineStore('loading-store', () => {
  // Loading 陣列
  const LOADING_ARRAY_REF = ref([])

  function FN_ADD_LOADING (uuid: never): void {
    LOADING_ARRAY_REF.value.push(uuid)
  }

  function FN_REMOVE_LOADING (uuid: never): void {
    LOADING_ARRAY_REF.value = LOADING_ARRAY_REF.value.filter(item => item !== uuid)
  }

  function FN_REMOVE_ALL_LOADING (): void {
    LOADING_ARRAY_REF.value = []
  }

  const CHECK_LOADING_ARRAY_LEGNTH = computed(() => LOADING_ARRAY_REF.value.length)

  return {
    FN_ADD_LOADING,
    FN_REMOVE_LOADING,
    FN_REMOVE_ALL_LOADING,
    CHECK_LOADING_ARRAY_LEGNTH
  }
})
