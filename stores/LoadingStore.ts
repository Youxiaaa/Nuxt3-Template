import { defineStore } from 'pinia'

export const LoadingStore = defineStore('loading-store', () => {
  // Loading 陣列
  const LOADING_ARRAY_REF = ref<string[]>([])

  function FN_ADD_LOADING (uuid: string): void {
    LOADING_ARRAY_REF.value.push(uuid)
  }

  function FN_REMOVE_LOADING (uuid: string): void {
    LOADING_ARRAY_REF.value = LOADING_ARRAY_REF.value.filter(item => item !== uuid)
  }

  function FN_REMOVE_ALL_LOADING (): void {
    LOADING_ARRAY_REF.value = []
  }

  const LOADING_ARRAY_LENGTH_GETTER = computed<number>(() => LOADING_ARRAY_REF.value.length)

  return {
    FN_ADD_LOADING,
    FN_REMOVE_LOADING,
    FN_REMOVE_ALL_LOADING,
    LOADING_ARRAY_LENGTH_GETTER
  }
})
